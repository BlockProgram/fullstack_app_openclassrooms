const main = document.querySelector("main");
const dropDownLink = document.querySelector(".dropdown--input");
const copyLinkBtn = document.querySelector(".dropdown--copybtn");

// Get data from Database
function getData() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/api/posts");
  req.send();

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      displayGifs(JSON.parse(req.response));
    }
  };
}

getData();

function displayGifs(array) {
  array.forEach((gif) => {
    let gifContainer = document.createElement("div");
    gifContainer.classList.add("gif__container");
    gifContainer.setAttribute("href", `/post/${gif.postId}`);

    let datePost = gif.date;
    let jsDate = new Date(Date.parse(datePost)).toLocaleString();

    if (gif.postId !== null) {
      gifContainer.innerHTML = ` 
      <a href="/post/${gif.postId}">     
    <h2 class="gif__title">${gif.titre}</h2>
    <div class="gif__topdata">
      <h3>${gif.prenom} ${gif.nom}</h3>
      <p>-</p>
      <h4>${jsDate}</h4>
    </div>
    <img
      class="gif"
      src="${gif.url}"
      alt="${gif.titre}"
    />
    </a>
    <div class="gif__bottomdata">
    <a href="/post/${gif.postId}" class="gif__comments"><i class="far fa-comment"></i><p>${gif.nbComments}</p></a>
      <button onclick="toggleDropDown()"  class="share-btn">
        Partager
      </button>
      <div class="gif__dropdown">
        <button onclick="closeDropDown()" class="dropdown--closebtn">X</button>
        <p>Lien du post :</p>
        <input value="http://localhost:3000/post/${gif.postId}" class="dropdown--input" type="text"  />
        <button onclick="copyToClipboard()" class="dropdown--copybtn">Copier</button>
      </div>
    </div>`;

      main.appendChild(gifContainer);
    }
  });
}

function toggleDropDown() {
  let source = event.target;
  source.nextElementSibling.classList.toggle("active");
}

function closeDropDown() {
  let source = event.target;
  source.parentElement.classList.remove("active");
}

// Copy post link
function copyToClipboard() {
  let source = event.target;
  source.previousElementSibling.select();

  // Copy the selection to clipboard
  document.execCommand("copy");

  source.style.backgroundColor = "green";

  setTimeout(() => {
    source.style.backgroundColor = "#021775";
  }, 2000);
}
