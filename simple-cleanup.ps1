# Simple Git history cleanup script
# Run this in PowerShell on Windows

Write-Host "Starting Git history cleanup..." -ForegroundColor Green

# Create backup branch
Write-Host "Creating backup branch..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupBranch = "backup-$timestamp"
git branch $backupBranch

# Remove sensitive files from history
Write-Host "Removing sensitive files from Git history..." -ForegroundColor Yellow
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env backend/.env backend/email-config.txt" --prune-empty --tag-name-filter cat -- --all

# Clean up repository
Write-Host "Cleaning up repository..." -ForegroundColor Yellow
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "Cleanup completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. git push origin --force --all" -ForegroundColor Cyan
Write-Host "2. git push origin --force --tags" -ForegroundColor Cyan 