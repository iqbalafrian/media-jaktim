console.log("MEDIA JAKTIM CATEGORY ENGINE");


let allArticles=[];


async function loadHomepage(){


const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("status","published")
.order("created_at",{ascending:false});


if(error){

console.error(error);
return;

}


allArticles=data;


renderArticles(allArticles);


}



function renderArticles(data){


if(!data.length){alert("Belum ada berita untuk kategori ini");return;}



console.log('DATA SUPABASE:', data[0]);

let hero =
data.find(x=>x.featured)
||
data[0];


const heroBox=document.querySelector(".hero");


if(heroBox){




heroBox.innerHTML=`

<img src="${hero.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80'}">


<div class="overlay"
onclick="openArticle('${hero.slug}')">


<div class="hero-meta hero-mobile-safe">

<label>
${hero.category}
</label>

<small>
${hero.author || "Redaksi Media Jaktim"}
</small>

</div>


<h1>
${hero.title.substring(0,90)}${hero.title.length>90?"...":""}
</h1>


</div>

`;

}





const side=document.querySelector(".side-news");

if(side){

side.innerHTML="";

data.slice(1,4).forEach(item=>{

side.innerHTML+=`

<article onclick="openArticle('${item.slug}')">

<img src="${item.image || ''}?v=${Date.now()}">

<div>

<label>
${item.category}
</label>

<h3>
${item.title}
</h3>

<small>
${item.author || "13 Agustus 2026"}
</small>

</div>

</article>

`;

});

}


const cards=document.querySelector(".cards");


if(cards){

cards.innerHTML=""; console.log("RENDER START",data);


data.slice(1).forEach(item=>{


cards.innerHTML+=`

<div class="card"
onclick="openArticle('${item.slug}')">


<img src="${item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80'}">


<h3>
${item.title}
</h3>


<label>
${item.category}
</label>


</div>


`;


});


}





window.filterCategory = async function(category){

console.log("LEGACY FILTER:",category);

window.scrollTo(0,0);

console.log("LOAD CATEGORY:", category);


// aktifkan menu orange
document.querySelectorAll("nav a").forEach(a=>{

    a.classList.remove("active");

    if(
        a.innerText.trim().toLowerCase() === category.trim().toLowerCase()
    ){
        a.classList.add("active");
    }

});


// ambil artikel sesuai kategori
const filtered = allArticles.filter(article =>

    article.category &&
    article.category.trim().toLowerCase() === category.trim().toLowerCase()

);


// render hasil
renderArticles(filtered);


};



document.addEventListener(
"DOMContentLoaded",
()=>{


console.log('CALL LOAD HOMEPAGE'); loadHomepage();



const search=document.getElementById(
"searchInput"
);



if(search){


search.addEventListener(
"input",
()=>{

let key = search.value.toLowerCase();

if(document.querySelector(".search-page")){

renderArticles(

allArticles.filter(x=>

x.title.toLowerCase()
.includes(key)

)

);

}

});

}


});




window.openArticle=function(item){

location.href="article.html?slug="+item;

};






























document.addEventListener("DOMContentLoaded",()=>{

const btn=document.getElementById("menuToggle");
const drawer=document.getElementById("drawerMenu");


if(btn && drawer){

btn.onclick=(e)=>{

e.stopPropagation();

drawer.classList.toggle("active");

};


document.addEventListener("click",()=>{

drawer.classList.remove("active");

});


drawer.onclick=e=>{

e.stopPropagation();

};

}

});


document.addEventListener("DOMContentLoaded",()=>{

const btn=document.getElementById("menuToggle");
const drawer=document.getElementById("drawerMenu");
const overlay=document.getElementById("drawerOverlay");


if(btn && drawer && overlay){


btn.onclick=(e)=>{

e.stopPropagation();

drawer.classList.toggle("active");

overlay.classList.toggle("active");

};



overlay.onclick=()=>{

drawer.classList.remove("active");

overlay.classList.remove("active");

};



}


});









// =========================
// MOBILE SEARCH TOGGLE
// =========================

document.addEventListener("click",e=>{

if(e.target.classList.contains("mobile-search-btn")){



}

});


// =========================
// SEARCH ICON TOGGLE
// =========================

document.addEventListener("click",e=>{

if(e.target.closest(".search")){



}

});


// SEARCH OPEN MOBILE

document.addEventListener("click",e=>{

if(e.target.closest(".search")){



}

});


// FINAL SEARCH TOGGLE

document.addEventListener("click",e=>{

if(e.target.closest("button.search")){



}

});


// SEARCH OPEN FINAL

document.addEventListener("click",e=>{

if(e.target.closest(".header-actions .search")){



}

});



// =========================
// FINAL SEARCH TOGGLE ONLY
// =========================

document.addEventListener("click",e=>{

const btn=e.target.closest(".header-actions .search");

if(btn){

document.body.classList.toggle("search-open");

}

});



// =========================
// MOVE SEARCH BOX MOBILE FIX
// =========================

function fixMobileSearch(){

const box = document.querySelector(".search-box");
const actions = document.querySelector(".header-actions");

if(
window.innerWidth <= 768 &&
box &&
actions &&
!actions.contains(box)
){

actions.insertBefore(box, actions.firstChild);

}

}


fixMobileSearch();

window.addEventListener(
"resize",
fixMobileSearch
);









}

