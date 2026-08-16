$css = Get-Content admin-newsroom-v35.css -Raw


$patch = @'

/* =====================================
   THEME TOGGLE + CLOCK FIX V4.0
===================================== */

.dashboard-title{
    display:flex;
    align-items:center;
    justify-content:space-between;
}


.theme-toggle{
    background:transparent;
    border:none;
    outline:none;
    cursor:pointer;
    font-size:22px;
    padding:4px;
    color:#d1d5db;
}


.theme-toggle:hover{
    color:#f97316;
}


#clock{
    color:#d1d5db !important;
    font-size:14px;
}

'@


if($css -notmatch "THEME TOGGLE + CLOCK FIX V4.0"){

    Add-Content admin-newsroom-v35.css $patch

}


Write-Host "THEME CSS V4.0 CREATED"