#!/usr/bin/env bash
#
# install-nginx-29.sh: install the countrystatecity.in nginx config from
# csc-website-v2 PR #29 (old-URL redirects, real 404s, HTTPS www redirect).
#
# Run on the web server:  sudo bash install-nginx-29.sh
#
# Safe by design:
#   1. Refuses to touch anything if the live config differs from the repo's
#      previous version (someone edited the server by hand). Prints the diff.
#   2. Backs up the live file before replacing it.
#   3. Restores the backup by itself if `nginx -t` fails, or if the homepage
#      stops answering 200 after the reload.
#   4. Checks every redirect against this server directly (bypassing
#      Cloudflare) and prints PASS or FAIL for each.
#
# Exit codes: 0 installed and verified, 1 precondition failed, 2 drift found
# (nothing changed), 3 nginx -t failed (rolled back), 4 homepage broke
# (rolled back), 5 installed but some redirect checks failed.

set -euo pipefail

LIVE=${LIVE:-/etc/nginx/sites-available/countrystatecity.in}
OLD_URL=https://raw.githubusercontent.com/dr5hn/csc-website-v2/a83f986/deploy/nginx.conf
NEW_URL=https://raw.githubusercontent.com/dr5hn/csc-website-v2/0fdd8e8/deploy/nginx.conf
# Where to send verification requests: this server, not Cloudflare.
VERIFY_BASE=${VERIFY_BASE:-https://127.0.0.1}

STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP="$LIVE.bak-$STAMP"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

log() { printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*"; }

# Restore the backup and reload, used by every failure after the swap.
rollback() {
  log "ROLLING BACK to $BACKUP"
  cp -p "$BACKUP" "$LIVE"
  if nginx -t >/dev/null 2>&1; then
    systemctl reload nginx
    log "Rolled back. The site is on its previous config."
  else
    log "ERROR: even the backup fails nginx -t. Run: nginx -t"
  fi
}

# One verification request. Prints PASS/FAIL and returns 1 on FAIL.
#   $1 host header, $2 path, $3 expected status, $4 expected Location (for 3xx)
check() {
  local host=$1 url_path=$2 want=$3 want_loc=${4:-} out code loc
  out=$(curl -sk -o /dev/null --max-time 10 -w '%{http_code} %{redirect_url}' \
        -H "Host: $host" "$VERIFY_BASE$url_path" || echo "000 ")
  code=${out%% *}; loc=${out#* }
  if [[ $code == "$want" && ( -z $want_loc || $loc == "$want_loc" ) ]]; then
    printf '  PASS  %-36s %s %s\n' "$host$url_path" "$code" "$loc"
  else
    printf '  FAIL  %-36s got %s %s, want %s %s\n' "$host$url_path" "$code" "$loc" "$want" "$want_loc"
    return 1
  fi
}

# --- Preconditions ---------------------------------------------------------
[[ $(id -u) -eq 0 ]] || { echo "Run as root: sudo bash $0"; exit 1; }
[[ -f $LIVE ]] || { echo "ERROR: $LIVE not found. Which file in /etc/nginx/sites-available serves countrystatecity.in?"; exit 1; }
command -v nginx >/dev/null || { echo "ERROR: nginx not on PATH"; exit 1; }
nginx -t >/dev/null 2>&1 || { echo "ERROR: nginx -t already fails before any change. Fix that first:"; nginx -t; exit 1; }

log "Downloading the previous and new config from GitHub"
curl -fsSL --max-time 30 "$OLD_URL" -o "$TMP/old.conf" || { echo "ERROR: could not download $OLD_URL"; exit 1; }
curl -fsSL --max-time 30 "$NEW_URL" -o "$TMP/new.conf" || { echo "ERROR: could not download $NEW_URL"; exit 1; }

# --- 1. Drift check ----------------------------------------------------------
if ! diff -q "$TMP/old.conf" "$LIVE" >/dev/null; then
  log "STOP: the live config is not the repo's previous version. Nothing was changed."
  echo "----- diff: repo previous version (-) vs live server (+) -----"
  diff -u "$TMP/old.conf" "$LIVE" || true
  echo "--------------------------------------------------------------"
  echo "Send this diff back so the server's own edits can be merged into the repo first."
  exit 2
fi
log "Live config matches the repo's previous version"

# --- 2. Backup, install, test ------------------------------------------------
cp -p "$LIVE" "$BACKUP"
log "Backup written: $BACKUP"
cp "$TMP/new.conf" "$LIVE"

if ! nginx -t 2>"$TMP/nginx-t.log"; then
  cat "$TMP/nginx-t.log"
  rollback
  exit 3
fi
if grep -qi 'conflicting server name' "$TMP/nginx-t.log"; then
  log "WARNING: another enabled site also claims a server name used here:"
  grep -i 'conflicting server name' "$TMP/nginx-t.log"
fi
systemctl reload nginx
log "nginx reloaded with the new config"
sleep 2

# --- 3. Verify -----------------------------------------------------------------
A=countrystatecity.in
D=https://docs.countrystatecity.in

log "Homepage"
if ! check $A / 200; then
  rollback
  exit 4
fi

failed=0
log "Old URLs"
check $A /docs/api/all-states/  301 "$D/api/endpoints/get-all-states" || failed=1
check $A /docs/api/all-states   301 "$D/api/endpoints/get-all-states" || failed=1
check $A /docs                  301 "$D/"                              || failed=1
check $A /documentation         301 "$D/"                              || failed=1
check $A /faq/                  301 "https://$A/faqs/"                 || failed=1
check $A /faq                   301 "https://$A/faqs/"                 || failed=1
check $A /donate/               301 "https://github.com/sponsors/dr5hn" || failed=1
check $A /privacy-policy/       301 "https://$A/privacy/"              || failed=1
check $A /terms/                301 "https://app.countrystatecity.in/terms" || failed=1
check $A /downloads/            301 "https://$A/product/database/"     || failed=1
log "Real pages still load"
check $A /country-api/          200 || failed=1
check $A /faqs/                 200 || failed=1
check $A /sitemap.xml           200 || failed=1
check $A /llms.txt              200 || failed=1
log "Unknown paths are a real 404"
check $A /this-page-does-not-exist/ 404 || failed=1
log "HTTPS www goes to the apex"
check www.$A /                  301 "https://$A/"                      || failed=1
check www.$A /about/            301 "https://$A/about/"                || failed=1

echo
if [[ $failed -eq 0 ]]; then
  log "DONE: installed and every check passed."
else
  log "Installed, but some checks above FAILED. The site itself is up."
fi
echo "To undo:  sudo cp -p $BACKUP $LIVE && sudo nginx -t && sudo systemctl reload nginx"
[[ $failed -eq 0 ]] || exit 5
