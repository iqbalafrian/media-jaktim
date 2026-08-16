$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   PANEL STRETCH FIX V51
===================================== */


.admin-grid{

    width:100% !important;

}


.admin-grid > section.panel{

    width:100% !important;

    max-width:none !important;

    box-sizing:border-box !important;

}


.admin-grid > section:last-child{

    flex:1;

}


.news-list,
#list{

    width:100% !important;

}


"@

Write-Host "PANEL STRETCH FIX V51 ACTIVE"