$path="admin.html"

$html=Get-Content $path -Raw


# pindahkan admin-stats keluar dari admin-head
$html=$html -replace `
'(<p>Kelola berita Media Jaktim\.</p>)\s*<div class="admin-stats">',`
'$1</div><div class="dashboard-tools"><div class="admin-stats">'


# tutup dashboard-tools sebelum admin-grid
$html=$html -replace `
'</div></div><div class="admin-grid">',`
'</div><div class="actions"><a class="btn secondary" href="index.html">LIHAT WEBSITE</a><button class="btn" id="logout">KELUAR</button></div></div><div class="admin-grid">'


# hapus actions lama yang masih tersisa
$html=$html -replace `
'<div class="actions"><a class="btn secondary" href="index.html">LIHAT WEBSITE</a><button class="btn" id="logout">KELUAR</button></div></div><div class="admin-grid">',`
'<div class="admin-grid">'


Set-Content admin-dashboard-v3.html $html

Write-Host "ADMIN DASHBOARD V3 CREATED"