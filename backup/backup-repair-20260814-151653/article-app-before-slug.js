console.log("MEDIA JAKTIM ARTICLE V2");


async function loadArticle(){


const id=
new URLSearchParams(
location.search
).get("id");

console.log("ARTICLE ID:", id);


if(!id)return;



const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("id",id)
.single();



if(error){ console.error("ARTICLE ERROR:", error); alert(JSON.stringify(error));

console.error(error);

return;

}



const box=
document.querySelector("#article-detail");



box.innerHTML=`

<div class="article-category">

${data.category}

</div>


<h1 class="article-title">

${data.title}

</h1>


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


`;


}



document.addEventListener(
"DOMContentLoaded",
loadArticle
);




