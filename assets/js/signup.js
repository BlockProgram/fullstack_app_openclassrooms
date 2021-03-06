const firstName = document.getElementById("first__name");
const lastName = document.getElementById("last__name");
const department = document.getElementById("department");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordInput = document.querySelector(".password__input");
const passwordInfo = document.querySelector(".password__info");
const passwordSmall = document.querySelector(".password__small");
const signUpBtn = document.querySelector(".signup__btn");

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
  req.open("POST", "https://localhost:3000/api/auth/signup");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(signupData));

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      allFormControls.forEach((el) => {
        el.classList.add("success");
      });
      window.location.href = "/login";
    } else if (req.readyState > 3 && req.status == 400) {
      let response = JSON.parse(req.response);

      // Email already exists error
      if (response.err.errno == 1062) {
        passwordSmall.style.display = "block";
        passwordSmall.style.visibility = "visible";
        passwordSmall.innerText = "L'adresse email existe déjà";
      }
    }
  };
}

// EVENT LISTENERS
// Check Inputs when form is submitted
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([firstName, lastName]);
  checkLength(firstName, 3, 30);
  checkLength(lastName, 3, 30);
  checkLength(email, 3, 40);
  checkEmail(email);
  checkPassword(password);

  checkAllFields();
});

// Display info for password

passwordInput.addEventListener("focus", () => {
  passwordSmall.style.display = "none";
  passwordInfo.style.display = "block";
});
