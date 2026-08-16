$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   ADMIN GRID WIDTH FIX V4.4
   Match Dashboard Panel Width
===================================== */


.admin-grid{

    display:grid !important;

    grid-template-columns:
    320px minmax(0,1fr) !important;

    gap:24px;

    width:100%;

}


.admin-grid > section{

    width:100%;

    min-width:0;

}


/* NEWS PANEL */

.admin-grid > section:last-child{

    width:100%;

    max-width:none;

}


.news-item{

    width:100%;

}


@media(max-width:900px){

.admin-grid{

    grid-template-columns:1fr !important;

}

}

"@

Write-Host "ADMIN GRID WIDTH FIX V4.4 ACTIVE"