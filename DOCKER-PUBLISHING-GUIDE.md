# Publishing VS Code Extension with Docker

## 📦 No Node.js/npm Installation Required!

This guide shows you how to package and publish your VS Code extension using only Docker.

---

## 🚀 Quick Start

### Step 1: Prepare Your Extension Files

Create a folder with these files:
```
readme-combiner-vscode/
├── Dockerfile.vsce          # ← Docker build file
├── docker-compose.yml       # ← Docker commands helper
├── package.json            # ← Extension manifest
├── extension.js            # ← Main code
├── README.md              # ← Documentation
├── CHANGELOG.md           # ← Version history
├── .vscodeignore          # ← Exclude files
├── LICENSE                # ← Your license
└── icon.png               # ← Extension icon (optional)
```

### Step 2: Build the Docker Image

```bash
# Navigate to your extension folder
cd readme-combiner-vscode

# Build the Docker image
docker build -f Dockerfile.vsce -t vsce-builder .
```

---

## 📋 Common Tasks

### Package the Extension (Create .vsix file)

```bash
# Using docker run
docker run --rm -v ${PWD}:/extension vsce-builder vsce package

# Using docker-compose
docker-compose run --rm vsce-builder vsce package
```

**Output:** Creates `readme-combiner-1.0.0.vsix` in your folder

### Login to Marketplace

```bash
# Replace YOUR_PUBLISHER_ID with your actual publisher ID
docker run --rm -it -v ${PWD}:/extension vsce-builder vsce login YOUR_PUBLISHER_ID

# You'll be prompted to enter your Personal Access Token
```

### Publish to Marketplace

```bash
# Make sure you're logged in first!
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish

# Or with docker-compose
docker-compose run --rm vsce-builder vsce publish
```

### Update Version and Publish

```bash
# Patch version (1.0.0 → 1.0.1)
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish patch

# Minor version (1.0.0 → 1.1.0)
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish minor

# Major version (1.0.0 → 2.0.0)
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish major
```

---

## 🔐 Getting Your Personal Access Token (PAT)

Since you still need the PAT but don't need Node.js/npm installed:

1. **Go to:** https://dev.azure.com/
2. **Sign in** with your Microsoft/GitHub account
3. **Click** User Settings (top right) → Personal Access Tokens
4. **Create token:**
   - Name: `vscode-marketplace`
   - Organization: All accessible organizations
   - Scopes: **Marketplace** → ✓ Manage
5. **Copy the token** (save it somewhere safe!)

---

## 🎯 Complete Publishing Workflow

```bash
# 1. Build Docker image (one time only)
docker build -f Dockerfile.vsce -t vsce-builder .

# 2. Package your extension
docker run --rm -v ${PWD}:/extension vsce-builder vsce package

# 3. Test locally (install the .vsix in VS Code)
code --install-extension readme-combiner-1.0.0.vsix

# 4. Login to marketplace
docker run --rm -it -v ${PWD}:/extension vsce-builder vsce login YOUR_PUBLISHER_ID
# Paste your PAT when prompted

# 5. Publish!
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish

# Done! 🎉
```

---

## 💡 PowerShell Commands (Windows)

If you're on Windows PowerShell, use these commands instead:

```powershell
# Build
docker build -f Dockerfile.vsce -t vsce-builder .

# Package
docker run --rm -v ${PWD}:/extension vsce-builder vsce package

# Login
docker run --rm -it -v ${PWD}:/extension vsce-builder vsce login YOUR_PUBLISHER_ID

# Publish
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish
```

---

## 🐛 Troubleshooting

### Issue: Docker not found
**Solution:** Install Docker Desktop from https://www.docker.com/products/docker-desktop/

### Issue: Permission denied errors
**Solution:** 
- **Linux/Mac:** Add `sudo` before docker commands
- **Windows:** Run PowerShell as Administrator

### Issue: Volume mounting doesn't work
**Solution:** 
- **Windows:** Make sure Docker Desktop has access to your drive
  - Docker Desktop → Settings → Resources → File Sharing
  - Add your project folder path

### Issue: Changes not reflected
**Solution:** Rebuild the image
```bash
docker build -f Dockerfile.vsce -t vsce-builder . --no-cache
```

---

## 📝 Simplified Commands with Aliases

### Create Aliases (Optional but Recommended)

**On Linux/Mac (add to ~/.bashrc or ~/.zshrc):**
```bash
alias vsce-package='docker run --rm -v ${PWD}:/extension vsce-builder vsce package'
alias vsce-publish='docker run --rm -v ${PWD}:/extension vsce-builder vsce publish'
alias vsce-login='docker run --rm -it -v ${PWD}:/extension vsce-builder vsce login'
```

**On Windows (PowerShell Profile):**
```powershell
# Edit: notepad $PROFILE
function Vsce-Package { docker run --rm -v ${PWD}:/extension vsce-builder vsce package }
function Vsce-Publish { docker run --rm -v ${PWD}:/extension vsce-builder vsce publish }
function Vsce-Login { docker run --rm -it -v ${PWD}:/extension vsce-builder vsce login $args }
```

Then reload and use:
```bash
vsce-package
vsce-publish
vsce-login YOUR_PUBLISHER_ID
```

---

## 📊 What Each File Does

| File | Purpose |
|------|---------|
| `Dockerfile.vsce` | Defines the Docker image with Node.js and vsce |
| `docker-compose.yml` | Simplifies Docker commands |
| `package.json` | Extension configuration |
| `extension.js` | Your actual extension code |
| `.vscodeignore` | Files to exclude from package |

---

## ✅ Benefits of Using Docker

✓ **No Node.js installation** needed on your machine
✓ **Consistent environment** - works the same everywhere
✓ **Clean system** - everything contained in Docker
✓ **Easy updates** - just rebuild the image
✓ **Shareable** - others can use the same setup

---

## 🔄 Alternative: Use Pre-built Image

Instead of building yourself, you can use a pre-built Node image:

```bash
# Package
docker run --rm -v ${PWD}:/app -w /app node:18-alpine sh -c "npm install -g @vscode/vsce && vsce package"

# Publish
docker run --rm -it -v ${PWD}:/app -w /app node:18-alpine sh -c "npm install -g @vscode/vsce && vsce publish"
```

**Pros:** No Dockerfile needed
**Cons:** Slower (installs vsce each time)

---

## 🎓 Summary

**You need Docker installed, but NOT Node.js/npm!**

1. Create extension files
2. Build Docker image once
3. Use Docker commands to package/publish
4. Never touch Node.js directly

**Your main command will be:**
```bash
docker run --rm -v ${PWD}:/extension vsce-builder vsce publish
```

That's it! 🚀

---

Need help with a specific step? Let me know!
