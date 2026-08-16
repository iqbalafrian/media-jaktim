$html = Get-Content admin.html -Raw


$old = @'
<div class="admin-head"><div><h1>Dashboard Berita</h1>
<p id="clock">
'@


$new = @'
<div class="admin-head">
<h1>Dashboard Berita</h1>
<p id="clock">
'@


$html = $html.Replace($old,$new)



$html = $html.Replace(
'</div><div class="admin-stats">',
'</div></div><div class="dashboard-tools"><div class="admin-stats">'
)



$html = $html.Replace(
'<div class="actions">',
'<div class="actions">'
)


Set-Content admin-v32.html $html


Write-Host "ADMIN STRUCTURE V32 CREATED"