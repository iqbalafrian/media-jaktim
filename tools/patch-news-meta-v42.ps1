$css = "admin-newsroom-v35.css"

Add-Content $css @"

/* =====================================
   NEWS META FIX V4.2
   Prevent published clipping
===================================== */

.news-info-right,
.article-info-right{

    min-width:130px !important;
    width:130px;
    flex-shrink:0;

    text-align:right;
    white-space:normal;

}


.news-info-right small,
.article-info-right small{

    display:block;
    line-height:1.3;

}


.news-text{

    gap:15px;

}


.news-text > *{

    min-width:0;

}

"@

Write-Host "NEWS META FIX V4.2 ACTIVE"