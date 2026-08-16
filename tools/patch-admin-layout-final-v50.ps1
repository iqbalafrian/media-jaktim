$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   ADMIN LAYOUT FINAL V50
   Clean Grid Structure
===================================== */


.admin-grid{

    display:grid;

    grid-template-columns:
    360px minmax(0,1fr);

    gap:24px;

    width:100%;

    align-items:stretch;

}


.admin-grid > .panel{

    width:100%;

    box-sizing:border-box;

}


.news-list{

    width:100%;

}


@media(max-width:900px){

    .admin-grid{

        grid-template-columns:1fr;

    }

}

"@

Write-Host "ADMIN LAYOUT FINAL V50 ACTIVE"