console.log("MEDIA JAKTIM CMS V2");


const $ = id => document.getElementById(id);

let editID=null;
let activeCategory="ALL";



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



async function loadCMS(){



let articles=await loadArticles();


if(activeCategory && activeCategory!=="ALL"){

articles=articles.filter(a=>
a.category &&
a.category.toLowerCase()===activeCategory.toLowerCase()
);

}



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
id.value=a.id;


$("title").value=a.title;
$("category").value=a.category;
$("excerpt").value=a.excerpt;
$("content").value=a.content;
$("image").value=a.image || "";
$("featured").checked=a.featured || false;
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






// IMAGE CROP
let cropper=null;
let croppedFile=null;


// PREVIEW FOTO

if($("imageFile")){

$("imageFile").addEventListener(
"change",
()=>{

const file=$("imageFile").files[0];

if(!file)return;

const url=URL.createObjectURL(file);

let cropTarget=document.getElementById("cropTarget");
let cropBox=document.getElementById("cropBox");

if(cropTarget && cropBox){

cropTarget.src=url;

cropBox.style.display="block";


if(cropper){
cropper.destroy();
}


cropper=new Cropper(cropTarget,{
aspectRatio:16/9,
viewMode:1,
autoCropArea:1,
dragMode:"move",
cropBoxMovable:false,
cropBoxResizable:false,
background:false,
responsive:true
});

}

});

}



document.addEventListener("click",e=>{

if(e.target.id==="cropApply" && cropper){

cropper.getCroppedCanvas({
width:1200,
height:675
})
.toBlob(blob=>{

croppedFile=new File(
[blob],
"media-jaktim-"+Date.now()+".jpg",
{
type:"image/jpeg"
}
);


const preview=document.getElementById("imagePreview");

if(preview){

preview.src=URL.createObjectURL(blob);
preview.style.display="block";

}


cropper.destroy();
cropper=null;


const cropBox=document.getElementById("cropBox");

if(cropBox){
cropBox.style.display="none";
}


alert("Foto siap digunakan");

});

if(cropper){
cropper.destroy();
cropper=null;
}

let cropBox=document.getElementById("cropBox");

if(cropBox){
cropBox.style.display="none";
}

alert("Foto digunakan");

}

});



document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadArticles();

}

});





document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadCMS();

}

});



























// SIMPAN

$("articleForm").onsubmit=async e=>{


e.preventDefault();



let image=$("image").value;

let video_url="";

let category=$("category").value;


let file=
croppedFile ||
$("imageFile")?.files[0];


let videoFile=
$("videoFile")?.files[0];



if(category==="Video"){


if(videoFile){

let upload=
await uploadVideo(videoFile);


if(upload)
video_url=upload;


}


}else{


if(file){

let upload=
await uploadImage(file);


if(upload)
image=upload;


}


if(category!=="Video" && (!image || image.trim()==="")){
    alert("Wajib upload gambar berita terlebih dahulu");
    return;
}


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

video_url:video_url,


author:$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value,

featured:$("featured")?.checked || false


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
$("featured").checked=false;


$("uploadInfo").innerHTML="";


$("formTitle").innerHTML=
"Tambah Berita";


await loadCMS();


}


};




// RESET

$("reset").onclick=()=>{


$("articleForm").reset();
$("featured").checked=false;

editID=null;

$("uploadInfo").innerHTML="";

$("formTitle").innerHTML=
"Tambah Berita";

};













document.addEventListener("click",e=>{

if(e.target.id==="cropApply" && cropper){

cropper.getCroppedCanvas({
width:1200,
height:675
})
.toBlob(blob=>{


croppedFile=
new File(
[blob],
"media-jaktim-"+Date.now()+".jpg",
{
type:"image/jpeg"
}
);


alert("Foto siap digunakan");


});


}

});



document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadArticles();

}

});





document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadCMS();

}

});











// SIMPAN

$("articleForm").onsubmit=async e=>{


e.preventDefault();



let image=$("image").value;

let video_url="";

let category=$("category").value;


let file=
croppedFile ||
$("imageFile")?.files[0];


let videoFile=
$("videoFile")?.files[0];



if(category==="Video"){


if(videoFile){

let upload=
await uploadVideo(videoFile);


if(upload)
video_url=upload;


}


}else{


if(file){

let upload=
await uploadImage(file);


if(upload)
image=upload;


}


if(category!=="Video" && (!image || image.trim()==="")){
    alert("Wajib upload gambar berita terlebih dahulu");
    return;
}


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

video_url:video_url,


author:$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value,

featured:$("featured")?.checked || false


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
$("featured").checked=false;


$("uploadInfo").innerHTML="";


$("formTitle").innerHTML=
"Tambah Berita";


await loadCMS();


}


};




// RESET

$("reset").onclick=()=>{


$("articleForm").reset();
$("featured").checked=false;

editID=null;

$("uploadInfo").innerHTML="";

$("formTitle").innerHTML=
"Tambah Berita";

};













document.addEventListener("click",e=>{

if(e.target.id==="cropApply" && cropper){

cropper.getCroppedCanvas({
width:1200,
height:675
})
.toBlob(blob=>{


croppedFile=
new File(
[blob],
"media-jaktim-"+Date.now()+".jpg",
{
type:"image/jpeg"
}
);


alert("Foto siap digunakan");


});


}

});



document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadArticles();

}

});





document.addEventListener("click",e=>{

if(e.target.dataset.cat){

activeCategory=e.target.dataset.cat;

loadCMS();

}

});









