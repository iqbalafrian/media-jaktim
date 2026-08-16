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

alert("Foto digunakan");`n`n}`n`n});



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



















