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


if(!data.length){const heroBox=document.querySelector(".hero");if(heroBox){heroBox.innerHTML=`"<div class=\"overlay\"><label>KATEGORI</label><h1>Belum ada berita</h1><p>Belum tersedia artikel untuk kategori ini.</p></div>`";}const cards=document.querySelector(".cards");if(cards){cards.innerHTML="";}return;}



let hero=data[0];


const heroBox=document.querySelector(".hero");


if(heroBox){


heroBox.innerHTML=`

<img src="${hero.image || 'assets/images/default-news.png'}">


<div class="overlay"
onclick="openArticle(${hero.id})">


<label>
${hero.category}
</label>


<h1>
${hero.title}
</h1>


<p>
${hero.excerpt || ""}
</p>


<small>
${hero.author || "Redaksi"}
</small>


</div>

`;

}




const cards=document.querySelector(".cards");


if(cards){

cards.innerHTML="";


data.slice(1).forEach(item=>{


cards.innerHTML+=`

<div class="card"
onclick="openArticle(${item.id})">


<img src="${item.image || 'assets/images/default-news.png'}">


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


}



function setActiveMenu(category){

document.querySelectorAll("nav a").forEach(item=>{

item.classList.remove("active");

if(item.innerText.trim().toLowerCase() === category.toLowerCase()){

item.classList.add("active");

}

});

}


window.filterCategory = async function(category){

setActiveMenu(category);


console.log("LOAD CATEGORY:", category);


// ambil data terbaru dari Supabase
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



if(category==="ALL"){

renderArticles(allArticles);

return;

}



const filtered =
allArticles.filter(item =>

(item.category || "")
.toLowerCase()
.trim()
===
category
.toLowerCase()
.trim()

);



renderArticles(filtered);



};



document.addEventListener(
"DOMContentLoaded",
()=>{


loadHomepage();



const search=document.getElementById(
"searchInput"
);



if(search){


search.addEventListener(
"input",
()=>{


let key=
search.value.toLowerCase().trim();



renderArticles(

allArticles.filter(x=>

x.title.toLowerCase()
.includes(key)

)

);


});

}


});




window.openArticle=function(id){

location.href=
"article.html?id="+id;

};







