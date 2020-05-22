const title = document.getElementById("publish__gif-title");
const urlInput = document.getElementById("publish__url");
const addGifBtn = document.querySelector(".publish__upload-btn");
const fileInput = document.getElementById("file");
const errorMsg = document.querySelector(".publish__last-container small");
const publishBtn = document.querySelector(".publish__btn");

// Check GIF
function checkGif(input) {
  const urlRegex = new RegExp("^https://.+.gif$");
  if (fileInput.value !== "" && urlRegex.test(input.value.trim())) {
    showError(input, "Veuillez renseigner 1 seul GIF (URL ou fichier)");
  } else if (fileInput.value !== "" || urlRegex.test(input.value.trim())) {
    showSuccess(fileInput);
    showSuccess(input);
  } else {
    showError(
      input,
      "Une URL se terminant par '.gif' ou un fichier GIF est obligatoire"
    );
  }
}

// Check all fields. If valid then send POST request
function checkAllFields() {
  let checkedCount = 0;

  allFormControls.forEach((item) => {
    if (item.classList.contains("success")) {
      checkedCount += 1;
    }
  });

  if (checkedCount == 3) {
    formatRequestData();
  }
}

//Format data before POST request
let publishData = {};

function formatRequestData() {
  publishData = {
    titre: title.value,
    url: urlInput.value,
  };

  console.log(publishData);
  postData(publishData);
}

// //POST request function
async function postData(input) {
  let gif = document.getElementById("file").files[0]; // file from input
  let req = new XMLHttpRequest();
  let formData = new FormData();

  formData.append("gif", gif);
  formData.append("data", JSON.stringify(input));
  req.open("POST", "http://localhost:3000/api/posts");
  req.send(formData);

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      window.location.href = "/feed";
    } else {
      window.location.href = "/";
    }
  };
}

// Check Inputs when form is submitted
publishBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkLength(title, 3, 50);
  checkGif(urlInput);
  checkAllFields();
});

// Change button text with filename when GIF submitted
fileInput.addEventListener("change", () => {
  let fileName = fileInput.value.split("\\")[2];
  addGifBtn.innerText = fileName;
});
