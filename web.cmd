@echo off
rem Build the project and copy necessary files to the dist folder
call npm run build
if not exist dist (
    mkdir dist
)

copy /Y "index.html" "dist\"
copy /Y "package.json" "dist\"
copy /Y "server.js" "dist\"
copy /Y ".env.example" "dist\"
xcopy /E /I /Y "client" "dist\client\"
xcopy /E /I /Y "server" "dist\server\"
exit /b 0
