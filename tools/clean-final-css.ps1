$css="admin-newsroom-v35.css"

$content = Get-Content $css -Raw

$index = $content.IndexOf("/* =====================================`r`n   ADMIN LAYOUT FINAL V50")

if($index -lt 0){
    $index = $content.IndexOf("/* =====================================`n   ADMIN LAYOUT FINAL V50")
}

if($index -gt 0){

    $content = $content.Substring(0,$index)

    Set-Content $css $content

    Write-Host "FINAL PATCH CLEAN DONE"

}else{

    Write-Host "PATCH START NOT FOUND"

}