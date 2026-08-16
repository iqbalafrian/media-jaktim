$html = Get-Content admin.html -Raw


if($html -notmatch "admin-newsroom-v35.css"){

$html = $html.Replace(
'<link rel="stylesheet" href="admin-premium.css">',
'<link rel="stylesheet" href="admin-premium.css"><link rel="stylesheet" href="admin-newsroom-v35.css">'
)

}


Set-Content admin.html $html -Encoding UTF8


Write-Host "NEWSROOM V3.5 CSS ACTIVE"