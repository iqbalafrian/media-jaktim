$css="admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   NEWS LAYOUT FIX V4.3
   Prevent meta clipping
===================================== */


.news-text{

    display:flex !important;
    justify-content:flex-start !important;
    align-items:center;

    gap:15px;

}


.news-text > b,
.news-text .news-title{

    flex:1;
    min-width:0;

}


.news-info-right,
.article-info-right{

    margin-left:auto;

    flex:none;

    width:140px !important;
    min-width:140px !important;

    text-align:right;

}


.news-item{

    overflow:visible !important;

}


.news-info-right small,
.article-info-right small{

    white-space:nowrap;

}

"@

Write-Host "NEWS LAYOUT FIX V4.3 ACTIVE"