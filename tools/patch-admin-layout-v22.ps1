$css = Get-Content admin-premium.css -Raw


$add = @'

/* ===========================
   ADMIN PREMIUM V2.2 LAYOUT
=========================== */


.admin-wrap{
    max-width:1400px;
    margin:30px auto;
}


.admin-grid{
    display:grid;
    grid-template-columns:380px 1fr;
    gap:20px;
    align-items:start;
}


.actions{
    display:flex;
    gap:10px;
    justify-content:flex-end;
}


.news-list{
    max-height:none;
}


/* STAT GRID */

.admin-stats{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:16px;
}


.admin-stats > div{
    min-width:0;
}


/* MOBILE */

@media(max-width:768px){

.admin-wrap{
    margin:15px auto;
    padding:12px;
}


.admin-grid{
    grid-template-columns:1fr;
}


.admin-stats{
    grid-template-columns:repeat(2,1fr);
}


.admin-stats > div{
    width:auto;
}


.actions{
    justify-content:flex-start;
    flex-wrap:wrap;
}

}

'@


Set-Content admin-layout-v22.css ($css + $add) -Encoding UTF8

Write-Host "ADMIN LAYOUT V2.2 CREATED"