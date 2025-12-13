# Laravel Server Deployment Guide

A comprehensive, interactive documentation website for deploying Laravel applications to production servers.

## Live Demo

Visit the live site: [https://lologsol.github.io/shine-landing/](https://lologsol.github.io/shine-landing/)

## Overview

This project provides step-by-step documentation for deploying Laravel projects to a production server, covering:

- PHP 8.2 / 8.3 installation and configuration
- Nginx web server setup
- MySQL database configuration
- Composer installation
- Let's Encrypt SSL certificates
- PHP-FPM configuration
- Laravel-specific optimizations

## Features

- Dark/Light theme toggle
- Responsive design for all devices
- Copy-to-clipboard code blocks
- PHP version selector (8.2 / 8.3) - commands update dynamically
- Smooth scroll navigation
- SEO optimized

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lologsol/shine-landing.git

# Navigate to project directory
cd shine-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── DocumentationContent.tsx
│   └── ...
├── data/            # Documentation data
├── pages/           # Page components
├── store/           # Redux store
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Deployment

This project is configured for GitHub Pages deployment with automatic builds via GitHub Actions.

## License

MIT

## Author

**Mohamed Gbr**

- GitHub: [@mohamedgbr]([https://github.com/lologsol](https://github.com/MohamedGabr20233/))
- Gmail : mohamedgbr20233@gmail.com
- tel : [+20 103 3058 554](https://wa.me/201033058554)
- linkedin : [mohamedGbr](https://www.linkedin.com/in/mohamed-gbr-222776278/)
