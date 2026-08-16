# Media Jaktim V2 — Homepage + CMS Prototype

## Yang ditambahkan
- Homepage tetap mengikuti desain yang sudah di-lock.
- Logo Media Jaktim dari aset yang diberikan.
- Halaman artikel.
- Search berita.
- Admin CMS prototype: tambah, edit, hapus, draft/publish.
- Data tersimpan di localStorage browser.

## Admin demo
Buka `admin.html` lalu gunakan PIN: `MEDIAJAKTIM`.

> Penting: ini **prototype**, bukan sistem admin production. PIN dan data browser-side tidak aman untuk website publik. Tahap berikutnya adalah migrasi CMS ke Supabase Auth + PostgreSQL/Storage agar login dan data aman serta bisa dipakai dari perangkat berbeda.

## Cara menjalankan
Bisa dibuka dengan static server sederhana. Contoh: `python -m http.server 8080` lalu buka `http://localhost:8080`.
