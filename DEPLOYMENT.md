# Deploying to Vercel

This guide walks you through deploying the Movie Countdown app to Vercel.

## Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works)
- Git installed on your machine

## Step 1: Push Code to GitHub

First, create a GitHub repository and push your code.

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Name it `movies-countdown` (or any name you prefer)
3. Keep it public or private (your choice)
4. Click "Create repository"

### Push your code:

```bash
# Navigate to the client folder (this is what we'll deploy)
cd /home/tamil/work/movies-countdown/client

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Movie Countdown App"

# Add your GitHub repo as remote (replace with your username)
git remote add origin https://github.com/YOUR_USERNAME/movies-countdown.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for beginners)

1. Go to https://vercel.com and sign in with GitHub

2. Click **"Add New..."** > **"Project"**

3. Find your `movies-countdown` repository and click **"Import"**

4. Configure the project:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (or `client` if you pushed the whole project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Click **"Deploy"**

6. Wait for deployment (usually 1-2 minutes)

7. Your app is live! Vercel will give you a URL like:
   ```
   https://movies-countdown-abc123.vercel.app
   ```

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client folder
cd /home/tamil/work/movies-countdown/client

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

## Step 3: Verify Deployment

1. Open the URL provided by Vercel
2. Check that movies are displayed
3. Test the search functionality
4. Click on a movie to verify the countdown modal works

## Project Configuration

The app is already configured for Vercel deployment. Key settings in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vite automatically handles build output for Vercel
})
```

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** > **"Domains"**
3. Add your domain (e.g., `movies.yourdomain.com`)
4. Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub, Vercel automatically:
- Deploys when you push to `main` branch
- Creates preview deployments for pull requests

## Updating the App

To update your deployed app:

```bash
# Make your changes
# ...

# Commit and push
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically redeploys!
```

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:

1. **Missing dependencies**: Make sure `package.json` has all required packages
2. **Node version**: Add `engines` to package.json if needed:
   ```json
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

### Page Shows Blank

- Check browser console for errors
- Ensure all imports are correct
- Verify `movies.json` is in `src/data/` folder

### 404 on Refresh

Add a `vercel.json` in the client folder:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Environment Variables (If Needed)

If you add features requiring environment variables:

1. Go to Vercel Dashboard > Project > Settings > Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

## Cost

- **Vercel Hobby (Free)**: Perfect for this app
  - 100GB bandwidth/month
  - Unlimited deployments
  - HTTPS included
  - Global CDN

## Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Flow                          │
│                                                             │
│   Local Code ──push──▶ GitHub ──auto──▶ Vercel ──deploy──▶ Live │
│                                                             │
│   Your machine        Repository       Build & Host    Users │
└─────────────────────────────────────────────────────────────┘
```

Your Movie Countdown app is now live on the internet!
