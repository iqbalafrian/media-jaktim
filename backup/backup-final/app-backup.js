document.addEventListener('DOMContentLoaded',()=>{
 const articles=getArticles().filter(a=>a.status==='published').sort((a,b)=>new Date(b.date)-new Date(a.date));
 const path=location.pathname;
 const fmt=d=>new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(d)).replace('.',':');
 const link=a=>`article.html?slug=${encodeURIComponent(a.slug)}`;
 document.querySelectorAll('[data-article-id]').forEach(el=>{const a=articles.find(x=>String(x.id)===el.dataset.articleId);if(a)el.href=link(a)});
 const search=document.querySelector('.search'); if(search) search.addEventListener('click',()=>{const q=prompt('Cari berita Media Jaktim:'); if(q){location.href='search.html?q='+encodeURIComponent(q)}});
 const form=document.querySelector('.newsletter form'); if(form) form.addEventListener('submit',e=>{e.preventDefault();alert('Terima kasih. Newsletter akan terhubung ke layanan email pada tahap berikutnya.')});
 // Turn existing homepage cards into article links based on visible order
 const cards=[...document.querySelectorAll('.card')]; cards.forEach((card,i)=>{if(articles[i]){card.style.cursor='pointer';card.onclick=()=>location.href=link(articles[i]);}});
 const hero=document.querySelector('.hero'); if(hero&&articles[0]) hero.onclick=()=>location.href=link(articles[0]);
 document.querySelectorAll('.side-news article').forEach((el,i)=>{if(articles[i+1])el.onclick=()=>location.href=link(articles[i+1]);el.style.cursor='pointer'});
});





