# Deploying CareWave to Vercel

This document provides a quick reference for deploying the CareWave frontend to Vercel.

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) (v16 or later)
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)
- A [Vercel](https://vercel.com) account

### Deployment Steps

1. **Install Vercel CLI** (if not already installed)
   ```
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```
   vercel login
   ```

3. **Deploy using our automated script**
   
   For Windows:
   ```
   npm run deploy:vercel:win
   ```
   
   For macOS/Linux:
   ```
   npm run deploy:vercel
   ```

4. Follow the prompts to configure your deployment

## Environment Variables

The following environment variables need to be set in your Vercel project:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | URL of your backend API | `https://carewave-backend.onrender.com` |
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://efyoufljsmihzhqjdsqz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## Continuous Deployment

We've set up GitHub Actions for continuous deployment. When you push to the main branch, your application will automatically be deployed to Vercel.

To set this up, add the following secrets to your GitHub repository:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

- **Build fails**: Check that all dependencies are correctly installed and environment variables are set
- **Routing issues**: Ensure the `vercel.json` configuration is correct
- **API connection problems**: Verify the `VITE_API_URL` environment variable is set correctly

## Additional Resources

For more detailed instructions, see the [full deployment guide](./vercel-deployment-guide.md).
