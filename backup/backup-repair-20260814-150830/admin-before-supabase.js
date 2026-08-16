const login = document.getElementById("login");
const admin = document.getElementById("admin");
const loginBtn = document.getElementById("loginBtn");
const logout = document.getElementById("logout");

const form = document.getElementById("articleForm");
const list = document.getElementById("list");

const PIN = "1234";

loginBtn.onclick = () => {
    const pin = document.getElementById("pin").value;

    if(pin === PIN){
        login.style.display="none";
        admin.style.display="block";
        loadCMS();
    }else{
        document.getElementById("loginError").innerText="PIN salah";
        document.getElementById("loginError").style.display="block";
    }
};


logout.onclick=()=>{
    admin.style.display="none";
    login.style.display="block";
};


async function loadCMS(){

    const articles = await loadArticles();

    list.innerHTML="";

    articles.forEach(article=>{

        list.innerHTML += `
        <tr>
        <td>${article.title}</td>
        <td>${article.category || ""}</td>
        <td>${article.status}</td>
        <td>
        <button onclick="deleteArticle(${article.id})">
        Hapus
        </button>
        </td>
        </tr>
        `;

    });

}



form.addEventListener("submit", async(e)=>{

e.preventDefault();


const title=document.getElementById("title").value;

const slug=title
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-");


const article={

title:title,

slug:slug,

category:
document.getElementById("category").value,

excerpt:
document.getElementById("excerpt").value,

content:
document.getElementById("content").value,

image:
document.getElementById("image").value,

author:
document.getElementById("author").value,

status:
document.getElementById("status").value

};


const result=await saveArticle(article);


if(result){

form.reset();

loadCMS();

}

});



async function deleteArticle(id){

const {error}=await supabaseClient
.from("articles")
.delete()
.eq("id",id);


if(error){

alert(error.message);

}else{

loadCMS();

}

}
async function loadCMS(){

    const articles = await loadArticles();

    console.log("ARTICLES:", articles);

    list.innerHTML="";

    if(!articles || articles.length === 0){
        list.innerHTML = `
        <tr>
        <td colspan="4">Belum ada berita</td>
        </tr>`;
        return;
    }

    articles.forEach(article=>{

        list.innerHTML += `
        <tr>
            <td>${article.title}</td>
            <td>${article.category || "-"}</td>
            <td>${article.status}</td>
            <td>
                <button onclick="deleteArticle(${article.id})">
                Hapus
                </button>
            </td>
        </tr>
        `;

    });

}





