$css="admin-newsroom-v35.css"

$data = Get-Content $css -Raw


$start = $data.IndexOf("NEWSROOM WIDTH FIX V4.1")


$end = $data.IndexOf("PANEL STRETCH FIX V51")


if($start -gt 0 -and $end -gt 0){

    $before = $data.Substring(0,$start)

    $after = $data.Substring($end)

    $new = $before + $after

    Set-Content $css $new -Encoding UTF8

    Write-Host "LAYOUT OLD PATCH REMOVED V52"

}else{

    Write-Host "MARKER NOT FOUND"

}