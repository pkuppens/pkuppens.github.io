@echo off
setlocal
REM Double-click friendly: runs PowerShell helper with execution policy bypass.
cd /d "%~dp0..\.."
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0linkedin-experience-from-chrome.ps1" %*
set EXIT=%ERRORLEVEL%
if %EXIT% neq 0 pause
exit /b %EXIT%
