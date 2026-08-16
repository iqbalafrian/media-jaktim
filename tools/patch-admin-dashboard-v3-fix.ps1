$html = Get-Content admin-dashboard-v3.html -Raw


$html = $html.Replace(
'<div class="actions"><a class="btn secondary"',
'<div class="dashboard-tools"><div class="actions"><a class="btn secondary"'
)


$html = $html.Replace(
'</button></div><div class="admin-grid">',
'</button></div></div><div class="admin-grid">'
)


Set-Content admin-dashboard-v3-fix.html $html -Encoding UTF8

Write-Host "ADMIN DASHBOARD V3 FIX CREATED"