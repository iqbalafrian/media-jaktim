console.log("MEDIA JAKTIM LIVE NEWS");


async function loadLatestNews(){

const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("status","published")
.order("created_at",{ascending:false});


if(error){
console.error(error);
return;
}


const container=document.getElementById("latest-news");


if(!container){
console.log("container belum ada");
return;
}


container.innerHTML="";


data.forEach(article=>{


container.innerHTML += `

<div class="card">

<img src="${article.image || 'assets/images/default-news.png'}">

<label>${article.category || "Berita"}</label>

<h3>${article.title}</h3>

<small>
${article.author || "Redaksi Media Jaktim"}
</small>

</div>

`;


});


}


document.addEventListener(
"DOMContentLoaded",
loadLatestNews
);





