# CSC Ecosystem Website

Open geographic data for countries, states and cities, with coverage that varies by record and release. This repository contains the official website and marketing platform for CSC Database.

## 🌍 About CSC Database

CSC Database is a comprehensive geographical database that provides:

- **Global Coverage**: Country, state and city records, with versioned releases and community corrections
- **Multiple Access Methods**: REST API, GraphQL API, and direct database downloads
- **Various Formats**: JSON, CSV, SQL, XML, YAML, MongoDB exports
- **Open Source**: Database and offline data packages under ODbL-1.0; npm SDK and CLI under MIT
- **Developer Friendly**: A free API tier, documented endpoints and plan-specific capabilities
- **Community Driven**: Crowdsourced updates and contributions

## ✨ Features

### Machine-readable index

`/llms.txt` is generated as a plain-text static file by `src/app/llms.txt/route.js` during each build.
It reuses the website's coverage bounds and complete npm/Python package catalogs, distinguishes local
snapshots from CDN and authenticated API access, and links to implementation guides and primary references.
It requires no runtime server or visitor-side requests.

Public HTML pages belong in `src/app/sitemap.js` using their canonical URLs. The sitemap regression
test compares the complete page tree with the sitemap and fails CI for missing, duplicate or obsolete
entries. After publishing new pages, submit the sitemap in Search Console and inspect important URLs.

### Implementation guides

The React dropdown guide at `/guides/react-country-state-city-dropdown/` runs the same
`public/examples/react-location-dropdown.jsx` file that visitors can copy or download.
It uses the pinned browser package, loads CDN data only after starting the demo, and includes
dependent-selection resets, stale-response cleanup, retries and unassigned state links.

The CSV-to-SQLite guide at `/guides/import-country-state-city-csv-sql/` publishes a Python
standard-library importer and SQL queries from `public/examples/`. Run `npm run test:imports`
with Python 3.9+ to check the importer against temporary fixtures; CI runs this alongside the
Node tests. The importer verifies a pinned release, preserves IDs and nullable links, and creates
a new SQLite projection without replacing an existing destination. Full-release verification is
performed separately against the pinned public downloads; regression tests require no network.

### Download statistics

The homepage and ecosystem page render download counts from `public/adoption-stats.json` at build time.
Run `npm run stats:refresh` to refresh the snapshot. Website refreshes are scheduled daily at 06:17 UTC,
with catch-up attempts at 09:17 and 12:17 UTC. GitHub's scheduler is best effort; delayed or missed runs are possible.
Scheduled runs skip building and deploying when all published metrics are already fresh for the UTC day and reporting
window. Missing, invalid or stale metrics trigger a recovery build. Push/manual production builds always run the refresh;
ordinary local/CI builds use the checked-in snapshot without provider requests.

npm and PyPI totals cover the official packages already listed on the website over the same 30 complete UTC days,
ending two days before refresh to allow for reporting lag. PyPI Stats excludes known mirrors. GitHub totals cover
data-file assets across every published database release, including prereleases, excluding checksums, notices,
migration archives, Git clones, raw-file requests and source archives. These are file downloads, not unique users.

If a provider fails or returns invalid data, its last successful whole metric and date are retained from the deployed
snapshot (or the repository snapshot when unavailable). GitHub Actions uses its read-only token only during refresh.
Same-day snapshots are reused across deployments. No visitor-side requests or application-backend changes are needed.
The public JSON includes per-package totals for auditing.

### 🚀 API Access
- Fast REST and GraphQL endpoints
- JSON responses from the currently served API dataset
- Request quotas and field availability depend on your API plan
- Comprehensive country, state, and city coverage

### 📊 Database Repository
- Open-source geographical database
- 12 database download formats and 13 Export Tool formats
- ODbL-1.0 permits commercial use with attribution and applicable share-alike requirements
- Regular updates and community contributions

### 📥 Export Tool
- Download curated datasets
- Multiple format options (CSV, JSON, SQL)
- Free and premium tiers available
- Custom data filtering options

### 🔄 Update Tool
- Submit data feedback and corrections
- Report issues with existing data
- Suggest new geographical entries
- Community-driven data improvement

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router and static export
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: Custom components with [Radix UI](https://radix-ui.com) primitives
- **Animations**: CSS animations with reduced-motion support
- **Icons**: Local SVGs in `src/icons/`; Lucide for the configured shadcn registry and documented examples
- **Development**: ESLint, Turbopack for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 26 recommended (also supports 20.19+, 22.13+, and 24+; CI checks Node 22 and 26)
- npm (use `npm ci` to install the committed lockfile)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dr5hn/csc-website.git
cd csc-website
```

2. Install dependencies:
```bash
npm ci
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── faqs/           # FAQ page
│   ├── pricing/        # Pricing page
│   └── product/        # Product pages (API, Database, Export Tool, Update Tool)
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── product/       # Product-specific components
│   └── animate-ui/    # Animation components
├── data/              # Static data and configurations
├── hooks/             # Custom React hooks
├── icons/             # Custom icon components
└── lib/               # Utility functions and configurations
```

## 🎨 Key Components

- **Hero Section**: Interactive 3D globe with geographical data visualization
- **Product Cards**: Feature showcases for API, Database, Export, and Update tools
- **Pricing Components**: Flexible pricing tables for different service tiers
- **Contact Forms**: User interaction and feedback collection
- **Stats Display**: Real-time statistics and social proof
- **Testimonials**: Animated customer testimonials

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js application:

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with every push

### Other Platforms

This application can be deployed on any platform that supports Node.js:

- **Netlify**: Use the build command `npm run build`
- **AWS Amplify**: Configure with Next.js build settings
- **DigitalOcean App Platform**: Deploy with default Next.js configuration
- **Railway**: One-click deployment with GitHub integration

## 🤝 Contributing

We welcome contributions to improve the CSC Database website! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards and conventions
4. **Test thoroughly**: Ensure your changes don't break existing functionality
5. **Commit your changes**: `git commit -m 'Add some amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes and their benefits

### Development Guidelines

- Follow the existing code style and component patterns
- Use TypeScript where applicable
- Ensure responsive design across all screen sizes
- Test your changes across different browsers
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Website**: [Visit CSC Database](https://csc-database.com)
- **Documentation**: [API Documentation](https://docs.csc-database.com)
- **Issues**: [GitHub Issues](https://github.com/dr5hn/csc-website/issues)
- **Community**: Join our developer community for updates and support

## 🙏 Acknowledgments

- Thanks to all contributors who help maintain and improve geographical data
- Built with ❤️ by developers, for developers
- Trusted by thousands of developers worldwide

---

**Made with ❤️ for the global developer community**
