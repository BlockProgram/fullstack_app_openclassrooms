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
    if (
      (req.readyState > 3 && req.status == 400) ||
      (req.readyState > 3 && req.status == 204) ||
      (req.readyState > 3 && req.status == 206)
    ) {
      errorMsg.textContent = req.response;
      allFormControl.forEach((el) => {
        el.classList.add("error");
      });
    } else if (req.readyState > 3 && req.status == 200) {
      allFormControl.forEach((el) => {
        el.classList.add("success");
      });
      let response = JSON.parse(req.response);
      console.log(response);
      localStorage.setItem("Auth", response.accessToken);
      localStorage.setItem("AuthUser", response.userId);

      window.location.href = "/feed";
    }
  };
}

// Event Listener
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  submitLogin();
});
