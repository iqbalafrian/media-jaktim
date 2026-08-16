$html = Get-Content admin-dashboard-v3-fix.html -Raw


# hapus wrapper kedua sebelum actions
$html = $html -replace `
'<div class="dashboard-tools"><div class="actions">',`
'<div class="actions">'


# pastikan actions tetap sebelum admin-grid
$html = $html -replace `
'</button></div></div><div class="admin-grid">',`
'</button></div></div><div class="admin-grid">'


Set-Content admin-dashboard-v3-final.html $html -Encoding UTF8

Write-Host "DASHBOARD WRAPPER FIXED"