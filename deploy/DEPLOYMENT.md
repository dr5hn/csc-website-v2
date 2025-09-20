# Direct Production Deployment

A simple deployment process for static Next.js files that deploys directly to production.

## 🚀 Quick Start

### 1. Deploy to Production
```bash
./deploy.sh
```
This builds static files and deploys directly to https://countrystatecity.in

### 2. Verify Live Site
Visit https://countrystatecity.in and verify:
- ✅ All pages work
- ✅ Navigation works  
- ✅ Documentation (`/docs`) works
- ✅ No console errors
- ✅ Performance is good

## 📁 How It Works

### Static Files Only
- **Location**: `/var/www/csc-website/current` (HTML, CSS, JS files)
- **No Node.js server needed** - just static files!
- **No PM2** - nginx serves files directly

### Single Nginx Configuration
- **Production**: `nginx.conf` → `countrystatecity.in` → static files
- **www redirects** to non-www automatically

## 🛠️ Server Setup

### Initial Nginx Setup
```bash
# Copy nginx config (after first deployment)
sudo cp nginx.conf /etc/nginx/sites-available/countrystatecity.in

# Enable production site
sudo ln -s /etc/nginx/sites-available/countrystatecity.in /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### DNS Setup
- `countrystatecity.in` → Your server IP  
- `www.countrystatecity.in` → Your server IP (will redirect to non-www)

## 📊 Benefits

✅ **Direct Deployment**: No staging complexity - straight to production  
✅ **No Server Processes**: Static files only - no Node.js/PM2 needed  
✅ **Fast Deployment**: Single step deployment  
✅ **Better Performance**: Static files serve faster than dynamic apps  
✅ **Lower Resource Usage**: No memory/CPU for Node.js processes  
✅ **Simple Rollback**: Previous releases kept automatically  

## 🔍 Troubleshooting

### Site Not Working
```bash
# Check nginx
sudo nginx -t
sudo systemctl status nginx
sudo systemctl reload nginx

# Check static files exist
ls -la /var/www/csc-website/current/
cat /var/www/csc-website/current/index.html | head
```

### Nginx Issues
```bash
# Check nginx configs exist
ls -la nginx.conf

# Test configs manually
sudo nginx -t

# Check permissions
sudo chown root:root nginx.conf

# Reload nginx
sudo systemctl reload nginx

# Check logs
sudo tail -f /var/log/nginx/countrystatecity.error.log

# Verify static files are accessible
curl -I https://countrystatecity.in
```

## 🎯 File Summary

| File | Purpose |
|------|---------|
| `deploy.sh` | Triggers GitHub Actions production deployment |
| `nginx.conf` | Routes countrystatecity.in to static files |
| `next.config.mjs` | Configured for static export |
| `.github/workflows/deploy.yml` | GitHub Actions deployment workflow |

## 🚀 Deployment Process

The GitHub Actions workflow:

1. **Build**: `yarn build` creates static export in `out/` directory
2. **Upload**: Rsync static files to `/var/www/csc-website/releases/TIMESTAMP/`  
3. **Switch**: Atomic symlink switch from `current` to new release
4. **Verify**: Health check confirms https://countrystatecity.in responds
5. **Cleanup**: Removes old releases (keeps 5 most recent)

## 🌐 Architecture

```
📁 Static Files (HTML, CSS, JS)
    ↓
🌐 Nginx (Direct File Serving)
    ↓  
☁️ Cloudflare (SSL & CDN)
    ↓
🌍 Users
```

This approach gives you confidence in your deployments while keeping the process simple, fast, and resource-efficient! 🎉
