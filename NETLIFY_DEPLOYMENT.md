# Netlify Deployment Guide

This guide will walk you through deploying your BCOS Training Platform to Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://www.netlify.com) if you don't have one)
2. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Netlify Dashboard (Recommended for first-time deployment)

### Step 1: Build your project locally (to test)
```bash
npm install
npm run build
```

This will create a `dist` folder with your production build.

### Step 2: Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository (`bcos-renewal-main` or your repo name)
5. Netlify will auto-detect your build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

### Step 3: Wait for deployment
- Netlify will install dependencies and build your site
- This usually takes 2-5 minutes
- You'll see a unique URL like `https://random-name-123456.netlify.app`

### Step 4: Configure custom domain (optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your domain

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

This will open your browser for authentication.

### Step 3: Deploy
```bash
# Build your project first
npm run build

# Deploy to Netlify
netlify deploy

# For production deployment
netlify deploy --prod
```

### Step 4: Link your site (first time only)
```bash
netlify init
```

Follow the prompts to:
- Link to existing site or create new one
- Set build command: `npm run build`
- Set publish directory: `dist`

## Continuous Deployment

Once connected to Git:
- Every push to your main branch automatically triggers a new deployment
- Netlify creates preview deployments for pull requests
- You can see deployment status in the Netlify dashboard

## Environment Variables (if needed)

If you need to add environment variables later:

1. Go to **Site settings** → **Environment variables**
2. Add any required variables (e.g., API keys)
3. Redeploy your site

**Note**: Your Supabase configuration is currently hardcoded, so you may not need environment variables initially.

## Build Settings

Your `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18
- SPA redirects (all routes redirect to index.html for React Router)

## Troubleshooting

### Build fails
- Check the build logs in Netlify dashboard
- Make sure all dependencies are in `package.json`
- Verify Node version compatibility (currently set to 18)

### 404 errors on routes
- The `netlify.toml` includes redirect rules for SPAs
- If issues persist, check that the redirect is working

### Deployment is slow
- Consider enabling build caching in Netlify settings
- Use Netlify's build plugins if needed

## Quick Deploy Button

You can also use Netlify's quick deploy:

1. Push your code to GitHub/GitLab/Bitbucket
2. Click this button (replace with your repo URL):

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_ID/deploys)

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)


