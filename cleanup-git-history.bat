@echo off
echo 🧹 Starting Git history cleanup...

echo 📦 Creating backup...
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "backup-branch=backup-%YYYY%%MM%%DD%-%HH%%Min%"
git branch %backup-branch%

echo 🗑️ Removing sensitive files from Git history...
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env backend/.env backend/email-config.txt" --prune-empty --tag-name-filter cat -- --all

echo 🧽 Cleaning up repository...
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ✅ Git history cleanup completed!
echo 📤 Ready to force push to remote repository
echo.
echo ⚠️  IMPORTANT: Run these commands to update remote:
echo    git push origin --force --all
echo    git push origin --force --tags
pause 