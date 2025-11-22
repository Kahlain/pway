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

## Quick Reference

### Local Development

```bash
# 1. Clone repository
git clone <repository-url>
cd Pigeon-Wheel

# 2. Set up configuration
cp js/config.example.js js/config.js
# Edit js/config.js and set your password

# 3. Start local server
python3 -m http.server 8000 --bind 0.0.0.0

# 4. Open browser
# Navigate to http://localhost:8000/welcome.html
```

### Railway Deployment Checklist

- [ ] Connect GitHub repository to Railway
- [ ] Set `AUTH_PASSWORD` environment variable in Railway
- [ ] Verify port auto-detection (should show 8080)
- [ ] Deploy and check build logs for config generation
- [ ] Test authentication on deployed site
- [ ] Verify all pages load correctly

### Key Files

| File | Purpose |
|------|---------|
| `railway.json` | Railway deployment configuration |
| `nixpacks.toml` | Build configuration (Nixpacks) |
| `start.sh` | Server startup script |
| `generate-config.js` | Generates `js/config.js` from env var during build |
| `js/config.js` | Authentication password (gitignored, generated on Railway) |
| `js/config.example.js` | Template for local development |
| `js/auth.js` | Authentication logic |
| `data/stages-data.json` | Centralized stage data |

### Architecture

- **Static Site:** HTML/CSS/JavaScript (no backend)
- **Authentication:** Client-side password check with localStorage
- **Data:** Centralized in `data/stages-data.json`
- **Build:** Nixpacks (Python + Node.js)
- **Server:** Python HTTP server (for static file serving)
- **Deployment:** Railway (auto-deploy from GitHub)

## Troubleshooting

### Local Development Issues

**Password not working locally:**
- Ensure `js/config.js` exists (copy from `js/config.example.js`)
- Check that password in `js/config.js` matches what you're entering
- Clear browser localStorage: `localStorage.clear()` in browser console

**Server won't start:**
- Check if port 8000 is already in use
- Try a different port: `python3 -m http.server 8080 --bind 0.0.0.0`

### Railway Deployment Issues

**502 Bad Gateway:**
- Check that server binds to `0.0.0.0` (not `localhost`)
- Verify `PORT` environment variable is being used
- Check Railway logs for server startup messages

**Authentication not working:**
- Verify `AUTH_PASSWORD` is set in Railway Variables
- Check build logs for: `✓ Generated js/config.js`
- Ensure password matches exactly (case-sensitive)

**Build fails:**
- Check if `AUTH_PASSWORD` environment variable is set
- Verify Node.js is available (should be installed by Nixpacks)
- Check build logs for specific error messages

**Port issues:**
- Let Railway auto-detect the port (don't set custom port)
- Default detected port is usually 8080 for Python
- Server should use `$PORT` environment variable

## Security Notes

- `js/config.js` is gitignored and never committed to repository
- On Railway, password is stored as environment variable (encrypted at rest)
- Authentication is client-side only (suitable for basic access control)
- For production use, consider implementing server-side authentication

## Support

For issues or questions:
1. Check Railway build logs
2. Check browser console for JavaScript errors
3. Verify environment variables are set correctly
4. Review this README's troubleshooting section

