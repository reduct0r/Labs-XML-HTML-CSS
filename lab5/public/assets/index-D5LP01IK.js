(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver(i => {
    for (const n of i)
      if (n.type === "childList")
        for (const r of n.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && s(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = t(i);
    fetch(i.href, n);
  }
})();

class c {
  constructor(e) {
    this.parent = e;
    this.storageKey = "productLikes";
  }
  getLikesData() {
    const e = localStorage.getItem(this.storageKey);
    return e ? JSON.parse(e) : {};
  }
  saveLikesData(e) {
    localStorage.setItem(this.storageKey, JSON.stringify(e));
  }
  addListeners(e, t) {
    document.getElementById(`click-card-${e.id}`).addEventListener("click", t);
    document
      .getElementById(`like-btn-${e.id}`)
      .addEventListener("click", () => this.handleLike(e.id));
    document
      .getElementById(`dislike-btn-${e.id}`)
      .addEventListener("click", () => this.handleDislike(e.id));
  }
  handleLike(e) {
    const t = this.getLikesData();
    t[e] || (t[e] = { likes: 0, dislikes: 0, status: null });
    t[e].status === "like"
      ? ((t[e].likes = Math.max(0, t[e].likes - 1)), (t[e].status = null))
      : t[e].status === "dislike"
      ? ((t[e].dislikes = Math.max(0, t[e].dislikes - 1)),
        (t[e].likes += 1),
        (t[e].status = "like"))
      : ((t[e].likes += 1), (t[e].status = "like"));
    this.saveLikesData(t);
    this.updateLikesUI(e, t[e]);
  }
  handleDislike(e) {
    const t = this.getLikesData();
    t[e] || (t[e] = { likes: 0, dislikes: 0, status: null });
    t[e].status === "dislike"
      ? ((t[e].dislikes = Math.max(0, t[e].dislikes - 1)), (t[e].status = null))
      : t[e].status === "like"
      ? ((t[e].likes = Math.max(0, t[e].likes - 1)),
        (t[e].dislikes += 1),
        (t[e].status = "dislike"))
      : ((t[e].dislikes += 1), (t[e].status = "dislike"));
    this.saveLikesData(t);
    this.updateLikesUI(e, t[e]);
  }
  updateLikesUI(e, t) {
    const s = document.getElementById(`likes-count-${e}`);
    const i = document.getElementById(`dislikes-count-${e}`);
    const n = document.getElementById(`like-btn-${e}`);
    const r = document.getElementById(`dislike-btn-${e}`);
    s && (s.textContent = t.likes);
    i && (i.textContent = t.dislikes);
    n &&
      (t.status === "like"
        ? ((n.style.color = "#FFA115"), (n.style.fontWeight = "700"))
        : ((n.style.color = "#AAA"), (n.style.fontWeight = "400")));
    r &&
      (t.status === "dislike"
        ? ((r.style.color = "#FFA115"), (r.style.fontWeight = "700"))
        : ((r.style.color = "#AAA"), (r.style.fontWeight = "400")));
  }
  render(e, t) {
    const s = this.getHTML(e);
    this.parent.insertAdjacentHTML("beforeend", s);
    this.addListeners(e, t);
    const i = this.getLikesData();
    if (i[e.id]) this.updateLikesUI(e.id, i[e.id]);
    else {
      const n = { likes: 0, dislikes: 0, status: null };
      this.updateLikesUI(e.id, n);
    }
  }
  getHTML(e) {
    return `
      <div class="card" style="width: 300px;">
        <img class="card-img-top" src="${e.src}" alt="картинка" style="object-fit: cover; height: 180px;"/>
        <div class="card-body" style="display: flex; flex-direction: column; gap: 8px;">
          <h5 class="card-title" style="margin-bottom: 0;">${e.title}</h5>
          <p class="card-text" style="flex-grow: 1; font-size: 0.9rem; color: #444;">${e.text}</p>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button 
              class="btn custom-btn" 
              id="click-card-${e.id}" 
              data-id="${e.id}"
              style="
                padding: 6px 14px;
                border: 1px solid #ccc;
                background-color: white;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
                flex-shrink: 0;
                color: #737373;
              " onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">
              Открыть задачу
            </button>
            <div style="display: flex; align-items: center; gap: 15px; font-weight: 500; font-size: 1rem;">
              <button 
                class="like-btn" 
                id="like-btn-${e.id}" 
                title="Лайк"
                style="background: none; border: none; cursor: pointer; color: #AAA; font-size: 1.25rem; display: flex; align-items: center; gap: 4px;"
              >
                <span>👍</span>
                <span id="likes-count-${e.id}">0</span>
              </button>
              <button 
                class="dislike-btn" 
                id="dislike-btn-${e.id}" 
                title="Дизлайк"
                style="background: none; border: none; cursor: pointer; color: #AAA; font-size: 1.25rem; display: flex; align-items: center; gap: 4px;"
              >
                <span>👎</span>
                <span id="dislikes-count-${e.id}">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>
        .custom-btn:hover {
          background-color: #FFA115;
          color: white;
          border-color: #FFA115;
        }
      </style>
    `;
  }
}

class u {
  constructor(e) {
    this.parent = e;
  }
  getHTML(e) {
    return `
      <div style="max-width: 600px; margin: 2rem auto; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); background: #fff;">
        <img src="${e.src}" alt="icon" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 6px;">
        <h2 style="margin-top: 1rem; font-weight: 700; font-size: 1.8rem;">${e.title}</h2>
        <p style="font-size: 1rem; color: #444; margin: 1rem 0;">${e.text}</p>
        ${
          e.difficulty
            ? `<span style="padding: 6px 12px; font-size: 1rem; border-radius: 14px; background-color: ${
                e.difficulty === "Easy"
                  ? "#52c41a"
                  : e.difficulty === "Medium"
                  ? "#faad14"
                  : e.difficulty === "Hard"
                  ? "#f5222d"
                  : "#d9d9d9"
              }; color: white;">${e.difficulty}</span>`
            : ""
        }
        <div style="margin-top: 2rem; font-size: 1rem; line-height: 1.5; color: #333;">
          <strong>Описание задачи:</strong>
          <p>${e.description || "Подробного описания пока нет."}</p>
        </div>
      </div>
    `;
  }
  render(e) {
    const t = this.getHTML(e);
    this.parent.insertAdjacentHTML("beforeend", t);
  }
}

class p {
  constructor(e) {
    this.parent = e;
  }
  addListeners(e) {
    document.getElementById("back-button").addEventListener("click", e);
  }
  getHTML() {
    return `
      <div style="position: absolute; top: 20px; left: 20px;">
        <button id="back-button" class="btn btn-primary" type="button">Назад</button>
      </div>
    `;
  }
  render(e) {
    const t = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", t);
    this.addListeners(e);
  }
}

class h {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }
  getTasks() {
    return `${this.baseUrl}/tasks`;
  }
  getTaskById(e) {
    return `${this.baseUrl}/tasks/${e}`;
  }
  createTask() {
    return `${this.baseUrl}/tasks`;
  }
  removeTaskById(e) {
    return `${this.baseUrl}/tasks/${e}`;
  }
  updateTaskById(e) {
    return `${this.baseUrl}/tasks/${e}`;
  }
}

const a = new h();

class m {
  get(e, t) {
    const s = new XMLHttpRequest();
    s.open("GET", e);
    s.send();
    s.onreadystatechange = () => {
      s.readyState === 4 && this._handleResponse(s, t);
    };
  }
  post(e, t, s) {
    const i = new XMLHttpRequest();
    i.open("POST", e);
    i.setRequestHeader("Content-Type", "application/json");
    i.send(JSON.stringify(t));
    i.onreadystatechange = () => {
      i.readyState === 4 && this._handleResponse(i, s);
    };
  }
  patch(e, t, s) {
    const i = new XMLHttpRequest();
    i.open("PATCH", e);
    i.setRequestHeader("Content-Type", "application/json");
    i.send(JSON.stringify(t));
    i.onreadystatechange = () => {
      i.readyState === 4 && this._handleResponse(i, s);
    };
  }
  delete(e, t) {
    const s = new XMLHttpRequest();
    s.open("DELETE", e);
    s.send();
    s.onreadystatechange = () => {
      s.readyState === 4 && this._handleResponse(s, t);
    };
  }
  _handleResponse(e, t) {
    try {
      const s = e.responseText ? JSON.parse(e.responseText) : null;
      t(s, e.status);
    } catch (s) {
      console.error("Ошибка парсинга JSON:", s);
      t(null, e.status);
    }
  }
}

const l = new m();

class g {
  constructor(e, t) {
    this.parent = e;
    this.id = t;
  }
  getData() {
    l.get(a.getTaskById(this.id), e => {
      this.renderData(e);
    });
  }
  get pageRoot() {
    return document.getElementById("product-page");
  }
  getHTML() {
    return '<div id="product-page"></div>';
  }
  clickBack() {
    new d(this.parent).render();
  }
  renderData(e) {
    new u(this.pageRoot).render(e);
    new p(this.pageRoot).render(this.clickBack.bind(this));
  }
  render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    this.getData();
  }
}

class d {
  constructor(e) {
    this.parent = e;
    this.query = "";
    this.limit = 10;
  }
  clickCard(e) {
    const t = e.target.closest("[data-id]");
    if (!t) return;
    const s = t.dataset.id;
    new g(this.parent, s).render();
  }
  getData() {
    let e = a.getTasks();
    this.query.trim() && (e += `?title=${encodeURIComponent(this.query.trim())}`);
    l.get(e, t => {
      const s = t.slice(0, this.limit);
      this.renderData(s);
    });
  }
  get pageRoot() {
    return document.getElementById("main-page");
  }
  getHTML() {
    return `
      <header style="background-color: #f8f9fa; padding: 1rem 2rem; display: flex; align-items: center; border-bottom: 1px solid #ddd; margin-bottom: 1rem;">
        <div style="font-weight: bold; font-size: 1.5rem; color: #FFA115;">LitCoder</div>
        <nav style="margin-right: auto; margin-left: 50px;">
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #737373;" onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">Главная</a>
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #737373;" onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">Задачи</a>
          <a href="#" style="margin-left: 1.5rem; text-decoration: none; color: #737373;" onmouseover="this.style.color='#FFA115'" onmouseout="this.style.color='#737373'">О нас</a>
        </nav>
      </header>
      <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
        <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Поиск по названию..." 
            style="
              padding: 0.5rem 1rem;
              flex: 1;
              border: 1px solid #ccc;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              transition: border 0.2s, box-shadow 0.2s;
            "
            onfocus="this.style.borderColor='#FFA115'; this.style.boxShadow='0 0 5px rgba(255,161,21,0.5)'"
            onblur="this.style.borderColor='#ccc'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'"
          />
          <input 
            id="limit-input" 
            type="number" 
            min="1" 
            value="${this.limit}" 
            style="
              width: 80px;
              padding: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              text-align: center;
            "
          />
        </div>
        <div id="main-page" style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        "></div>
      </div>
    `;
  }
  renderData(e) {
    this.pageRoot.innerHTML = "";
    e.forEach(t => {
      new c(this.pageRoot).render(t, this.clickCard.bind(this));
    });
  }
  addEventListeners() {
    const e = document.getElementById("search-input");
    const t = document.getElementById("limit-input");
    e.addEventListener("input", () => {
      this.query = e.value;
      this.getData();
    });
    t.addEventListener("input", () => {
      const s = parseInt(t.value, 10);
      this.limit = isNaN(s) || s < 1 ? 1 : s;
      this.getData();
    });
  }
  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.addEventListeners();
    this.getData();
  }
}

const y = document.getElementById("root");
const f = new d(y);
f.render();