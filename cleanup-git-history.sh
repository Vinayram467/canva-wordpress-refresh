#!/bin/bash

echo "🧹 Starting Git history cleanup..."

# Create a backup of current state
echo "📦 Creating backup..."
git branch backup-$(date +%Y%m%d-%H%M%S)

# Remove sensitive files from Git history
echo "🗑️ Removing sensitive files from Git history..."

# Remove .env files
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env backend/.env backend/email-config.txt" \
  --prune-empty --tag-name-filter cat -- --all

# Clean up the repository
echo "🧽 Cleaning up repository..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "✅ Git history cleanup completed!"
echo "📤 Ready to force push to remote repository"
echo ""
echo "⚠️  IMPORTANT: Run these commands to update remote:"
echo "   git push origin --force --all"
echo "   git push origin --force --tags" 