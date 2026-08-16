/* =================================
   MOBILE SEARCH CONTROL v1
================================= */

document.addEventListener("DOMContentLoaded",()=>{


const btn=document.querySelector(".header-actions .search");
const box=document.querySelector(".search-box");


if(!btn || !box) return;



// tombol search

btn.addEventListener("click",(e)=>{

e.stopPropagation();

document.body.classList.toggle("search-open");

});



// jangan tutup saat klik input

box.addEventListener("click",(e)=>{

e.stopPropagation();

});



// klik luar tutup

document.addEventListener("click",()=>{

document.body.classList.remove("search-open");

});



});
