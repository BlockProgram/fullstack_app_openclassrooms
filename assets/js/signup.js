const allFormControls = document.querySelectorAll(".form-control");
const inputsData = document.querySelectorAll(".input-data");
const firstName = document.getElementById("first__name");
const lastName = document.getElementById("last__name");
const department = document.getElementById("department");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.querySelector(".signup__btn");

// Form validation

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

// Check if email is valid
function checkEmail(input) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email invalide");
  }
}

function checkPassword(input) {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (strongRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    password.parentElement.classList.add("error");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Au moins ${min} caractères`);
  } else if (input.value.length > max) {
    showError(input, `${max} caractères maximum`);
  } else {
    showSuccess(input);
  }
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

// Check Inputs when form is submitted
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([firstName, lastName, password]);
  checkLength(firstName, 3, 30);
  checkLength(lastName, 3, 30);
  checkLength(email, 3, 40);
  checkEmail(email);
  checkPassword(password);

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
  }
}

// Format data before POST request
let signupData = {};

function formatRequestData() {
  inputsData.forEach((input) => {
    signupData[input.id] = input.value;
  });

  console.log(signupData);
  postData();
}

// POST request function
function postData() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/auth/signup");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(signupData));

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      allFormControl.forEach((el) => {
        el.classList.add("success");
      });
      window.location.href = "/login";
    }
  };
}

// EVENT LISTENERS
const passwordInput = document.querySelector(".password__input");
const passwordInfo = document.querySelector(".password__info");
const passwordSmall = document.querySelector(".password__small");

passwordInput.addEventListener("focus", () => {
  passwordSmall.style.display = "none";
  passwordInfo.style.display = "block";
});
