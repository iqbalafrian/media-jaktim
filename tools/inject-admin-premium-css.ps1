$html = Get-Content admin.html -Raw

if($html -notmatch "admin-premium.css"){

$html = $html.Replace(
'<link rel="stylesheet" href="styles.css">',
'<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="admin-premium.css">'
)

}

Set-Content admin.html $html -Encoding UTF8

Write-Host "ADMIN PREMIUM CSS INJECTED"