# 🚀 Quick Deployment Guide

Deploy Chiral Network to showcase on your resume/portfolio!

## Option 1: Vercel (Easiest - Recommended)

### Via Web Interface:
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository: `Aery1e/chiral-network`
4. Vercel will auto-detect settings from `vercel.json`
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`

### Via CLI:
```bash
npm i -g vercel
cd chiral-network
vercel
```

## Option 2: Netlify

### Via Web Interface:
1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your repository
4. Netlify will auto-detect settings from `netlify.toml`
5. Click "Deploy site"
6. Your site will be live at `https://your-project.netlify.app`

### Via CLI:
```bash
npm i -g netlify-cli
cd chiral-network
netlify deploy --prod
```

## Option 3: GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow in `.github/workflows/web-deploy.yml` will automatically deploy
5. Your site will be live at `https://Aery1e.github.io/chiral-network`

## 📝 After Deployment

1. **Update README.md** with your live URL:
   - Replace the placeholder URL in the "Live Demo" section
   
2. **Add to your resume**:
   - Include the live demo link
   - Mention the tech stack: Svelte, TypeScript, Tauri, Rust, WebRTC, DHT

3. **Test the deployment**:
   - Check all pages load correctly
   - Verify routing works
   - Test on mobile devices

## ⚠️ Important Notes

- The web version has limited functionality (no file system access)
- Full features require the desktop app
- This is perfect for showcasing UI/UX and architecture
- Consider adding a banner noting "Web Demo - Full features in desktop app"

## 🔧 Troubleshooting

**Build fails?**
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (requires Node 18+)
- Review build logs for specific errors

**Routes not working?**
- Ensure your hosting platform supports SPA routing (Vercel/Netlify do automatically)
- Check that redirect rules are configured (already in config files)

**Need help?**
- Check [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions
- Review hosting platform documentation

