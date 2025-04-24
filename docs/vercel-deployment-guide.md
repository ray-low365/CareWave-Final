# Vercel Deployment Guide for CareWave Frontend

This guide provides step-by-step instructions for deploying the CareWave frontend application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- [Node.js](https://nodejs.org) installed (v16 or later)
- [Vercel CLI](https://vercel.com/docs/cli) installed globally (`npm i -g vercel`)

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

### 3. Configure Environment Variables

Before deploying, you need to set up environment variables in Vercel. You can do this in two ways:

#### Option A: Using the Vercel Dashboard

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:
   - `VITE_API_URL`: URL of your backend API
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

#### Option B: Using the Vercel CLI

```bash
vercel env add VITE_API_URL
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### 4. Deploy to Vercel

#### Option A: Using the Automated Deployment Script

We've created scripts to simplify the deployment process:

**For Linux/macOS:**
```bash
# From the project root
npm run deploy:vercel
```

**For Windows:**
```powershell
# From the project root
npm run deploy:vercel:win
```

These scripts will:
- Check if Vercel CLI is installed
- Verify your login status
- Prompt for environment variables
- Deploy to Vercel (preview or production)

#### Option B: Manual Deployment

From the root directory of the project, run:

```bash
# For initial setup and configuration
vercel

# For production deployment
npm run deploy
```

Alternatively, you can deploy directly from the frontend directory:

```bash
cd frontend
vercel --prod
```

### 5. Configure Custom Domain (Optional)

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "Domains"
4. Add your custom domain and follow the instructions to configure DNS settings

### 6. Set Up Continuous Deployment (Optional)

#### Option A: Using Vercel's Git Integration

Vercel can automatically deploy your application when you push changes to your Git repository:

1. Connect your Git repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Option B: Using GitHub Actions

We've included a GitHub Actions workflow file (`.github/workflows/vercel-deploy.yml`) that automatically deploys your application to Vercel when you push to the main branch.

To set this up:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API token (get from Vercel account settings)
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID
   - `VITE_API_URL`: Your backend API URL
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

To get your Vercel project and organization IDs, run:

```bash
vercel whoami
vercel projects list
```

## Troubleshooting

### Issue: Build Fails

- Check the build logs in the Vercel dashboard
- Ensure all dependencies are correctly installed
- Verify that environment variables are correctly set

### Issue: Routing Problems

- Check the `vercel.json` configuration
- Ensure that the SPA fallback route is correctly configured

### Issue: API Connection Problems

- Verify that the `VITE_API_URL` environment variable is correctly set
- Check CORS configuration on the backend

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
