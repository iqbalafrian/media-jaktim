$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   PANEL BOX ALIGN V4.6
===================================== */

.admin-wrap,
.admin-grid,
.admin-grid > section,
.panel{

    box-sizing:border-box;

}


.admin-grid{

    width:100% !important;

}


.admin-grid > section{

    max-width:none !important;

}


.admin-grid > section:last-child{

    padding-right:0;

}

"@

Write-Host "PANEL BOX ALIGN V4.6 ACTIVE"