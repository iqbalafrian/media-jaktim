(function () {
  'use strict';

  const PIN = 'MEDIAJAKTIM';
  const $ = (id) => document.getElementById(id);
  let editing = null;

  const loginPanel = $('login');
  const adminPanel = $('admin');
  const pinInput = $('pin');
  const loginBtn = $('loginBtn');
  const logoutBtn = $('logout');

  function showAdmin() {
    loginPanel.style.display = 'none';
    adminPanel.style.display = 'block';
    render();
  }

  function showLogin() {
    loginPanel.style.display = 'block';
    adminPanel.style.display = 'none';
  }

  function login() {
    const value = (pinInput.value || '').trim();
    if (value === PIN) {
      sessionStorage.setItem('mj_admin', '1');
      showAdmin();
    } else {
      $('loginError').textContent = 'PIN salah. Gunakan PIN demo: MEDIAJAKTIM';
      $('loginError').style.display = 'block';
      pinInput.focus();
      pinInput.select();
    }
  }

  loginBtn.addEventListener('click', login);
  pinInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      login();
    }
  });

  logoutBtn.addEventListener('click', function () {
    sessionStorage.removeItem('mj_admin');
    location.reload();
  });

  function render() {
    const arr = getArticles().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const list = $('list');
    list.innerHTML = '';

    if (!arr.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 4;
      td.textContent = 'Belum ada berita.';
      tr.appendChild(td);
      list.appendChild(tr);
      return;
    }

    arr.forEach(function (a) {
      const tr = document.createElement('tr');
      const info = document.createElement('td');
      const title = document.createElement('b');
      title.textContent = a.title;
      const meta = document.createElement('small');
      meta.textContent = (a.author || 'Redaksi Media Jaktim') + ' · ' + new Date(a.date).toLocaleDateString('id-ID');
      info.appendChild(title);
      info.appendChild(document.createElement('br'));
      info.appendChild(meta);

      const cat = document.createElement('td');
      cat.textContent = a.category || '-';

      const status = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = 'badge ' + (a.status || 'draft');
      badge.textContent = a.status === 'published' ? 'published' : 'draft';
      status.appendChild(badge);

      const actions = document.createElement('td');
      const edit = document.createElement('button');
      edit.className = 'btn secondary';
      edit.type = 'button';
      edit.textContent = 'Edit';
      edit.addEventListener('click', function () { editArticle(a.id); });

      const del = document.createElement('button');
      del.className = 'btn danger';
      del.type = 'button';
      del.textContent = 'Hapus';
      del.addEventListener('click', function () { deleteArticle(a.id); });

      actions.appendChild(edit);
      actions.appendChild(del);
      tr.appendChild(info);
      tr.appendChild(cat);
      tr.appendChild(status);
      tr.appendChild(actions);
      list.appendChild(tr);
    });
  }

  function resetForm() {
    editing = null;
    $('articleForm').reset();
    $('author').value = 'Redaksi Media Jaktim';
    $('formTitle').textContent = 'Tambah Berita';
  }

  $('reset').addEventListener('click', resetForm);

  $('articleForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = $('title').value.trim();
    const excerpt = $('excerpt').value.trim();
    const content = $('content').value.trim();
    if (!title || !excerpt || !content) {
      alert('Judul, excerpt, dan isi berita wajib diisi.');
      return;
    }

    let arr = getArticles();
    const obj = {
      id: editing || Date.now(),
      title: title,
      slug: slugify(title),
      category: $('category').value,
      excerpt: excerpt,
      content: content,
      image: $('image').value.trim() || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      author: $('author').value.trim() || 'Redaksi Media Jaktim',
      date: new Date().toISOString(),
      status: $('status').value,
      featured: false
    };

    if (editing) {
      arr = arr.map(function (a) { return a.id === editing ? obj : a; });
    } else {
      arr.unshift(obj);
    }

    saveArticles(arr);
    resetForm();
    render();
    alert('Berita berhasil disimpan.');
  });

  function editArticle(id) {
    const a = getArticles().find(function (x) { return x.id === id; });
    if (!a) return;
    editing = id;
    $('title').value = a.title || '';
    $('category').value = a.category || 'Jakarta Timur';
    $('excerpt').value = a.excerpt || '';
    $('content').value = a.content || '';
    $('image').value = a.image || '';
    $('author').value = a.author || 'Redaksi Media Jaktim';
    $('status').value = a.status || 'published';
    $('formTitle').textContent = 'Edit Berita';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteArticle(id) {
    if (!confirm('Hapus berita ini?')) return;
    saveArticles(getArticles().filter(function (a) { return a.id !== id; }));
    render();
  }

  window.editArticle = editArticle;
  window.deleteArticle = deleteArticle;

  if (sessionStorage.getItem('mj_admin') === '1') showAdmin();
  else showLogin();
})();





