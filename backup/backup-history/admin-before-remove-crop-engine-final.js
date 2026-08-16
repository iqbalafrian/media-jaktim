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

croppedFile=file;

const preview=document.getElementById("imagePreview");

if(preview){

preview.src=URL.createObjectURL(file);
preview.style.display="block";

}

});

}



document.addEventListener("click",e=>{

if(e.target.id==="cropApply" && cropper){

cropper.getCroppedCanvas({
width:1200,
height:675,
imageSmoothingEnabled:true,
imageSmoothingQuality:"high"
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


cropper.destroy();
cropper=null;


let cropBox=document.getElementById("cropBox");

if(cropBox){
cropBox.style.display="none";
}


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













