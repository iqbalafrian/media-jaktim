Add-Content admin-premium.css @'

/* ADMIN V3 BACKGROUND CLEAN */

.admin-wrap{
    background:#111;
}


.admin-head{
    background:linear-gradient(135deg,#ff7a00,#d94f00);
    min-height:auto;
}


.dashboard-tools{
    background:#171717;
}


@media(min-width:769px){

.admin-wrap{
    padding:30px;
}


.admin-head{
    padding:35px;
}

}

'@

Write-Host "ADMIN V3 BACKGROUND FIX DONE"