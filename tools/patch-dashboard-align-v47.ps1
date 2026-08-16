$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   DASHBOARD ALIGNMENT FIX V47
===================================== */


.dashboard-tools,
.admin-grid{

    width:100% !important;

}


.dashboard-tools,
.admin-grid > section{

    box-sizing:border-box;

}


.admin-grid{

    margin-left:0 !important;
    margin-right:0 !important;

}


.admin-grid > section.panel{

    width:100% !important;

}


"@

Write-Host "DASHBOARD ALIGNMENT FIX V47 ACTIVE"