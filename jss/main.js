// this for navigation
document.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("activePage");
  loadPage(savedPage);
});

function loadPage(page) {
  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;
      localStorage.setItem("activePage", page);
    })
    .catch((error) => {
      console.error("Error fetching the page:", error);
      document.getElementById("main-content").innerHTML =
        "<h2>Page not found</h2>";
    });
  //this for display navbar for mobile
  document.querySelectorAll("nav .nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document
    .querySelector(`nav .nav-link[onclick*='${page}']`)
    .classList.add("active");
}
function adjustLayout() {
  const sidebar = document.getElementById("sidebar");
  const mobileNav = document.getElementById("mobile-nav");
  // let main = document.getElementsByClassName("main-large");

  console.log(main.innerHTML);
  if (window.innerWidth < 769) {
    sidebar.classList.remove("d-flex");
    sidebar.style.display = "none";
    mobileNav.classList.remove("d-none");
  
  } else {
    sidebar.classList.add("d-flex");
    sidebar.style.display = "flex";
    mobileNav.classList.add("d-none");
  }
}

window.addEventListener("load", adjustLayout);
window.addEventListener("resize", adjustLayout);

document
  .getElementById("dropdownToggle")
  .addEventListener("click", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const mainContent = document.getElementById("main-content");
    const closeButton = document.getElementById("closeButton");

    if (
      dropdownMenu.style.display === "none" ||
      dropdownMenu.style.display === ""
    ) {
      dropdownMenu.style.display = "block";
      mainContent.style.marginTop = dropdownMenu.offsetHeight + "px";
      closeButton.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
      mainContent.style.marginTop = "0";
      closeButton.style.display = "none";
    }
  });

document.getElementById("closeButton").addEventListener("click", function () {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const mainContent = document.getElementById("main-content");

  dropdownMenu.style.display = "none";
  mainContent.style.marginTop = "0";
  this.style.display = "none";
});

document.addEventListener("click", function (event) {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownToggle = document.getElementById("dropdownToggle");
  const closeButton = document.getElementById("closeButton");
  const listIcon = document.getElementById("dropdownToggle");

  if (
    !dropdownToggle.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.style.display = "none";

    document.getElementById("main-content").style.marginTop = "0";
    closeButton.style.display = "none";
    listIcon.style.display = "block";
  } else {
    listIcon.style.display = "none";
  }
});
