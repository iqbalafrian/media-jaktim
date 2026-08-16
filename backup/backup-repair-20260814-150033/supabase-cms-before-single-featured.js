console.log("MEDIA JAKTIM CMS SUPABASE CONNECTED");

async function saveArticle(article){

    if(article.featured){

        await supabaseClient
        .from("articles")
        .update({
            featured:false
        })
        .neq("id",0);

    }


    const { data, error } = await supabaseClient
        .from("articles")
        .insert([
            {
                title: article.title,
                slug: article.slug,
                category: article.category,
                content: article.content,
                excerpt: article.excerpt,
                image: article.image || "assets/images/default-news.png",
                status: article.status || "draft",
                author: article.author || "Admin",
                featured: article.featured || false
            }
        ]);

    if(error){
        console.error(error);
        alert("Gagal simpan artikel");
        return false;
    }

    alert("Artikel berhasil disimpan");
    return true;
}


async function loadArticles(){

    const {data,error}=await supabaseClient
        .from("articles")
        .select("*")
        .order("created_at",{ascending:false});

    if(error){
        console.error(error);
        return [];
    }

    return data;
}









// UPDATE ARTICLE

async function updateArticle(id,article){

if(article.featured){

    await supabaseClient
    .from("articles")
    .update({
        featured:false
    })
    .neq("id",id);

}



const {data,error}=await supabaseClient
.from("articles")
.update({

title:article.title,
slug:article.slug,
category:article.category,
content:article.content,
excerpt:article.excerpt,
image:article.image,
status:article.status,
author:article.author,
featured:article.featured || false

})
.eq("id",id);



if(error){

console.error(error);

alert("Gagal update: "+error.message);

return false;

}


alert("Berita berhasil diperbarui");

return true;


}




// DELETE ARTICLE

async function deleteArticle(id){


const {error}=await supabaseClient
.from("articles")
.delete()
.eq("id",id);



if(error){

console.error(error);

alert(error.message);

return false;

}


alert("Berita berhasil dihapus");

return true;


}



// ========================
// UPLOAD IMAGE STORAGE
// ========================

async function uploadImage(file){


if(!file){
return null;
}



const ext=file.name.split(".").pop();


const filename=
Date.now()+"."+ext;



const {error}=await supabaseClient
.storage
.from("media-jaktim")
.upload(
filename,
file
);



if(error){

console.error(error);

alert("Upload foto gagal");

return null;

}



const {data}=supabaseClient
.storage
.from("media-jaktim")
.getPublicUrl(filename);



return data.publicUrl;


}





