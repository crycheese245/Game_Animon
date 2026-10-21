@echo off
setlocal
set JAR_PATH=E:\WorkSpace\Projects\vuong-quoc-sung-cau-vong_240x320.jar
set JAR_EXE=C:\Program Files\Java\jdk-21.0.12.1\bin\jar.exe
set EXTRACT_DIR=tools\j2me-extracted
if not exist "%EXTRACT_DIR%" mkdir "%EXTRACT_DIR%"
"%JAR_EXE%" xvf "%JAR_PATH%" -C "%EXTRACT_DIR%"
powershell -Command "$root = '%EXTRACT_DIR%'; Get-ChildItem -Path $root -Recurse -File | ForEach-Object { $full = $_.FullName; $rel = $full.Substring($root.Length+1); $size = $_.Length; $hash = Get-FileHash -Path $full -Algorithm SHA256 | Select-Object -Expand Hash; [PSCustomObject]@{path=$rel;size=$size;sha256=$hash} } | ConvertTo-Json -Depth 5 | Out-File -Encoding UTF8 '%EXTRACT_DIR%\asset-manifest.json'"
endlocal
