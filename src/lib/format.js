/** Round down to the hundred and add a plus, so a live count is never overstated: 152967 → "152,900+". */
export function formatApprox(n) {
  return `${(Math.floor(n / 100) * 100).toLocaleString("en-US")}+`;
}
