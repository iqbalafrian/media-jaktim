console.log("MEDIA JAKTIM ARTICLE V2");


async function loadArticle(){


const slug=
new URLSearchParams(
location.search
).get("slug");

console.log("ARTICLE SLUG:", slug);


if(!slug)return;



const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("slug",slug)
.single();



if(error){ console.error("ARTICLE ERROR:", error); alert(JSON.stringify(error));

console.error(error);

return;

}



const box=
document.querySelector("#article-detail");



box.innerHTML=`

<div class="article-layout">


<div class="article-main">


<div class="article-category">
${data.category}
</div>


<h1 class="article-title">
${data.title}
</h1>


<p class="article-excerpt">
${data.excerpt || ""}
</p>


<div class="article-meta">

Oleh:
<b>${data.author || "Redaksi Media Jaktim"}</b>

<br>

${new Date(data.created_at)
.toLocaleDateString("id-ID")}

</div>


<img class="article-cover"
src="${data.image || 'assets/images/default-news.png'}">


<div class="article-body">

${data.content}

</div>


</div>



<aside class="article-sidebar">


<h3>
BERITA TERPOPULER
</h3>


<div class="article-side-item">

<img src="assets/images/default-news.png">

<b>
Berita terbaru Media Jaktim
</b>

</div>


<div class="article-side-item">

<img src="assets/images/default-news.png">

<b>
Informasi terkini Jakarta Timur
</b>

</div>


</aside>


</div>

`;


}




async function loadRelated(category,currentSlug){


const {data,error}=await supabaseClient
.from("articles")
.select("title,slug,image,category")
.eq("category",category)
.neq("slug",currentSlug)
.limit(5);



const side=document.querySelector(".article-sidebar");


if(!side || error)return;


side.innerHTML=`

<h3>
BERITA TERKAIT ${category.toUpperCase()}
</h3>

${
(data||[]).map(item=>`

<div class="article-side-item"
onclick="location.href='article.html?slug=${item.slug}'">

<img src="${item.image || 'assets/images/default-news.png'}">

<b>
${item.title}
</b>

</div>

`).join("")
}

`;

}


document.addEventListener(
"DOMContentLoaded",
loadArticle
);







document.addEventListener("DOMContentLoaded",()=>{

const btn=document.getElementById("menuToggle");
const drawer=document.getElementById("drawerMenu");
const overlay=document.getElementById("drawerOverlay");


if(btn && drawer && overlay){

btn.onclick=()=>{

drawer.classList.toggle("active");
overlay.classList.toggle("active");

};


overlay.onclick=()=>{

drawer.classList.remove("active");
overlay.classList.remove("active");

};

}

});




