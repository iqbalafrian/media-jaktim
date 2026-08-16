console.log("MEDIA JAKTIM PORTAL V2");


async function loadHomepage(){


const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("status","published")
.order("created_at",{ascending:false})
.limit(10);



if(error){

console.error(error);

return;

}



if(!data.length)return;



const hero=data[0];


const heroBox=document.querySelector(".hero");


if(heroBox){

heroBox.innerHTML=`

<img src="${hero.image || 'assets/images/default-news.png'}">


<div class="overlay" onclick="openArticle(${hero.id})" style="cursor:pointer;">


<span>
${hero.category}
</span>


<h1 onclick="openArticle(${hero.id})">

${hero.title}

</h1>


<p>
${hero.excerpt || ""}
</p>


<small>

${hero.author || "Redaksi Media Jaktim"}

<br>

${formatDate(hero.created_at)}

</small>


</div>

`;

}




const side=document.querySelector(".side-news");


if(side){

side.innerHTML="";


data.slice(1,4)
.forEach(item=>{


side.innerHTML+=`

<article onclick="openArticle(${item.id})">


<img src="${item.image || 'assets/images/default-news.png'}">


<div>


<label>
${item.category}
</label>


<h3>
${item.title}
</h3>


<small>

${formatDate(item.created_at)}

</small>


</div>


</article>


`;

});


}




const cards=document.querySelector(".cards");


if(cards){

cards.innerHTML="";


data.slice(4)
.forEach(item=>{


cards.innerHTML+=`

<div class="card"
onclick="openArticle(${item.id})">


<img src="${item.image || 'assets/images/default-news.png'}">


<label>
${item.category}
</label>


<h3>
${item.title}
</h3>


<small>
${item.author || "Redaksi"}
</small>


</div>

`;

});


}


}




function openArticle(id){

location.href=
"article.html?id="+id;

}



function formatDate(date){


if(!date)return "";


return new Date(date)
.toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric"
}
);


}



document.addEventListener(
"DOMContentLoaded",
loadHomepage
);



// GLOBAL ARTICLE CLICK FIX

window.openArticle = function(id){

window.location.href =
"article.html?id=" + id;

};





window.openArticle = function(id){

console.log("OPEN ARTICLE:",id);

window.location.href =
"article.html?id="+id;

};


