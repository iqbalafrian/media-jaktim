console.log("MEDIA JAKTIM ARTICLE READY");


async function loadArticle(){


const params=new URLSearchParams(
window.location.search
);


const id=params.get("id");


if(!id){
return;
}



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

<div class="category">
${data.category || "BERITA"}
</div>


<h1>
${data.title}
</h1>


<div class="article-meta">

${data.author || "Redaksi Media Jaktim"}
<br>

${new Date(data.created_at).toLocaleDateString("id-ID")}

</div>



<img class="cover"
src="${data.image || 'assets/images/default-news.png'}">


<div class="article-content">

${data.content}

</div>

`;



}


document.addEventListener(
"DOMContentLoaded",
loadArticle
);
