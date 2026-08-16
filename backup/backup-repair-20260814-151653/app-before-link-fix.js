console.log("MEDIA JAKTIM DYNAMIC HOMEPAGE");


async function loadHomepage(){


const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("status","published")
.order("created_at",{ascending:false})
.limit(8);


if(error){
console.error(error);
return;
}


if(!data || data.length===0){
return;
}


// HERO

const hero=data[0];

const heroBox=document.querySelector(".hero");


if(heroBox){

heroBox.innerHTML=`

<img src="${hero.image || 'assets/images/default-news.png'}">

<div class="overlay">

<label>${hero.category || "BERITA"}</label>

<h1 onclick="location.href=`"article.html?id=${hero.id}``">${hero.title}</h1>

<p>${hero.excerpt || ""}</p>

<small>${hero.author || "Redaksi Media Jaktim"}</small>

</div>

`;

}


// SIDE NEWS

const side=document.querySelector(".side-news");


if(side){

side.innerHTML="";


data.slice(1,4).forEach(item=>{


side.innerHTML +=`

<article>

<img src="${item.image || 'assets/images/default-news.png'}">

<div>

<label>${item.category || "BERITA"}</label>

<h3>${item.title}</h3>

<small>${item.author || "Redaksi"}</small>

</div>

</article>

`;

});


}


// CARDS

const cards=document.querySelector(".cards");


if(cards){

cards.innerHTML="";


data.slice(0,5).forEach(item=>{


cards.innerHTML +=`

<div class="card">

<img src="${item.image || 'assets/images/default-news.png'}">

<label>${item.category || "BERITA"}</label>

<h3>${item.title}</h3>

<small>${item.author || "Redaksi Media Jaktim"}</small>

</div>

`;

});


}


}



document.addEventListener(
"DOMContentLoaded",
loadHomepage
);

