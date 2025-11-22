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

### Railway Environment Variables (Optional)

If you prefer to use Railway environment variables instead of config.js:

1. Set `AUTH_PASSWORD` in Railway's environment variables
2. Railway will inject it during deployment

## Features

- Password-protected access
- Markdown export functionality
- Responsive design
- TDR (Total Documentation Rate) accordion components

## Pages

- **Flying Wheel** (`index.html` / `pigeon-way.html`) - Interactive wheel view
- **Operations Sheet** (`operations-sheet.html`) - Print-friendly operational sheet
- **Ops Rationale** (`ops-rationale.html`) - TDR methodology explanation

