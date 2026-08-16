console.log("MEDIA JAKTIM HOMEPAGE CLICK READY");


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


if(!data || data.length===0)return;



// HERO

const hero=data[0];

const heroBox=document.querySelector(".hero");


if(heroBox){

heroBox.innerHTML=`

<img src="${hero.image || 'assets/images/default-news.png'}">

<div class="overlay">

<label>${hero.category || "BERITA"}</label>

<h1 class="article-link"
onclick="openArticle(${hero.id})">
${hero.title}
</h1>

<p>${hero.excerpt || ""}</p>

<small>
${hero.author || "Redaksi Media Jaktim"}
</small>

</div>

`;

}




// SIDE NEWS

const side=document.querySelector(".side-news");


if(side){

side.innerHTML="";


data.slice(1,4).forEach(item=>{


side.innerHTML+=`

<article onclick="openArticle(${item.id})">


<img src="${item.image || 'assets/images/default-news.png'}">


<div>

<label>${item.category || "BERITA"}</label>

<h3>
${item.title}
</h3>


<small>
${item.author || "Redaksi"}
</small>


</div>


</article>

`;


});


}





// CARD BERITA

const cards=document.querySelector(".cards");


if(cards){

cards.innerHTML="";


data.slice(0,5).forEach(item=>{


cards.innerHTML+=`

<div class="card"
onclick="openArticle(${item.id})">


<img src="${item.image || 'assets/images/default-news.png'}">


<label>
${item.category || "BERITA"}
</label>


<h3>
${item.title}
</h3>


<small>
${item.author || "Redaksi Media Jaktim"}
</small>


</div>


`;

});


}


}




function openArticle(id){

window.location.href=
"article.html?id="+id;

}




document.addEventListener(
"DOMContentLoaded",
loadHomepage
);
