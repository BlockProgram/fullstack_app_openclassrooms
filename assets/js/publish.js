const allFormControls = document.querySelectorAll(".form-control");
const title = document.getElementById("publish__gif-title");
const addGifBtn = document.querySelector(".publish__upload-btn");
const fileInput = document.getElementById("file");
const publishBtn = document.querySelector(".publish__btn");

// Change the text of the label with the name of the file uploaded

// Display error message and red outline input
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Display green outline input
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, "Ce champ est obligatoire");
    } else {
      showSuccess(input);
    }
  });
}

// Check GIF
function checkGif() {
  // Either an URL or a file
  // Show error message
}

// Check Inputs when form is submitted
publishBtn.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([title]);
  checkGif();
  checkAllFields();
});

// Check all fields. If valid then send POST request
function checkAllFields() {
  let checkedCount = 0;

  allFormControls.forEach((item) => {
    if (item.classList.contains("success")) {
      checkedCount += 1;
    }
  });

  if (checkedCount == 5) {
    formatRequestData();
    window.location.href = "login.html";
  }
}

// Format data before POST request
//   let signupData = {};

//   function formatRequestData() {
//     inputsData.forEach((input) => {
//       signupData[input.id] = input.value;
//     });

//     console.log(signupData);
//     postData();
//   }

// POST request function
//   function postData() {
//     var req = new XMLHttpRequest();
//     req.open("POST", "http://localhost:3000/api/auth/signup");
//     req.setRequestHeader("Content-Type", "application/json");
//     req.send(JSON.stringify(signupData));
//   }
