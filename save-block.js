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








