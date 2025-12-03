# GitHub Deployment Guide

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `bcos-renewal` (or your preferred name)
   - **Description**: "BCOS Training Platform - Complete course management system"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Add Remote and Push Code

After creating the repository, GitHub will show you the repository URL. Use one of these commands:

### If using HTTPS:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If using SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

## Step 3: Configure Git User (if needed)

If you need to update your git user information:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Quick Deployment Commands

Once you have your repository URL, run these commands in order:

```bash
# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Future Updates

After making changes to your code:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Troubleshooting

### If you get authentication errors:
- Make sure you're logged into GitHub
- Use a Personal Access Token instead of password (GitHub no longer accepts passwords)
- Or set up SSH keys for easier authentication

### If you get "remote origin already exists":
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin YOUR_REPO_URL
```

## Security Notes

- The `.gitignore` file is already configured to exclude sensitive files
- Never commit `.env` files or API keys directly
- Supabase keys in the code are public keys (anon keys) which are safe to commit

