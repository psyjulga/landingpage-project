let sections = document.querySelectorAll("section");
let sectionsArray = Array.from(sections);
let navbarList = document.getElementById("navbar__list");

function createNavbar() {
  // loop over the section array to create as many navbar items
  // as there are sections
  sectionsArray.forEach(function (section) {
    // select the content of each section's dataset
    // to pass it as content for the navbar items (see last line in loop)
    let navText = section.dataset.nav;
    let navbarItem = document.createElement("li");
    navbarList.appendChild(navbarItem);
    let navbarLink = document.createElement("a");
    // add click event listeners to the created links
    // so that the targeted section will smoothly scroll into view
    navbarLink.addEventListener("click", function (e) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    });
    // and append the links as children to the list items
    navbarItem.appendChild(navbarLink);
    // add the classlist for styling
    navbarLink.classList.add("menu__link");
    navbarLink.innerHTML = navText;
  });
}

// when the user scrolls
// the section which is in the viewport
// gets highlighted by adding the active class
function highlightSection() {
  sectionsArray.forEach(function (section) {
    let distanceEdge = section.getBoundingClientRect();
    // comparing the position of the section with the
    // distance to the viewport edge
    if (distanceEdge.top <= 150 && distanceEdge.bottom >= 150) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  });
}

window.addEventListener("load", createNavbar);
document.addEventListener("scroll", highlightSection);
