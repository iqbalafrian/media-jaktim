$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   MOBILE WRAPPER RESET V61
===================================== */

@media(max-width:768px){

.admin-wrap{

    width:100% !important;

    max-width:none !important;

    margin:0 !important;

    padding:14px !important;

    box-sizing:border-box !important;

}


body{

    overflow-x:hidden !important;

}


.admin-grid{

    width:100% !important;

}


.panel{

    width:100% !important;

    box-sizing:border-box !important;

}

}

"@

Write-Host "MOBILE WRAPPER V61 DONE"