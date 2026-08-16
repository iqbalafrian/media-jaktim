$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   MOBILE NEWSROOM FIX V52
===================================== */

@media(max-width:900px){

.admin-wrap{
    padding:14px !important;
}


.admin-grid{
    display:block !important;
}


.admin-grid > section{
    width:100% !important;
    margin-bottom:20px;
}


/* NEWS ITEM MOBILE */

.news-item{

    width:100% !important;

    overflow:hidden !important;

}


.news-item > div{

    max-width:100% !important;

}


.news-text{

    min-width:0 !important;

}


.news-text b{

    display:block;

    white-space:normal !important;

    overflow-wrap:anywhere;

}


/* META KANAN */

.news-info-right,
.article-info-right{

    position:static !important;

    width:100% !important;

    text-align:left !important;

    margin-top:8px;

}


.news-img{

    flex-shrink:0;

}


}

"@

Write-Host "MOBILE NEWSROOM V52 ACTIVE"