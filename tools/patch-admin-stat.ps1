$source="admin.js"

Copy-Item $source "backup-admin-clean-v1\admin-before-stat-patch.js" -Force

$content=Get-Content $source -Raw


$content=$content.Replace(
"let totalArticles = articles.length;",
"let totalArticles = articles.length;

updateStats(articles);"
)


Set-Content "admin-stat-v1.js" $content -Encoding UTF8

Write-Host "ADMIN STAT PATCH CREATED"