$source = "admin.js"
$backup = "backup-admin-clean-v1\admin.js"

Copy-Item $source $backup -Force

$content = Get-Content $source -Raw


# Hapus duplicate updateStats pertama
$pattern = '(?s)// =======================\s*// ADMIN STATISTIC\s*function updateStats\(data\)\{.*?\n\}\s*'


$content = [regex]::Replace(
    $content,
    $pattern,
    '',
    1
)


# Tambahkan statistik saat loadCMS selesai ambil data
$content = $content.Replace(
"let totalArticles = articles.length;",
"let totalArticles = articles.length;

updateStats(articles);"
)


# Hapus listener kategori pertama yang hanya loadArticles
$content = $content.Replace(
'loadArticles();',
'loadCMS();'
)


# Hapus clock duplicate
$content = $content.Replace(
'setInterval(updateClock,1000);',
'// removed duplicate clock'
)


Set-Content admin-clean-v1.js $content -Encoding UTF8

Write-Host "ADMIN CLEAN V1 CREATED"