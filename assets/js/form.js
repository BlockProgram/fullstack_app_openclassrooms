const allFormControls = document.querySelectorAll(".form-control");
const inputsData = document.querySelectorAll(".input-data");

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
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/;
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
