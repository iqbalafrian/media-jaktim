Add-Content admin-premium.css @'

/* ADMIN DASHBOARD V3 CLEAN */

.admin-head{
    margin-bottom:20px;
}


.dashboard-tools{
    background:#111;
    padding:20px;
    border-radius:18px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:20px;
    margin-bottom:20px;
}


.dashboard-tools .admin-stats{
    margin-top:0;
    flex:1;
}


.dashboard-tools .actions{
    flex-shrink:0;
}


@media(max-width:768px){

.dashboard-tools{
    flex-direction:column;
    align-items:stretch;
}


.dashboard-tools .actions{
    width:100%;
}


.dashboard-tools .actions .btn{
    width:auto;
}

}

'@

Write-Host "ADMIN V3 CSS PATCH DONE"