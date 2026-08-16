Write-Host "=== MEDIA JAKTIM AUTO REPAIR ===" -ForegroundColor Cyan


$backup = "backup-repair-" + (Get-Date -Format "yyyyMMdd-HHmmss")

mkdir $backup | Out-Null


Copy-Item *.html $backup -Force
Copy-Item *.js $backup -Force
Copy-Item *.css $backup -Force


Write-Host "[1] Backup selesai"


# ===============================
# FIX ARTICLE NAVBAR
# ===============================

if(Test-Path "article.html"){

$content = Get-Content article.html -Raw


$content = $content -replace `
'onclick="filterCategory\(''Home''\)"',
'href="index.html"'


$content = $content -replace `
'onclick="filterCategory\(''([^'']+)''\)"',
'href="category.html?cat=$1"'


$content | Out-File article.html -Encoding utf8


Write-Host "[OK] Navbar article diperbaiki"

}



# ===============================
# FIX HAMBURGER ARTICLE
# ===============================


if(Test-Path "article-app.js"){

$js = Get-Content article-app.js -Raw


if($js -notmatch "menuToggle"){


Add-Content article-app.js @"


// AUTO MOBILE MENU FIX

const menuToggle=document.getElementById("menuToggle");
const drawerMenu=document.getElementById("drawerMenu");
const drawerOverlay=document.getElementById("drawerOverlay");


if(menuToggle){

menuToggle.onclick=()=>{

drawerMenu.classList.toggle("active");
drawerOverlay.classList.toggle("active");

};

}


if(drawerOverlay){

drawerOverlay.onclick=()=>{

drawerMenu.classList.remove("active");
drawerOverlay.classList.remove("active");

};

}

"@


Write-Host "[OK] Hamburger JS ditambahkan"

}

}



# ===============================
# FIX ADMIN VIDEO FIELD
# ===============================


if(Test-Path "admin.js"){


$admin = Get-Content admin.js -Raw


if($admin -notmatch "video_url:video_url"){

$admin=$admin -replace `
'image:image,',
'image:image,
video_url:video_url,'


$admin | Out-File admin.js -Encoding utf8

Write-Host "[OK] video_url field ditambahkan"

}

}



# ===============================
# CHECK SUPABASE COLUMN
# ===============================

# ===============================
# FIX MOBILE HAMBURGER CSS
# ===============================


if(Test-Path "styles.css"){

$css = Get-Content styles.css -Raw


if($css -notmatch "FINAL MOBILE HAMBURGER FIX"){


Add-Content styles.css @"

/* FINAL MOBILE HAMBURGER FIX */

@media(max-width:720px){

.header{
    display:flex;
    align-items:center;
}

.header .search-box{
    display:flex;
    align-items:center;
    gap:12px;
    margin-left:auto;
}

.hamburger{
    display:block !important;
    font-size:30px;
    padding:0;
    line-height:1;
}

.search{
    display:block;
}

}

"@


Write-Host "[OK] Mobile hamburger CSS diperbaiki"

}

}
# ===============================
# FORCE HAMBURGER VISIBILITY V2
# ===============================

if(Test-Path "styles.css"){

$css = Get-Content styles.css -Raw


if($css -notmatch "FORCE HAMBURGER VISIBILITY V2"){


Add-Content styles.css @"

/* FORCE HAMBURGER VISIBILITY V2 */

@media(max-width:720px){

.header{
    position:sticky;
    top:0;
    z-index:9999;
}

.header .search-box{
    display:flex !important;
    align-items:center;
    margin-left:auto;
    position:relative;
    z-index:10000;
}

.header .hamburger{
    display:flex !important;
    visibility:visible !important;
    opacity:1 !important;
    width:40px;
    height:40px;
    align-items:center;
    justify-content:center;
    color:#111;
    position:relative;
    z-index:10001;
}

}

"@

Write-Host "[OK] Hamburger visibility V2 injected"

}

}
# ===============================
# FIX ARTICLE HAMBURGER FORCE SHOW
# ===============================

if(Test-Path "styles.css"){

$css = Get-Content styles.css -Raw

if($css -notmatch "ARTICLE HAMBURGER FORCE SHOW"){


Add-Content styles.css @"

/* ARTICLE HAMBURGER FORCE SHOW */

@media(max-width:720px){

.header{
    display:flex !important;
    align-items:center !important;
}

.header nav{
    display:none !important;
}

.header .search-box{
    display:flex !important;
    align-items:center !important;
    margin-left:auto !important;
    width:auto !important;
}

.header .hamburger{
    display:flex !important;
    visibility:visible !important;
    opacity:1 !important;
    position:relative !important;
    z-index:99999 !important;
}

}

"@

Write-Host "[OK] Article hamburger force show"

}

}
Write-Host ""
Write-Host "=== SELESAI ===" -ForegroundColor Green

Write-Host "Backup:"
Write-Host $backup