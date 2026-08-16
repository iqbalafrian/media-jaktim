$js = Get-Content admin.js -Raw


$patch = @'

// =====================================
// THEME TOGGLE V4.0
// =====================================

function initTheme(){

let btn=document.getElementById("themeToggle");

if(!btn)return;


let saved =
localStorage.getItem("mediaTheme");


if(saved==="light"){

document.body.classList.add("light");

btn.innerHTML="☾";

}else{

btn.innerHTML="☀";

}



btn.onclick=function(){


document.body.classList.toggle("light");


let light =
document.body.classList.contains("light");


localStorage.setItem(
"mediaTheme",
light ? "light":"dark"
);


btn.innerHTML =
light ? "☾":"☀";


};


}



document.addEventListener(
"DOMContentLoaded",
initTheme
);

'@


if($js -notmatch "THEME TOGGLE V4.0"){

Add-Content admin.js $patch

}


Write-Host "THEME JS V4.0 CREATED"