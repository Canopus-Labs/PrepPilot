# Troubleshooting Guide

This document provides solutions to common issues encountered while setting up, developing, testing, and deploying the project.

---

# Table of Contents

* Installation Issues
* Environment Configuration
* Authentication Issues
* Database Issues
* Frontend Issues
* Backend Issues
* Testing Issues
* Build & Deployment Issues
* CI/CD Issues
* Debugging Tips
* Frequently Asked Questions

---

# Installation Issues

## npm install Fails

### Symptoms

```bash
npm ERR! code ERESOLVE
npm ERR! dependency conflict
```

### Solution

Remove existing dependencies and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

Windows:

```bash
rmdir /s node_modules
del package-lock.json
npm install
```

---

## Python Package Installation Fails

### Symptoms

```bash
ModuleNotFoundError
pip install failed
```

### Solution

Upgrade pip and reinstall:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

# Environment Configuration

## Missing Environment Variables

### Symptoms

* Application crashes during startup
* API requests fail unexpectedly
* Authentication does not work

### Solution

Verify all required environment variables are configured.

Example:

```env
API_URL=
JWT_SECRET=
DATABASE_URL=
```

Compare your `.env` file with any provided `.env.example`.

---

## Environment Changes Not Applied

### Solution

Restart development servers after updating environment variables.

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm start
```

---

# Authentication Issues

## Invalid Token Error

### Symptoms

```text
Unauthorized
Invalid Token
401 Error
```

### Solution

Clear stored authentication tokens:

Browser Console:

```javascript
localStorage.clear();
sessionStorage.clear();
```

Login again.

---

## Login Not Persisting

### Solution

Verify:

* Token is stored correctly
* Remember Me option is enabled (if applicable)
* Authentication middleware is functioning correctly

---

# Database Issues

## Database Connection Failed

### Symptoms

```text
Connection refused
Database unavailable
```

### Solution

Verify:

* Database server is running
* Connection string is correct
* Environment variables are configured
* Firewall is not blocking connections

---

## Migration Errors

### Solution

Run migrations again:

```bash
npm run migrate
```

or

```bash
python manage.py migrate
```

depending on project configuration.

---

# Frontend Issues

## Blank Page After Startup

### Solution

Check browser console:

```text
F12 → Console
```

Look for:

* JavaScript errors
* Failed API requests
* Missing environment variables

---

## API Requests Failing

### Verify

* Backend server is running
* API URL is correct
* CORS configuration is valid

Check Network tab in browser developer tools.

---

## Styling Issues

### Solution

Rebuild frontend assets:

```bash
npm run build
```

or restart development server:

```bash
npm run dev
```

---

# Backend Issues

## Server Fails to Start

### Symptoms

```bash
Port already in use
```

### Solution

Find process:

Linux/macOS:

```bash
lsof -i :5000
kill -9 <PID>
```

Windows:

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Internal Server Error (500)

### Solution

Check backend logs:

```bash
npm start
```

Look for:

* Missing environment variables
* Database errors
* API exceptions

---

# Testing Issues

## Frontend Tests Failing

Run:

```bash
npm test
```

### Verify

* Dependencies installed
* Environment variables configured
* Test database available (if required)

---

## Backend Tests Failing

Run:

```bash
pytest
```

or

```bash
npm test
```

depending on project setup.

### Common Fixes

```bash
pip install -r requirements.txt
```

```bash
npm install
```

---

## Module Not Found Errors

### Solution

Reinstall dependencies:

```bash
npm install
```

or

```bash
pip install -r requirements.txt
```

---

# Build & Deployment Issues

## Build Fails

Run:

```bash
npm run build
```

### Check For

* Lint errors
* Type errors
* Missing imports
* Environment variable issues

---

## Deployment Fails

### Verify

* Build passes locally
* Environment variables exist in deployment platform
* Required secrets are configured

---

# CI/CD Issues

## GitHub Actions Failing

### Solution

Check workflow logs:

```text
GitHub Repository
→ Actions
→ Failed Workflow
→ Logs
```

Verify:

* Secrets are configured
* Environment variables exist
* Dependencies install successfully

---

## Vercel Deployment Issues

### Verify

* Environment variables are configured in Vercel
* Build command is correct
* Output directory is configured properly

---

# Debugging Tips

## Frontend Debugging

Run:

```bash
npm run dev
```

Open browser console:

```text
F12 → Console
```

Check:

* Errors
* Warnings
* Failed API requests

---

## Backend Debugging

Run server locally:

```bash
npm start
```

or

```bash
python app.py
```

Monitor logs while reproducing the issue.

---

## API Debugging

Use:

* Postman
* Thunder Client
* Browser Network Tab

Verify:

* Request URL
* Headers
* Authentication tokens
* Response status codes

---

# Frequently Asked Questions

## Why am I getting a blank page?

Possible causes:

* Frontend build failure
* Missing environment variables
* JavaScript runtime errors

Check browser console.

---

## Why are API requests failing?

Verify:

* Backend server is running
* API URL is correct
* Authentication token is valid

---

## Why are tests failing locally but passing in CI?

Possible causes:

* Missing environment variables
* Different dependency versions
* Local database configuration

Compare your environment with CI settings.

---

# Additional Resources

* README.md
* CONTRIBUTING.md
* Project Issues
* Project Discussions

If the problem persists, please open a GitHub Issue and include:

* Operating System
* Node.js/Python Version
* Error Message
* Steps to Reproduce
* Screenshots or Logs
