$html = Get-Content admin.html -Raw


$html = $html -replace `
'</div><div class="dashboard-tools"><div class="admin-stats">',`
'</div></div><div class="dashboard-tools"><div class="admin-stats">'


$html = $html -replace `
'</div><div class="actions">',`
'</div><div class="actions">'


Set-Content admin-v31.html $html


Write-Host "ADMIN STRUCTURE V31 CREATED"