#!/usr/bin/env node
/**
 * Generate config.js from environment variable
 * This script runs during build to create config.js from Railway's AUTH_PASSWORD env var
 */

const fs = require('fs');
const path = require('path');

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'your-secure-password-here';
const configPath = path.join(__dirname, 'js', 'config.js');
const configContent = `// Auto-generated from Railway environment variable
// DO NOT EDIT - This file is generated during deployment
const CONFIG = {
    AUTH_PASSWORD: '${AUTH_PASSWORD.replace(/'/g, "\\'")}'
};
`;

// Ensure js directory exists
const jsDir = path.dirname(configPath);
if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
}

// Write config file
fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✓ Generated js/config.js from AUTH_PASSWORD environment variable');

