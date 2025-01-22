const spinner = document.getElementById("spinner");
const table = document.getElementById("data-table");
const tableBody = document.getElementById("table-body");
const pagin = document.getElementById("pagin");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNum = document.getElementById("page-num");

let data = [];

// Fetch data from API

async function fetchData() {
  spinner.style.display = "flex";
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const res = await fetch("https://randomuser.me/api/?results=50");
    let data = await res.json();
    data = data.results;
    displayTable(data);
  } catch (error) {
    console.log(error);
  } finally {
    table.style.display = "table";
    spinner.style.display = "none";
    pagin.style.display = "block";
  }
}

fetchData();

function displayTable(dt) {
  tableBody.innerText = "";
  dt.forEach((user) => {
    const row = `<tr>
            <td data-lable="Name">${user.name.first} ${user.name.last}</td>
            <td data-lable="Email">${user.email}</td>
            <td data-lable="Username">${user.login.username}</td>
            <td data-lable="Country">${user.location.country}</td>
          </tr> `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Dark mode //

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// check if dark mode is preferred
const isDarkMode = localStorage.getItem("dark-mode") === "true";

// set initial mode
if (isDarkMode) {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = "Light Mode";
}

// toggle dark mode

themeToggle.addEventListener("click", () => {
  body.style.transition = "background-color .5s , color .5s";

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    themeToggle.innerHTML = "Dark Mode";
    localStorage.setItem("dark-mode", "false");
  } else {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = "Light Mode";
    localStorage.setItem("dark-mode", "true");
  }
});
