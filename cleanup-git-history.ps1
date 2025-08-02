# PowerShell script to clean Git history of sensitive data
# Run this in PowerShell on Windows

Write-Host "Starting Git history cleanup..." -ForegroundColor Green

# Create a backup of current state
Write-Host "Creating backup..." -ForegroundColor Yellow
$backupBranch = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
git branch $backupBranch

# Remove sensitive files from Git history
Write-Host "Removing sensitive files from Git history..." -ForegroundColor Yellow

# Remove .env files and other sensitive files
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env backend/.env backend/email-config.txt" --prune-empty --tag-name-filter cat -- --all

# Clean up the repository
Write-Host "Cleaning up repository..." -ForegroundColor Yellow
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "Git history cleanup completed!" -ForegroundColor Green
Write-Host "Ready to force push to remote repository" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Run these commands to update remote:" -ForegroundColor Red
Write-Host "   git push origin --force --all" -ForegroundColor Cyan
Write-Host "   git push origin --force --tags" -ForegroundColor Cyan 