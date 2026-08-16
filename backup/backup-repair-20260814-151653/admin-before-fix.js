console.log("MEDIA JAKTIM ADMIN CMS SUPABASE");


const $ = id => document.getElementById(id);


let editID = null;



// LOGIN DEMO

const loginBtn = $("loginBtn");


if(loginBtn){

loginBtn.onclick = ()=>{

const pin=$("pin").value;


if(pin==="1234"){

$("login").style.display="none";
$("admin").style.display="block";

loadCMS();


}else{

$("loginError").style.display="block";
$("loginError").innerHTML="PIN salah";

}

};

}



// LOGOUT

if($("logout")){

$("logout").onclick=()=>{

location.reload();

};

}




// LOAD DATA

async function loadCMS(){


const articles = await loadArticles();


const list=$("list");


if(!list) return;


list.innerHTML="";


articles.forEach(article=>{


list.innerHTML += `


<tr>

<td>

<b>${article.title}</b>

<br>

<small>${article.category || ""}</small>

</td>


<td>${article.category || ""}</td>


<td>${article.status}</td>


<td>

<button class="btn edit-btn" data-id="${article.id}">
EDIT
</button>


<button class="btn secondary delete-btn" data-id="${article.id}">
HAPUS
</button>


</td>


</tr>


`;


});



document.querySelectorAll(".delete-btn")
.forEach(btn=>{


btn.onclick=async()=>{


if(confirm("Hapus berita ini?")){


await deleteArticle(btn.dataset.id);

loadCMS();


}


};


});



document.querySelectorAll(".edit-btn")
.forEach(btn=>{


btn.onclick=()=>{


const id=btn.dataset.id;

const item=articles.find(x=>x.id==id);


if(item){

editID=item.id;


$("title").value=item.title;
$("category").value=item.category;
$("excerpt").value=item.excerpt;
$("content").value=item.content;
$("image").value=item.image;
$("author").value=item.author;
$("status").value=item.status;


$("formTitle").innerHTML="Edit Berita";


}


};


});


}




// SIMPAN

const form=$("articleForm");


if(form){


form.addEventListener("submit",async(e)=>{


e.preventDefault();



const article={


title:$("title").value,


slug:$("title")
.value
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-"),


category:$("category").value,


excerpt:$("excerpt").value,


content:$("content").value,


image:$("image").value || "assets/images/default-news.png",


author:$("author").value || "Admin",


status:$("status").value


};



let result;


if(editID){


result=await updateArticle(editID,article);


editID=null;


}else{


result=await saveArticle(article);


}



if(result){


form.reset();

$("formTitle").innerHTML="Tambah Berita";


loadCMS();


}


});


}




if($("reset")){

$("reset").onclick=()=>{

form.reset();

editID=null;

$("formTitle").innerHTML="Tambah Berita";

};


}
