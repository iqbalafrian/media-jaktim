async function loadFoto(){

const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("category","Foto")
.order("created_at",{ascending:false});


const box=document.getElementById("photoList");


if(!box)return;


if(error){

box.innerHTML="Gagal memuat foto";

return;

}


if(!data || data.length===0){

box.innerHTML="Belum ada galeri foto";

return;

}



box.innerHTML=data.map(item=>`

<div class="card"
onclick="location.href='article.html?slug=${item.slug}'">


<img src="${item.image || 'assets/images/default-news.png'}">


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
loadFoto
);
