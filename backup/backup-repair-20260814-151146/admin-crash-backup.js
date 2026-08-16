console.log("MEDIA JAKTIM ADMIN FIX");


const $ = id => document.getElementById(id);


document.addEventListener("DOMContentLoaded",()=>{

const pin=document.getElementById("pin");
const btn=document.getElementById("loginBtn");

if(pin && btn){

pin.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

btn.click();

}

});

}

});


let editID=null;



// =================
// LOGIN SESSION
// =================


function checkLogin(){


if(sessionStorage.getItem("media_admin_login")){

$("login").style.display="none";

$("admin").style.display="block";

loadCMS();

}


}


checkLogin();



if($("loginBtn")){


$("loginBtn").onclick=()=>{
$("pin").addEventListener("keypress",function(e){

if(e.key==="Enter"){

$("loginBtn").click();

}

});

let pin=$("pin").value;


if(pin==="1234"){


sessionStorage.setItem(
"media_admin_login",
"true"
);


$("login").style.display="none";

$("admin").style.display="block";


loadCMS();


}else{


$("loginError").style.display="block";

}


};


}




if($("logout")){


$("logout").onclick=()=>{


sessionStorage.removeItem(
"media_admin_login"
);


location.reload();


};


}





// =================
// LOAD CMS
// =================


async function loadCMS(){


let articles=await loadArticles();


let list=$("list");


if(!list)return;


list.innerHTML="";


articles.forEach(a=>{


list.innerHTML+=`

<tr>

<td>

<b>${a.title}</b>

<br>

<small>${a.author || "Admin"}</small>

</td>


<td>${a.category}</td>


<td>${a.status}</td>


<td>

<button class="btn edit-btn"
data-id="${a.id}">
EDIT
</button>


<button class="btn secondary delete-btn"
data-id="${a.id}">
HAPUS
</button>


</td>


</tr>


`;


});



document.querySelectorAll(".delete-btn")
.forEach(btn=>{


btn.onclick=async()=>{


await deleteArticle(btn.dataset.id);

await loadCMS();


};


});




document.querySelectorAll(".edit-btn")
.forEach(btn=>{


btn.onclick=()=>{


let data=articles.find(
x=>x.id==btn.dataset.id
);


editID=data.id;


$("title").value=data.title;

$("category").value=data.category;

$("excerpt").value=data.excerpt;

$("content").value=data.content;

$("image").value=data.image;

$("author").value=data.author;

$("status").value=data.status;


$("formTitle").innerHTML="Edit Berita";


};


});


}





// =================
// SAVE
// =================


$("articleForm").onsubmit=async(e)=>{


e.preventDefault();



let uploadedImage = await uploadImage();

let article={


title:$("title").value,


slug:$("title")
.value
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-"),


category:$("category").value,


excerpt:$("excerpt").value,


content:$("content").value,


image:$("image").value ||
"assets/images/default-news.png",


author:$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value


};




let ok;



if(editID){


ok=await updateArticle(
editID,
article
);


editID=null;


}else{


ok=await saveArticle(article);


}



if(ok){


await loadCMS();


$("articleForm").reset();


$("formTitle").innerHTML="Tambah Berita";


}


};




$("reset").onclick=()=>{


$("articleForm").reset();


editID=null;


$("formTitle").innerHTML="Tambah Berita";


};






// =====================
// SUPABASE IMAGE UPLOAD
// =====================


async function uploadImage(){


const fileInput=document.getElementById("imageFile");


if(!fileInput || !fileInput.files[0]){

return null;

}



const file=fileInput.files[0];


const filename=
Date.now()+"-"+file.name;



const {error}=await supabaseClient
.storage
.from("media-jaktim")
.upload(filename,file);



if(error){

console.error(error);

alert("Upload gagal");

return null;

}



const {data}=supabaseClient
.storage
.from("media-jaktim")
.getPublicUrl(filename);



return data.publicUrl;


}




