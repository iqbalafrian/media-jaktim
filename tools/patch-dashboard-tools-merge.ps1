$html = Get-Content admin-dashboard-v3-fix.html -Raw


$html = $html.Replace(
'</div><div class="dashboard-tools"><div class="actions">',
'</div><div class="actions">'
)


Set-Content admin-dashboard-v3-final.html $html -Encoding UTF8

Write-Host "DASHBOARD TOOLS MERGED"
