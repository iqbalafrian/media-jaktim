console.log("MEDIA JAKTIM CMS CLEAN");


const $ = id => document.getElementById(id);

let editID = null;


// LOGIN

function initLogin(){

if(sessionStorage.getItem("media_admin_login")){

$("login").style.display="none";
$("admin").style.display="block";

await loadCMS();

}


if($("loginBtn")){

$("loginBtn").onclick=()=>{

if($("pin").value==="1234"){

sessionStorage.setItem(
"media_admin_login",
"true"
);

$("login").style.display="none";
$("admin").style.display="block";

await loadCMS();

}

};

}


if($("pin")){

$("pin").addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

$("loginBtn").click();

}

});

}


}


document.addEventListener(
"DOMContentLoaded",
initLogin
);



// LOAD CMS

async function loadCMS(){

const articles = await loadArticles();

const list=$("list");

if(!list)return;


list.innerHTML="";


articles.forEach(a=>{


list.innerHTML += `

<tr>

<td>

<b>${a.title}</b><br>

<small>${a.author || "Admin"}</small>

</td>


<td>${a.category || ""}</td>


<td>${a.status || ""}</td>


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


$("formTitle").innerHTML="Edit Berita";


};


});



document.querySelectorAll(".delete")
.forEach(btn=>{


btn.onclick=async()=>{


await deleteArticle(btn.dataset.id);

await loadCMS();


};


});


}




// SAVE

$("articleForm").onsubmit=async(e)=>{


e.preventDefault();



let oldImage=$("image").value;



let article={


title:$("title").value,


slug:$("title")
.value
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-"),


category:$("category").value,


excerpt:$("excerpt").value,


content:$("content").value,


image:oldImage || "assets/images/default-news.png",


author:$("author").value || "Redaksi Media Jaktim",


status:$("status").value


};



let result;


if(editID){


result=await updateArticle(
editID,
article
);


}else{


result=await saveArticle(article);


}



if(result){


alert("Berhasil disimpan");


editID=null;

document.getElementById("articleForm").reset();

$("formTitle").innerHTML="Tambah Berita";


await loadCMS();


}


};





$("reset").onclick=()=>{

document.getElementById("articleForm").reset();

editID=null;

$("formTitle").innerHTML="Tambah Berita";

};




