$css="admin-premium.css"

$data = Get-Content $css -Raw

$data = $data -replace "grid-template-columns:380px 1fr;","grid-template-columns:320px 1fr;"

Set-Content $css $data -Encoding UTF8

Write-Host "ADMIN GRID FINAL FIX DONE"