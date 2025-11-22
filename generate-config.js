#!/usr/bin/env node
/**
 * Generate config.js from environment variable
 * This script runs during build to create config.js from Railway's AUTH_PASSWORD env var
 */

const fs = require('fs');
const path = require('path');

const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

if (!AUTH_PASSWORD) {
    console.error('ERROR: AUTH_PASSWORD environment variable is not set!');
    console.error('Please set AUTH_PASSWORD in Railway environment variables.');
    process.exit(1);
}

// Escape single quotes and backslashes in password
const escapedPassword = AUTH_PASSWORD
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/'/g, "\\'")     // Escape single quotes
    .replace(/\n/g, '\\n')    // Escape newlines
    .replace(/\r/g, '\\r');   // Escape carriage returns

const configPath = path.join(__dirname, 'js', 'config.js');
const configContent = `// Auto-generated from Railway environment variable
// DO NOT EDIT - This file is generated during deployment
const CONFIG = {
    AUTH_PASSWORD: '${escapedPassword}'
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
console.log(`✓ Password length: ${AUTH_PASSWORD.length} characters`);

