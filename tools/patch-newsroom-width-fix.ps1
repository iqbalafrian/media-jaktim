$css = "admin-newsroom-v35.css"

$patch = @"

/* =====================================
   NEWSROOM WIDTH FIX V4.1
   Fix article meta clipping
===================================== */

.admin-grid{
    grid-template-columns: minmax(300px,34%) minmax(0,1fr);
    align-items:stretch;
}

.admin-grid > section{
    min-width:0;
}

.news-item,
.article-card,
.article{
    min-width:0;
    overflow:hidden;
}

.article-meta,
.news-meta{
    min-width:0;
}

.article-info-right,
.news-info-right{
    flex-shrink:0;
    min-width:90px;
    text-align:right;
}

"@

Add-Content $css $patch

Write-Host "NEWSROOM WIDTH FIX V4.1 ACTIVE"