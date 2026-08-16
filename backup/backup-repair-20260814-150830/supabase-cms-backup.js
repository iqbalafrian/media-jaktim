console.log("MEDIA JAKTIM CMS SUPABASE CONNECTED");

async function saveArticle(article){

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
                author: article.author || "Admin"
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





