const email = document.getElementById("email__login");
const password = document.getElementById("email__password");
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

  console.log(loginData);
  postLogin();
}

// POST request function
function postLogin() {
  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/auth/login");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(loginData));

  req.onreadystatechange = (e) => {
    let response = JSON.parse(req.response);
    if (req.status == 400 || req.status == 204 || req.status == 206) {
      console.log(response);
      errorMsg.textContent = response;
      allFormControl.forEach((el) => {
        el.classList.add("error");
      });
    } else if (req.readyState > 3 && req.status == 200) {
      console.log(response);
      localStorage.setItem("Auth", response.accessToken);
      localStorage.setItem("AuthUser", response.userEmail);
      allFormControl.forEach((el) => {
        el.classList.add("success");
      });
      var authHeaders = new Headers();
      authHeaders.set(
        "Authorization",
        `BEARER ${localStorage.getItem("Auth")} `
      );
      window.location.href = "/feed";
    }
  };
}

// Event Listener
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitLogin();
});
