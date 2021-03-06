const postContainer = document.querySelector(".post");
const numberCommentsEl = document.querySelector(".post__comments-number");
const commentsContainer = document.querySelector(".post__comments");
const inputComment = document.querySelector(".post__input-comment");
const commentBtn = document.querySelector(".post__publish-btn");
const deletePostBtn = document.querySelector(".post__delete-btn");
const deleteCommentBtn = document.querySelector(".post__comment-delete");
const dropDownMenu = document.querySelector(".gif__dropdown");
const dropDownLink = document.querySelector(".dropdown--input");
const copyLinkBtn = document.querySelector(".dropdown--copybtn");

const postID = window.location.href.split("/")[4];
let commentsNumber = 0;

// Get data from Database
function getData() {
  let req = new XMLHttpRequest();
  req.open("GET", `https://localhost:3000/api/posts/${postID}`);
  req.send();

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      let response = JSON.parse(req.response);
      displayPost(response);

      // Display number of comments
      commentsNumber = response.results[0][0].nbComments;
      numberCommentsEl.innerHTML = `<i class="far fa-comment"></i>${commentsNumber}`;
    }
  };
}

getData();

function displayPost(data) {
  let postObject = data.results[0][0];
  let userId = data.userId;
  let su = data.su;

  let datePost = postObject.date;
  let jsDate = new Date(Date.parse(datePost)).toLocaleString();

  // Show post delete button for author & admin
  if (userId == postObject.auteur || su == "true") {
    postContainer.innerHTML = `
  <h1 class="post__title">${postObject.titre}</h1>
  <div class="post__topdata">
    <h2 class="post__author">${postObject.prenom} ${postObject.nom}</h2>
    <h3 class="post__time">${jsDate}</h3>
    <button onclick="deletePost()" class="post__delete-btn">Supprimer</button>
  </div>
  <img
    class="gif"
    src="${postObject.url}"
    alt="${postObject.titre}"
  />
  `;
  } else {
    postContainer.innerHTML = `
    <h1 class="post__title">${postObject.titre}</h1>
    <div class="post__topdata">
      <h2 class="post__author">${postObject.prenom} ${postObject.nom}</h2>
      <h3 class="post__time">${jsDate}</h3>
    </div>
    <img
      class="gif"
      src="${postObject.url}"
      alt="${postObject.titre}"
    />
    `;
  }
}

function getComments() {
  let req = new XMLHttpRequest();
  req.open("GET", `https://localhost:3000/api/posts/${postID}/comments`);
  req.send();

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      displayComments(JSON.parse(req.response));
    }
  };
}

getComments();

function displayComments(data) {
  let userId = data.userId;
  let su = data.su;

  data.results[0].forEach((comment) => {
    let divEl = document.createElement("div");
    divEl.classList.add("post__comment");

    let dateComment = comment.dateAjout;
    let jsDate = new Date(Date.parse(dateComment)).toLocaleString();

    // Show comment delete button for author & admin
    if (userId == comment.auteur || su == "true") {
      divEl.innerHTML = `
      <div class="post__comment-wrapper">
      <p class="post__comment-author">${comment.prenom} ${comment.nom}</p>
      <p>-</p>
      <p class="post__comment-time">${jsDate}</p>
      <button onclick="deleteComment(${comment.commentId})" class="post__comment-delete">X</button>
    </div>
    <p class="post__comment-text">
    ${comment.contenu}
    </p>
      `;
    } else {
      divEl.innerHTML = `
        <div class="post__comment-wrapper">
        <p class="post__comment-author">${comment.prenom} ${comment.nom}</p>
        <p>-</p>
        <p class="post__comment-time">${jsDate}</p>
      </div>
      <p class="post__comment-text">
      ${comment.contenu}
      </p>
        `;
    }
    commentsContainer.appendChild(divEl);
  });
}

// Save Comments in database
function postComment() {
  let CommentData = {
    commentId: 0,
    contenu: inputComment.value,
    postId: +postID,
    nbComments: commentsNumber + 1,
  };
  let req = new XMLHttpRequest();
  req.open("POST", `https://localhost:3000/api/posts/${postID}/comments`);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(CommentData));

  req.onreadystatechange = (e) => {
    window.location.reload();
  };
}

// DELETE Post
function deletePost() {
  let postData = {
    postId: postID,
  };
  let req = new XMLHttpRequest();
  req.open("DELETE", "https://localhost:3000/api/posts/:id");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(postData));

  req.onreadystatechange = (e) => {
    window.location.href = "/feed";
  };
}

// DELETE Comment
function deleteComment(commentId) {
  let commentDeleteData = {
    commentId: commentId,
    nbComments: commentsNumber - 1,
    postId: postID,
  };

  console.log(commentDeleteData);
  let req = new XMLHttpRequest();
  req.open("DELETE", "https://localhost:3000/api/posts/:id/comments");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(commentDeleteData));

  req.onreadystatechange = (e) => {
    window.location.reload();
  };
}

// Toggle share menu
function toggleDropDown() {
  dropDownMenu.classList.toggle("active");
  dropDownLink.value = window.location.href;
}

function closeDropDown() {
  dropDownMenu.classList.remove("active");
}

// Copy post link
function copyToClipboard() {
  dropDownLink.select();

  // Copy the selection to clipboard
  document.execCommand("copy");

  copyLinkBtn.style.backgroundColor = "green";

  setTimeout(() => {
    copyLinkBtn.style.backgroundColor = "#021775";
  }, 2000);
}

// EVENT LISTENERS
commentBtn.addEventListener("click", () => {
  postComment();
});
