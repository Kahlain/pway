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

### Railway Configuration

#### Required Environment Variables

**AUTH_PASSWORD** (Required)
- **Purpose:** Password for accessing the application
- **How to set:**
  1. Go to your Railway project dashboard
  2. Select your service
  3. Go to the "Variables" tab
  4. Click "+ New Variable"
  5. Set:
     - **Name:** `AUTH_PASSWORD`
     - **Value:** Your desired password (e.g., `Pigeon@2026b`)
  6. Click "Add"
  7. Redeploy your service

**Note:** The `js/config.js` file is automatically generated during the build process from this environment variable. The build will fail if `AUTH_PASSWORD` is not set.

#### Port Configuration

**Important:** Railway automatically detects the port your application is listening on. Do NOT manually set a custom port unless necessary.

1. **Automatic Port Detection:**
   - Railway will automatically detect that your Python server is listening on port 8080
   - The `PORT` environment variable is automatically set by Railway
   - Your application should use this variable: `python3 -m http.server $PORT --bind 0.0.0.0`

2. **If Railway Detects Port 8080:**
   - In Railway's service settings → Networking
   - You'll see "A port was detected by Railway magic ✨"
   - It should show: `8080 (python3)`
   - **Do NOT override this** - let Railway handle it automatically

3. **Server Binding:**
   - Your server MUST bind to `0.0.0.0` (all interfaces), not `localhost`
   - This allows Railway's load balancer to route traffic to your service
   - The start command: `python3 -m http.server $PORT --bind 0.0.0.0`

#### Build Configuration

The application uses **Nixpacks** (deprecated but still functional) to build:

- **Builder:** Nixpacks (specified in `railway.json`)
- **Setup Phase:** Installs Python3 and Node.js
- **Install Phase:** Generates `js/config.js` from `AUTH_PASSWORD` environment variable
- **Start Phase:** Runs `start.sh` which starts the Python HTTP server

**Build Process:**
1. Railway clones your GitHub repository
2. Nixpacks detects Python and Node.js requirements
3. Runs `generate-config.js` to create `js/config.js` from `AUTH_PASSWORD`
4. Starts the Python HTTP server on the port specified by Railway's `PORT` variable

#### Deployment Files

- **`railway.json`:** Railway deployment configuration
  - Specifies Nixpacks builder
  - Sets start command
  - Configures health checks
- **`nixpacks.toml`:** Nixpacks build configuration
  - Defines build phases
  - Installs dependencies
  - Runs config generation script
- **`start.sh`:** Server startup script
  - Reads `PORT` environment variable
  - Starts Python HTTP server on `0.0.0.0`

#### Common Issues & Solutions

**502 Bad Gateway Error:**
- **Cause:** Server not binding to `0.0.0.0` or wrong port
- **Solution:** Ensure `start.sh` uses `--bind 0.0.0.0` and `$PORT` variable

**Authentication Not Working:**
- **Cause:** `AUTH_PASSWORD` environment variable not set
- **Solution:** Set `AUTH_PASSWORD` in Railway Variables tab and redeploy

**Build Fails:**
- **Cause:** `AUTH_PASSWORD` not set (build script will fail)
- **Solution:** Set the environment variable before deploying

**Port Mismatch:**
- **Cause:** Manually setting custom port that doesn't match detected port
- **Solution:** Let Railway auto-detect the port (usually 8080 for Python)

#### Health Checks

Railway is configured with:
- **Health Check Path:** `/` (root path)
- **Health Check Timeout:** 300 seconds (5 minutes)

This ensures Railway knows when your service is ready to receive traffic.

#### Deployment Workflow

1. **Initial Setup:**
   - Connect GitHub repository to Railway
   - Set `AUTH_PASSWORD` environment variable
   - Railway auto-detects configuration and deploys

2. **Automatic Deploys:**
   - Railway automatically deploys on every push to the connected branch
   - Build process runs `generate-config.js` to create config file
   - Server starts and becomes available at your Railway domain

3. **Manual Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on any previous deployment
   - Or push a new commit to trigger auto-deploy

#### Verification

After deployment, verify:
1. ✅ Build logs show: `✓ Generated js/config.js from AUTH_PASSWORD environment variable`
2. ✅ Build logs show: `✓ Password length: X characters`
3. ✅ Server starts: `Starting server on port 8080` (or Railway's assigned port)
4. ✅ Health check passes
5. ✅ Can access welcome page and authenticate with your password

## Features

- Password-protected access (client-side authentication)
- Responsive design
- TDR (Total Documentation Rate) accordion components
- Interactive Flying Wheel visualization
- Print-friendly Operations Sheet
- Ops Rationale documentation

## Pages

- **Flying Wheel** (`index.html` / `pigeon-way.html`) - Interactive wheel view
- **Operations Sheet** (`operations-sheet.html`) - Print-friendly operational sheet
- **Ops Rationale** (`ops-rationale.html`) - TDR methodology explanation

