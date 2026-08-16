console.log("MEDIA JAKTIM CMS V2");


const $ = id => document.getElementById(id);

let editID=null;



// LOGIN

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
e=>{

if(e.key==="Enter")
$("loginBtn").click();

});


}


document.addEventListener(
"DOMContentLoaded",
initLogin
);



// PREVIEW FOTO

if($("imageFile")){


$("imageFile").addEventListener(
"change",
()=>{


const file=$("imageFile").files[0];


if(!file)return;



const url=
URL.createObjectURL(file);



let preview=
document.getElementById(
"imagePreview"
);



if(!preview){

preview=document.createElement("img");

preview.id="imagePreview";

preview.style.width="200px";

preview.style.marginTop="10px";


$("uploadInfo").appendChild(preview);

}



preview.src=url;


});


}



// LOAD

async function loadCMS(){


const articles=await loadArticles();


$("list").innerHTML="";


articles.forEach(a=>{


$("list").innerHTML+=`

<tr>

<td>

<img src="${a.image}"
width="80">

<br>

<b>${a.title}</b>

<br>

<small>
${a.author || "Redaksi"}
</small>

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



document.querySelectorAll(".edit")
.forEach(btn=>{


btn.onclick=()=>{


let a=articles.find(
x=>x.id==btn.dataset.id
);



editID=a.id;


$("title").value=a.title;
$("category").value=a.category;
$("excerpt").value=a.excerpt;
$("content").value=a.content;
$("image").value=a.image || "";
$("author").value=a.author || "";
$("status").value=a.status;


$("formTitle").innerHTML=
"Edit Berita";


};


});




document.querySelectorAll(".delete")
.forEach(btn=>{


btn.onclick=async()=>{


if(confirm("Hapus berita?")){

await deleteArticle(btn.dataset.id);

await loadCMS();

}

};


});


}




// SIMPAN

$("articleForm").onsubmit=async e=>{


e.preventDefault();



let image=$("image").value;


let file=
$("imageFile")?.files[0];



if(file){


let upload=
await uploadImage(file);


if(upload)
image=upload;


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


image:image,


author:$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value


};




let result;



if(editID){


result=
await updateArticle(
editID,
article
);


}else{


result=
await saveArticle(
article
);


}



if(result){


alert("Berita berhasil disimpan");


editID=null;


$("articleForm").reset();


$("uploadInfo").innerHTML="";


$("formTitle").innerHTML=
"Tambah Berita";


await loadCMS();


}


};




// RESET

$("reset").onclick=()=>{


$("articleForm").reset();

editID=null;

$("uploadInfo").innerHTML="";

$("formTitle").innerHTML=
"Tambah Berita";

};




