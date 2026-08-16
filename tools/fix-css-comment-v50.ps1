$css="admin-newsroom-v35.css"

$data = Get-Content $css -Raw

$data = $data -replace "/\* =====================================\s*$",""

Set-Content $css $data -Encoding UTF8

Write-Host "CSS COMMENT CLEAN V50 DONE"