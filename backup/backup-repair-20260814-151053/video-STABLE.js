async function loadVideo(){

const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("category","Video")
.order("created_at",{ascending:false});


const box=document.getElementById("videoList");


if(!box)return;


if(error){

box.innerHTML="Gagal memuat video";

return;

}


if(!data || data.length===0){

box.innerHTML="Belum ada video";

return;

}



box.innerHTML=data.map(item=>`

<div class="card"
onclick="location.href='article.html?slug=${item.slug}'">


<div class="vimg">

${item.video_url 
? `<video controls>
<source src="${item.video_url}" type="video/mp4">
</video>`
: `<img src="${item.image || 'assets/images/default-news.png'}">`
}


</div>


<h3>
${item.title}
</h3>


<small>
${new Date(item.created_at).toLocaleDateString("id-ID")}
</small>


</div>


`).join("");

}


document.addEventListener(
"DOMContentLoaded",
loadVideo
);


