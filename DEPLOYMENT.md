# Platinex Website Deployment Guide

## Website Deployment

The website has been successfully built and is ready for deployment. The build output is in the `dist/` folder.

### Option 1: Deploy to Netlify via Web Interface

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git" or "Deploy manually"
3. If deploying manually:
   - Drag and drop the `dist/` folder to the deployment area
   - Netlify will automatically deploy your site
4. Your site will be available at a random URL like `https://random-name.netlify.app`

### Option 2: Connect to GitHub Repository

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Netlify will automatically build and deploy on every push

## TINA CMS Setup

To enable TINA CMS for content management:

1. Visit [tina.io](https://tina.io) and create an account
2. Create a new project
3. Get your `clientId` and `token` from the dashboard
4. Add these environment variables to your Netlify site:
   - `TINA_CLIENT_ID`: Your TINA client ID
   - `TINA_TOKEN`: Your TINA token
5. Update the build command to: `pnpm build:with-tina`

## Current Status

✅ Website builds successfully
✅ Static files generated in `dist/` folder
✅ Netlify configuration ready
⚠️ TINA CMS requires authentication credentials
⚠️ Image optimization needs Sharp installation

## Next Steps

1. Deploy the website to Netlify
2. Set up TINA CMS credentials
3. Configure custom domain (optional)
4. Set up form handling if needed

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build with TINA CMS (requires credentials)
pnpm build:with-tina
```

## File Structure

- `src/` - Source code
- `dist/` - Built website (deploy this folder)
- `public/` - Static assets
- `tina/` - TINA CMS configuration
- `netlify.toml` - Netlify deployment configuration
