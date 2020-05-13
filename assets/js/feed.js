const shareBtn = document.querySelectorAll(".gif__share");
const shareDropDown = document.querySelector(".gif__dropdown");
const closeDropDownBtn = document.querySelectorAll(".dropdown--closebtn");

// Event Listeners
shareBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.nextElementSibling.classList.toggle("active");
    e.preventDefault();
  });
});

closeDropDownBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.parentElement.classList.remove("active");
    e.preventDefault();
  });
});
