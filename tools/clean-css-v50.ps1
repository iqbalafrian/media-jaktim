$css="admin-newsroom-v35.css"

$data = Get-Content $css -Raw


$start = $data.IndexOf("NEWSROOM WIDTH FIX V4.1")


if($start -gt 0){

    $clean = $data.Substring(0,$start)

    Set-Content $css $clean -Encoding UTF8

    Write-Host "LAYOUT PATCH CLEAN V50 DONE"

}else{

    Write-Host "MARKER NOT FOUND"

}