# The Pigeon Way - Intelligence Operational Sheet

## Setup

1. Copy the configuration file:
   ```bash
   cp js/config.example.js js/config.js
   ```

2. Edit `js/config.js` and set your desired password:
   ```javascript
   const CONFIG = {
       AUTH_PASSWORD: 'your-secure-password-here'
   };
   ```

3. The `js/config.js` file is gitignored and will not be committed to the repository.

## Deployment

This application is configured for Railway deployment. Simply connect your GitHub repository to Railway and it will automatically deploy.

### Railway Environment Variables (Required)

**IMPORTANT:** You must set the `AUTH_PASSWORD` environment variable in Railway for authentication to work.

1. Go to your Railway project dashboard
2. Select your service
3. Go to the "Variables" tab
4. Click "+ New Variable"
5. Set:
   - **Name:** `AUTH_PASSWORD`
   - **Value:** Your desired password (e.g., `Pigeon@2026b`)
6. Click "Add"
7. Redeploy your service

The `js/config.js` file will be automatically generated during deployment from this environment variable.

## Features

- Password-protected access
- Markdown export functionality
- Responsive design
- TDR (Total Documentation Rate) accordion components

## Pages

- **Flying Wheel** (`index.html` / `pigeon-way.html`) - Interactive wheel view
- **Operations Sheet** (`operations-sheet.html`) - Print-friendly operational sheet
- **Ops Rationale** (`ops-rationale.html`) - TDR methodology explanation

