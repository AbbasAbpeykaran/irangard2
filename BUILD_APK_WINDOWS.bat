cd /d "%~dp0"
@echo off
chcp 65001 >nul
title IranGard APK Builder
echo ========================================
echo       IranGard - Android APK Builder
echo ========================================
echo.
echo This will create an installable APK using Expo EAS Build.
echo You need a free Expo account and an internet connection.
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install the LTS version from https://nodejs.org/
  pause
  exit /b 1
)
echo Checking Expo login...
call npx eas-cli whoami
if errorlevel 1 (
  echo.
  echo Please log in to your Expo account:
  call npx eas-cli login
  if errorlevel 1 (
    echo Login failed.
    pause
    exit /b 1
  )
)
echo.
echo Starting Android APK build...
call npx eas-cli build --platform android --profile preview
echo.
echo When the build finishes, open the build URL shown above on your phone
echo and download/install the APK.
pause
