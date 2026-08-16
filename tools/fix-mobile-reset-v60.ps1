$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   MOBILE RESET V60
   Restore Original Mobile Layout
===================================== */

@media(max-width:768px){

    .admin-wrap{
        padding:14px !important;
    }


    .admin-grid{

        display:block !important;

        width:100% !important;

    }


    .admin-grid > section{

        width:100% !important;

        margin-bottom:20px;

    }


    .panel{

        width:100% !important;

    }


    .news-item{

        width:100% !important;

    }

}

"@

Write-Host "MOBILE RESET V60 ACTIVE"