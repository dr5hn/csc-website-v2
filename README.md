# CSC Ecosystem Website

The world's most comprehensive geographical database providing accurate country, state, and city data to developers worldwide. This repository contains the official website and marketing platform for CSC Database.

## 🌍 About CSC Database

CSC Database is a comprehensive geographical database that provides:

- **Global Coverage**: Complete data for countries, states, and cities worldwide
- **Multiple Access Methods**: REST API, GraphQL API, and direct database downloads
- **Various Formats**: JSON, CSV, SQL, XML, YAML, MongoDB exports
- **Open Source**: MIT licensed for unlimited commercial use
- **Developer Friendly**: Sub-200ms response times with 99.9% uptime SLA
- **Community Driven**: Crowdsourced updates and contributions

## ✨ Features

### 🚀 API Access
- Fast REST and GraphQL endpoints
- Real-time geographical data queries
- Sub-200ms response times
- Comprehensive country, state, and city coverage

### 📊 Database Repository
- Open-source geographical database
- 9+ export formats available
- MIT licensed for commercial use
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
- **Icons**: Local SVGs in `src/icons/`
- **Development**: ESLint, Turbopack for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (CI checks Node 22 and 26)
- npm (use `npm ci` to install the committed lockfile)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dr5hn/csc-website.git
cd csc-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
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
