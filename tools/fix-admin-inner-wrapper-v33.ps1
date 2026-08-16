$html = Get-Content admin-v32.html -Raw


$html = $html.Replace(
'<div class="admin-head"><div><h1>',
'<div class="admin-head"><h1>'
)


$html = $html.Replace(
'</p></div><div class="dashboard-tools">',
'</p></div><div class="dashboard-tools">'
)


Set-Content admin-v33.html $html


Write-Host "ADMIN INNER WRAPPER V33 CREATED"