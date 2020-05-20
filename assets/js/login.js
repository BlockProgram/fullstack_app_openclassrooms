const email = document.getElementById("email__login");
const password = document.getElementById("password__login");
const inputsData = document.querySelectorAll(".input-data");
const allFormControl = document.querySelectorAll(".form-control");
const errorMsg = document.querySelector(".login__error small");
const loginBtn = document.querySelector(".login__btn");

// Format data before POST Request
let loginData = {};

function submitLogin() {
  inputsData.forEach((input) => {
    loginData[input.id] = input.value;
  });

  postLogin();
}

// POST request function
function postLogin() {
  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/auth/login");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(loginData));

  req.onreadystatechange = (e) => {
    if (
      (req.readyState > 3 && req.status == 400) ||
      (req.readyState > 3 && req.status == 204) ||
      (req.readyState > 3 && req.status == 206)
    ) {
      allFormControl.forEach((el) => {
        el.classList.add("error");
      });
      let response = JSON.parse(req.response);
      errorMsg.textContent = response;
    } else if (req.readyState > 3 && req.status == 200) {
      allFormControl.forEach((el) => {
        el.classList.remove("error");
        el.classList.add("success");
        let accessToken = JSON.parse(req.response).accessToken;

        let req2 = new XMLHttpRequest();
        req2.open("GET", "http://localhost:3000/feed");
        req2.setRequestHeader("Authorization", `BEARER ${accessToken}`);
        req2.send();
      });
    }
  };
}

// Event Listener
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitLogin();
});
