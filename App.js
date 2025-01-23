const spinner = document.getElementById("spinner");
const table = document.getElementById("data-table");
const tableBody = document.getElementById("table-body");
const pagin = document.getElementById("pagin");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNum = document.getElementById("page-num");

let data = [];
let sortedData = [];
let currentPage = 1;
const rowPrePage = 10;
let sortDir = {};

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
    data = await res.json();
    data = data.results;
    sortedData = [...data];
    displayTable(sortedData);
    updateBtn();
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
  const start = (currentPage - 1) * rowPrePage;
  const end = start + rowPrePage;
  const paginItems = dt.slice(start, end);

  paginItems.forEach((user) => {
    const row = `<tr>
            <td data-lable="Name">${user.name.first} ${user.name.last}</td>
            <td data-lable="Email">${user.email}</td>
            <td data-lable="Username">${user.login.username}</td>
            <td data-lable="Country">${user.location.country}</td>
          </tr> `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// sort table by column
function sortTable(col) {
  clearSortIcon();
  if (!sortDir[col]) {
    sortDir[col] = "asc";
  }
  sortedData = [...data].sort((a, b) => {
    let val, val2;
    switch (col) {
      case 0:
        val = `${a.name.first} ${a.name.last}`;
        val2 = `${b.name.first} ${b.name.last}`;
        break;
      case 1:
        val = a.email;
        val2 = b.email;
        break;
      case 2:
        val = a.login.username;
        val2 = b.login.username;
        break;
      case 3:
        val = a.location.country;
        val2 = b.location.country;
        break;
    }
    if (sortDir[col] === "desc") {
      return val2.localeCompare(val);
    } else {
      return val.localeCompare(val2);
    }
  });
  sortDir[col] = sortDir[col] === "asc" ? "desc" : "asc";
  updateSortIcon(col, sortDir[col]);
  displayTable(sortedData);
}

// clear sort icons

function clearSortIcon() {
  for (let i = 0; i < 4; i++) {
    const icon = document.getElementById(`icon-${i}`);
    icon.className = "fas fa-sort";
  }
}

// update sort icon

function updateSortIcon(col, dir) {
  const icon = document.getElementById(`icon-${col}`);
  icon.className = dir === "desc" ? "fas fa-sort-down" : "fas fa-sort-up";
}
// Previous Page

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayTable(sortedData);
    updateBtn();
  }
}

// Next Page

function nextPage() {
  if (currentPage * rowPrePage < sortedData.length) {
    currentPage++;

    displayTable(sortedData);
    updateBtn();
  }
}

// update pagin buttons

function updateBtn() {
  pageNum.innerHTML = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * rowPrePage >= sortedData.length;
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
