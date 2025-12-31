# Deployment Guide

This guide covers deploying Chiral Network for web hosting (portfolio/resume showcase).

## 🚀 Quick Deploy

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd chiral-network
   vercel
   ```

3. **Or use GitHub Integration**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the settings from `vercel.json`

### Option 2: Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd chiral-network
   netlify deploy --prod
   ```

3. **Or use GitHub Integration**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`

### Option 3: GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy using GitHub Actions**:
   - The workflow in `.github/workflows/deploy.yml` will handle this
   - Enable GitHub Pages in your repository settings
   - Set source to `gh-pages` branch

## 📝 Environment Variables

For web deployment, no environment variables are required. The app will run in "web mode" where Tauri-specific features are gracefully disabled.

## ⚠️ Web Limitations

Since Chiral Network is primarily a desktop application built with Tauri, the web version has some limitations:

- **File System Access**: Not available in browsers
- **Native Dialogs**: Uses browser fallbacks
- **System Integration**: Limited functionality
- **Desktop Features**: Some features require the desktop app

However, the UI and many core features will still work, making it perfect for showcasing your work!

## 🔧 Manual Build

To build for web manually:

```bash
npm install
npm run build
```

The output will be in the `dist/` directory, ready to be served by any static hosting service.

## 🌐 Custom Domain

### Vercel
1. Go to your project settings
2. Add your domain in the "Domains" section
3. Follow DNS configuration instructions

### Netlify
1. Go to Domain settings
2. Add your custom domain
3. Configure DNS records as instructed

## 📊 CI/CD

The project includes GitHub Actions workflows that:
- Build the project on push/PR
- Run tests
- Deploy previews for pull requests
- Upload build artifacts

## 🎯 Production Checklist

- [ ] Update `package.json` homepage field with your deployment URL
- [ ] Update README.md with live demo link
- [ ] Test the web build locally: `npm run build && npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check mobile responsiveness
- [ ] Test in different browsers

## 🔗 Adding Deployment Badges

Add these to your README.md:

```markdown
[![Deployed on Vercel](https://vercel.com/button)](https://your-app.vercel.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

