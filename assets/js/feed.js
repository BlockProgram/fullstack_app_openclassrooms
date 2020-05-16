const main = document.querySelector("main");
const shareBtn = document.querySelectorAll(".gif__share");
const shareDropDown = document.querySelector(".gif__dropdown");
const closeDropDownBtn = document.querySelectorAll(".dropdown--closebtn");

// Get data from Database
function getData() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/api/posts");
  req.send();

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      console.log(req.response);
      displayGifs(JSON.parse(req.response));
    }
  };
}

getData();

function displayGifs(array) {
  array.forEach((gif) => {
    let gifContainer = document.createElement("a");
    gifContainer.classList.add("gif__container");
    gifContainer.setAttribute("href", `/post/${gif.postId}`);

    let datePost = gif.date;
    let jsDate = new Date(Date.parse(datePost)).toLocaleString();

    if (gif.postId !== null) {
      gifContainer.innerHTML = `      
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
    <div class="gif__bottomdata">
      <div class="gif__comments"><i class="far fa-comment"></i><p>${gif.nbComments}</p></div>
      <button class="gif__share">
        Partager
      </button>
      <div class="gif__dropdown">
        <button class="dropdown--closebtn">X</button>
        <p>Lien du post :</p>
        <input placeholder="Ecrire un commentaire" class="dropdown--input" type="text"  />
        <button class="dropdown--copybtn">Copier</button>
      </div>
    </div>`;

      main.appendChild(gifContainer);
    }
  });
}

// Event Listeners
shareBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.nextElementSibling.classList.toggle("active");
  });
});

closeDropDownBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.parentElement.classList.remove("active");
    e.preventDefault();
  });
});
