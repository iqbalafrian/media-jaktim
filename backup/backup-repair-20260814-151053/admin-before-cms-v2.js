console.log("MEDIA JAKTIM CMS FINAL UPLOAD");


const $ = id => document.getElementById(id);

let editID = null;



// =====================
// LOGIN
// =====================

function initLogin(){


if(sessionStorage.getItem("media_admin_login")){

$("login").style.display="none";
$("admin").style.display="block";

loadCMS();

}



$("loginBtn").onclick=()=>{


if($("pin").value==="1234"){


sessionStorage.setItem(
"media_admin_login",
"true"
);


$("login").style.display="none";
$("admin").style.display="block";


loadCMS();


}


};



$("pin").addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter"){

$("loginBtn").click();

}

});


}



document.addEventListener(
"DOMContentLoaded",
initLogin
);



// =====================
// LOAD CMS
// =====================

async function loadCMS(){


const articles = await loadArticles();


const list=$("list");


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


<button class="btn edit"
data-id="${a.id}">
EDIT
</button>


<button class="btn secondary delete"
data-id="${a.id}">
HAPUS
</button>


</td>


</tr>

`;

});



// EDIT

document.querySelectorAll(".edit")
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

$("image").value=data.image || "";

$("author").value=data.author || "";

$("status").value=data.status;


$("formTitle").innerHTML=
"Edit Berita";


};


});



// DELETE

document.querySelectorAll(".delete")
.forEach(btn=>{


btn.onclick=async()=>{


await deleteArticle(
btn.dataset.id
);


await loadCMS();


};


});


}



// =====================
// SIMPAN BERITA
// =====================

$("articleForm").onsubmit=async(e)=>{


e.preventDefault();



let oldImage=$("image").value;


let file=null;


if($("imageFile")){

file=$("imageFile").files[0];

}



let newImage=null;



if(file){


newImage=await uploadImage(file);


}




let article={


title:$("title").value,


slug:$("title")
.value
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-"),


category:$("category").value,


excerpt:$("excerpt").value,


content:$("content").value,


image:
newImage ||
oldImage ||
"assets/images/default-news.png",


author:
$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value


};




let result;



if(editID){


result=await updateArticle(
editID,
article
);


}else{


result=await saveArticle(
article
);


}




if(result){


alert("Berita berhasil disimpan");


editID=null;


$("articleForm").reset();


$("image").value="";


$("formTitle").innerHTML=
"Tambah Berita";


await loadCMS();


}


};




// RESET

$("reset").onclick=()=>{


$("articleForm").reset();


editID=null;


$("formTitle").innerHTML=
"Tambah Berita";


};

