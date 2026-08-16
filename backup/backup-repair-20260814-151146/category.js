async function loadCategory(){


const cat =
new URLSearchParams(location.search)
.get("cat");


if(!cat)return;



document.getElementById("categoryTitle")
.innerText =
cat.toUpperCase();



const {data,error}=await supabaseClient
.from("articles")
.select("*")
.eq("category",cat)
.order("created_at",{ascending:false});



const box=document.getElementById("categoryList");



if(error){

box.innerHTML="Gagal memuat berita";

return;

}



if(!data || data.length===0){

box.innerHTML="Belum ada berita kategori ini";

return;

}



box.innerHTML=(data||[])
.map(item=>`

<div class="card"
onclick="location.href='article.html?slug=${item.slug}'">


<img src="${item.image || 'assets/images/default-news.png'}">


<h3>
${item.title}
</h3>


<p>
${item.excerpt || ""}
</p>


</div>

`).join("");


}


document.addEventListener(
"DOMContentLoaded",
loadCategory
);
