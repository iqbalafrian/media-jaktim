$html = Get-Content admin.html -Raw

Copy-Item admin.html "backup-admin-v21\admin-before-stat-clean.html" -Force


$pattern = '(?s)<div class="admin-stats">\s*<div class="stat-box">.*?</div>\s*</div>\s*</div>'


$matches = [regex]::Matches($html,$pattern)


if($matches.Count -ge 1){

    $remove = $matches[$matches.Count-1].Value

    $html = $html.Replace($remove,"")

}


Set-Content "admin-dashboard-clean-v21.html" $html -Encoding UTF8


Write-Host "ADMIN DASHBOARD CLEAN V21 CREATED"