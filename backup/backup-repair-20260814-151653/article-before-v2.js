console.log("MEDIA JAKTIM ARTICLE PRO");


async function loadArticle(){


const params=new URLSearchParams(
window.location.search
);


const id=params.get("id");


if(!id)return;



const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("id",id)
.single();



if(error){

console.error(error);

return;

}



const box=document.querySelector(".article-page");


if(!box)return;



box.innerHTML=`

<div class="article-category">
${data.category || "BERITA"}
</div>


<h1 class="article-title">
${data.title}
</h1>


<div class="article-info">

Oleh:
<b>${data.author || "Redaksi Media Jaktim"}</b>

<br>

${new Date(data.created_at)
.toLocaleDateString("id-ID")}

</div>



<img class="article-cover"
src="${data.image || 'assets/images/default-news.png'}">



<div class="article-body">

${data.content || ""}

</div>



<div class="related">

<h2>
Berita Terkait
</h2>


<div class="related-list"
id="relatedList">

</div>


</div>


`;



loadRelated(id,data.category);


}




async function loadRelated(id,category){


const {data}=await supabaseClient
.from("articles")
.select("*")
.eq("status","published")
.eq("category",category)
.neq("id",id)
.limit(3);



const box=document.getElementById(
"relatedList"
);



if(!box || !data)return;



box.innerHTML="";



data.forEach(item=>{


box.innerHTML+=`

<div class="related-card"
onclick="location.href='article.html?id=${item.id}'">


<img src="${item.image || 'assets/images/default-news.png'}">


<h3>
${item.title}
</h3>


</div>

`;

});


}



document.addEventListener(
"DOMContentLoaded",
loadArticle
);
