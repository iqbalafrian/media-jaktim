if(sessionStorage.getItem("cmsTop")){
    sessionStorage.removeItem("cmsTop");

    window.scrollTo({
        top:0,
        left:0,
        behavior:"instant"
    });
}
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



const url=
URL.createObjectURL(file);


let cropTarget=document.getElementById("cropTarget");
let cropBox=document.getElementById("cropBox");


if(cropTarget && cropBox){

cropTarget.src=url;

cropBox.style.display="block";


if(cropper){
cropper.destroy();
}


cropper=new Cropper(cropTarget,{
aspectRatio:1200/800,
viewMode:1,
toggleDragModeOnDblclick:false,

dragMode:"move",

autoCropArea:1,

movable:true,

zoomable:false,
wheelZoomRatio:0,
zoomOnWheel:false,
zoomOnTouch:false,

cropBoxMovable:false,
cropBoxResizable:false,

background:false,
responsive:false,

guides:false,
center:true
});

cropTarget.parentElement.addEventListener("wheel", function(e){
    e.preventDefault();
    e.stopPropagation();
}, {passive:false});




}




let preview=
document.getElementById(
"imagePreview"
);



if(!preview){

preview=document.createElement("img");

preview.id="imagePreview";

preview.style.width="200px";

preview.style.marginTop="10px";


if($("uploadInfo")){$("uploadInfo").appendChild(preview);}

}



preview.src=url;


});


}



// LOAD

let activeCategory="ALL";

let currentPage=1;

let newsPerPage=10;

let searchQuery="";


async function loadCMS(){



let articles=await loadArticles();


// SEARCH FILTER

if(searchQuery){

articles=articles.filter(a=>

(a.title||"").toLowerCase().includes(searchQuery)

||

(a.category||"").toLowerCase().includes(searchQuery)

||

(a.author||"").toLowerCase().includes(searchQuery)

);

}


// CATEGORY FILTER

if(activeCategory && activeCategory!=="ALL"){

articles=articles.filter(a=>
a.category &&
a.category.toLowerCase()===activeCategory.toLowerCase()
);

}


let totalArticles = articles.length;

updateStats(articles);


// PAGINATION

articles=articles.slice(
(currentPage-1)*newsPerPage,
currentPage*newsPerPage
);




renderPagination(totalArticles);

$("list").innerHTML="";


articles.forEach(a=>{


$("list").innerHTML+=`

<div class="news-item">

<div class="news-top">

<span>${a.category}</span>

<div class="news-status-box">

<span class="status-${a.status}">${a.status}</span>

<small>
${formatUploadTime(a)}
</small>

</div>

</div>


<div class="news-row">

<img class="news-img" src="${a.image}">


<div class="news-text">

<b>${a.title}</b>

</div>


<div class="news-meta">

<small>
${a.author || "Redaksi Media Jaktim"}
</small>

</div>


<div class="news-action">

<button class="btn edit"
data-id="${a.id}">
EDIT
</button>


<button class="btn secondary delete"
data-id="${a.id}">
HAPUS
</button>

</div>


</div>

</div>

`;

});



document.querySelectorAll(".edit")
.forEach(btn=>{


btn.onclick=()=>{


let a=articles.find(
x=>x.id==btn.dataset.id
);


setTimeout(()=>{

document.getElementById("articleForm")
.scrollIntoView({
behavior:"smooth",
block:"start"
});

},100);



editID=a.id;
id.value=a.id;


document.getElementById("articleForm")
.scrollIntoView({
    behavior:"smooth",
    block:"start"
});


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



sessionStorage.setItem("cmsTop","yes");

setTimeout(()=>{
    window.location.href = window.location.href;
},500);

}

};


});


}




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
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"")
+"-"+Date.now(),


category:$("category").value,


excerpt:$("excerpt").value,


content:$("content").value,


image:image,

video_url:video_url,


author:$("author").value ||
"Redaksi Media Jaktim",


status:$("status").value,

featured:$("featured")?.checked || false,

upload_time: new Date().toISOString()


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

if(article.featured){

await setHeroOnly(
editID || result.id
);

}






editID=null;


HTMLFormElement.prototype.reset.call(document.getElementById("articleForm"));
$("featured").checked=false;


if($("uploadInfo")){$("uploadInfo").innerHTML="";}


$("formTitle").innerHTML=
"Tambah Berita";




sessionStorage.setItem("cmsTop","yes");

setTimeout(()=>{
    window.location.href = window.location.href;
},500);

}

};




// RESET

$("reset").onclick=()=>{


HTMLFormElement.prototype.reset.call(document.getElementById("articleForm"));
$("featured").checked=false;

editID=null;

if($("uploadInfo")){$("uploadInfo").innerHTML="";}

$("formTitle").innerHTML=
"Tambah Berita";

};













document.addEventListener("click",e=>{

if(e.target.id==="cropApply" && cropper){

cropper.getCroppedCanvas({
width:1200,
height:800
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


if(cropper){
    cropper.destroy();
    cropper=null;
}

let cropBox=document.getElementById("cropBox");

if(cropBox){
    cropBox.style.display="none";
}

let cropTarget=document.getElementById("cropTarget");

if(cropTarget){
    cropTarget.src="";
}

},"image/jpeg",0.82);


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











































// =======================
// REALTIME CLOCK
// =======================

function updateClock(){

let now = new Date();

let jam = now.toLocaleTimeString("id-ID",{
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
});


let clock=document.getElementById("clock");

if(clock){
clock.innerHTML=jam+" WIB";
}

}


setInterval(updateClock,1000);
updateClock();


setInterval(()=>{
let c=document.getElementById("clock");

if(c){
let d=new Date();
c.innerHTML=d.toLocaleTimeString("id-ID")+" WIB";
}

},1000);


// =======================
// DATE + REALTIME CLOCK
// =======================

function updateDateClock(){

let now = new Date();


let hari = now.toLocaleDateString("id-ID",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});


let jam = now.toLocaleTimeString("id-ID",{
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
});


let clock=document.getElementById("clock");


if(clock){
    clock.innerHTML =
    hari + " | " + jam + " WIB";
}

}


setInterval(updateDateClock,1000);

updateDateClock();




// =======================
// FORMAT UPLOAD TIME
// =======================

function formatUploadTime(article){

let time =
article.upload_time ||
article.created_at ||
article.date;


if(!time){
return "-";
}


let d=new Date(time);


let hari=d.toLocaleDateString("id-ID",{
weekday:"long"
});


let tanggal =
d.getDate()+"/"+
(d.getMonth()+1)+"/"+
d.getFullYear();


let jam=d.toLocaleTimeString("id-ID",{
hour:"2-digit",
minute:"2-digit"
});


return hari+", "+tanggal+
"<br>"+
jam+" WIB";

}









// =======================
// PAGINATION BUTTON
// =======================

function renderPagination(total){

let box=document.getElementById("pagination");

if(!box) return;


let totalPage=Math.ceil(total/newsPerPage);


if(totalPage<=1){

box.innerHTML="";

return;

}


box.innerHTML=`


<button class="btn page-btn"
data-page="${currentPage-1}"
${currentPage===1 ? "disabled":""}>
? Sebelumnya
</button>


${Array.from({length:totalPage},(_,i)=>`

<button class="btn page-btn ${currentPage===i+1?"active":""}"
data-page="${i+1}">
${i+1}
</button>

`).join("")}


<button class="btn page-btn"
data-page="${currentPage+1}"
${currentPage===totalPage ? "disabled":""}>
Berikutnya ?
</button>


`;


document.querySelectorAll(".page-btn")
.forEach(btn=>{


btn.onclick=()=>{


let page=parseInt(btn.dataset.page);


if(page>=1 && page<=totalPage){

currentPage=page;

loadCMS();

}


};


});


}








// =======================
// ADMIN STATISTIC
// =======================

function updateStats(data){

let total=document.getElementById("totalNews");
let pub=document.getElementById("publishNews");
let draft=document.getElementById("draftNews");


if(total){

total.innerHTML=data.length;

pub.innerHTML=
data.filter(x=>x.status==="published").length;


draft.innerHTML=
data.filter(x=>x.status==="draft").length;

}

}



// SEARCH NEWS

let search=document.getElementById("searchNews");

if(search){

search.addEventListener("input",()=>{

searchQuery=
search.value.toLowerCase();

currentPage=1;

loadCMS();

});

}







// ============================
// IMAGE COMPRESSOR
// ============================

function compressImage(file){

return new Promise(resolve=>{

let img=new Image();

let reader=new FileReader();


reader.onload=e=>{

img.onload=()=>{


let canvas=document.createElement("canvas");

let max=1200;


let scale=Math.min(
max/img.width,
max/img.height,
1
);


canvas.width=img.width*scale;
canvas.height=img.height*scale;


let ctx=canvas.getContext("2d");

ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);


canvas.toBlob(blob=>{

resolve(
new File(
[blob],
file.name,
{
type:"image/jpeg",
}
)
);

},
"image/jpeg",
0.75
);


};


img.src=e.target.result;


};


reader.readAsDataURL(file);


});


}


// =====================
// DASHBOARD STAT
// =====================

function updateStats(data){

let total=document.getElementById("totalNews");
let pub=document.getElementById("publishNews");
let draft=document.getElementById("draftNews");


if(total){

total.innerHTML=data.length;

pub.innerHTML=
data.filter(
x=>x.status==="published"
).length;


draft.innerHTML=
data.filter(
x=>x.status==="draft"
).length;

}

}


// =====================
// NEWS PREVIEW
// =====================

let previewBtn=document.getElementById("previewBtn");


if(previewBtn){

previewBtn.onclick=()=>{


let box=document.getElementById("previewBox");


box.innerHTML=`

<div class="preview-news">

<img src="${$("image").value}">

<h2>
${$("title").value}
</h2>


<small>
${$("category").value}
</small>


<p>
${$("excerpt").value}
</p>


</div>

`;


}


}


// =======================
// =======================
// HERO MANAGER
// =======================

async function setHeroOnly(id){

let all = await loadArticles();


for(let a of all){

if(a.id != id && a.featured){

await supabaseClient
.from("articles")
.update({
    featured:false
})
.eq("id",a.id);

}

}

}





// =====================================
// THEME TOGGLE V4.0
// =====================================

function initTheme(){

let btn=document.getElementById("themeToggle");

if(!btn)return;


let saved =
localStorage.getItem("mediaTheme");


if(saved==="light"){

document.body.classList.add("light");

btn.innerHTML="&#9789;";

}else{

btn.innerHTML="&#9728;";

}



btn.onclick=function(){


document.body.classList.toggle("light");


let light =
document.body.classList.contains("light");


localStorage.setItem(
"mediaTheme",
light ? "light":"dark"
);


btn.innerHTML =
light ? "&#9789;" : "&#9728;";


};


}



document.addEventListener(
"DOMContentLoaded",
initTheme
);




