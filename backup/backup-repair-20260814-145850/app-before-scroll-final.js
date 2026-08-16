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



let hero=data.find(x=>x.featured===true) || data[0];


const heroBox=document.querySelector(".hero");


if(heroBox){


heroBox.innerHTML=`

<img src="${hero.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80'}">


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


}



window.filterCategory = async function(category){

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


loadHomepage();



const search=document.getElementById(
"searchInput"
);



if(search){


search.addEventListener(
"input",
()=>{


let key=
search.value.toLowerCase();



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










// SEARCH TOGGLE

document.addEventListener("DOMContentLoaded",()=>{

const btn=document.querySelector(".search");
const box=document.querySelector(".search-box");

if(btn && box){

btn.addEventListener("click",()=>{

box.classList.toggle("active");

});

}

});

