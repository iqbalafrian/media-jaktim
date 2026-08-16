$html = Get-Content admin.html -Raw


$old = @'
<h1>Dashboard Berita</h1>
'@


$new = @'
<div class="dashboard-title">

<h1>Dashboard Berita</h1>

<button id="themeToggle" class="theme-toggle">
☀
</button>

</div>
'@


if($html -match "Dashboard Berita" -and $html -notmatch "themeToggle"){

$html = $html.Replace(
$old,
$new
)

Set-Content admin.html $html -Encoding UTF8

}


Write-Host "THEME HTML V4.0 CREATED"