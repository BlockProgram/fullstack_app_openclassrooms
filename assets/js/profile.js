const firstName = document.getElementById("first__name");
const lastName = document.getElementById("last__name");
const department = document.getElementById("department");
const email = document.getElementById("email");
const password = document.getElementById("password");
const modifyBtn = document.querySelector(".modifyprofile-btn");
const logoutBtn = document.querySelector(".logout-btn");
const eraseBtn = document.querySelector(".erase-btn");

// Get data from Database
function getData() {
  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/api/auth/profile");
  req.setRequestHeader("Content-Type", "application/json");
  req.send();

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200 && req.response !== "") {
      displayProfile(JSON.parse(req.response)[0]);
    } else if (req.readyState > 3 && req.status == 401) {
      window.location.href = "/";
    }
  };
}

getData();

// Display Profile data onpage
function displayProfile(input) {
  firstName.value = input.prenom;
  lastName.value = input.nom;
  department.value = input.departement;
  email.value = input.email;
}

// MODIFY PROFILE
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
let modifiedData = {};

function formatRequestData() {
  inputsData.forEach((input) => {
    modifiedData[input.id] = input.value;
  });

  console.log(modifiedData);
  postData();
}

// POST Modify request function
function postData() {
  let req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:3000/api/auth/profile");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(modifiedData));

  req.onreadystatechange = (e) => {
    if (req.readyState > 3 && req.status == 200) {
      window.location.reload();
    }
  };
}

// LOGOUT Profile
function logOutProfile() {
  let req = new XMLHttpRequest();
  req.open("DELETE", "http://localhost:3000/api/auth/profile/logout");
  req.send();

  req.onreadystatechange = (e) => {
    window.location.href = "/";
  };
}

// DELETE Profile
function deleteProfile() {
  let req = new XMLHttpRequest();
  req.open("DELETE", "http://localhost:3000/api/auth/profile");
  req.setRequestHeader("Content-Type", "application/json");
  req.send();

  req.onreadystatechange = (e) => {
    window.location.href = "/";
  };
}

// EVENT LISTENERS
// Check Inputs when form is submitted
modifyBtn.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([firstName, lastName, password]);
  checkLength(firstName, 3, 30);
  checkLength(lastName, 3, 30);
  checkLength(email, 3, 40);
  checkEmail(email);
  checkPassword(password);

  checkAllFields();
});

logoutBtn.addEventListener("click", () => {
  logOutProfile();
});

eraseBtn.addEventListener("click", () => {
  deleteProfile();
});
