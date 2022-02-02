const sections = document.querySelectorAll("section");
// convert from nodelist to array
const sectionsArray = Array.from(sections);
const navbarList = document.getElementById("navbar__list");

function createNavbar() {
  // loop over the section array to create as many navbar items
  // as there are sections
  sectionsArray.forEach(function (section) {
    // select the content of each section's dataset
    // to pass it as content for the navbar items (see last line in loop)
    const navText = section.dataset.nav;
    const navbarItem = document.createElement("li");
    navbarList.appendChild(navbarItem);
    const navbarLink = document.createElement("a");
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
    // event delegation
    // add styling to the clicked navbar item
    // styling lasts until another item is clicked
    // navbarList.addEventListener("click", function (e) {
    //  e.stopPropagation();
    //  if (e.target.id !== "navbar__list") {
    // => to prevent trigger the event when clicked on navbar itself
    //    (next to an actual link)
    //  if (navbarLink.classList.contains("active__link")) {
    //    navbarLink.classList.remove("active__link");
    //    e.target.classList.add("active__link");
    //    } else {
    //    e.target.classList.add("active__link");
    //      }
    //    }
    // });
    // => COMMENTED OUT because this approach does NOT highlight
    // the navbar links as active WHEN SCROLLING (but only when clicked)
  });
}

// when the user scrolls
// the section which is in the viewport
// gets highlighted by adding the active class
// the navbar link gets highlighted too
function highlightSection() {
  // with help from Udacity:
  const navLinks = document.querySelectorAll(".menu__link");
  // class .menu_link has been added to all navbar links
  // inside the loop of the createNavbar function, for styling reasons
  // now we use it to access those links from inside THIS function

  sectionsArray.forEach(function (section, index) {
    let distanceEdge = section.getBoundingClientRect();
    // comparing the position of the section with the
    // distance to the viewport edge
    if (distanceEdge.top <= 150 && distanceEdge.bottom >= 150) {
      section.classList.add("your-active-class");
      navLinks[index].classList.add("active__link");
      // there are as many sections (index=0-5)
      // as there are navLinks, so we can use the section's index number
      // to access the right navLink
    } else {
      section.classList.remove("your-active-class");
      navLinks[index].classList.remove("active__link");
    }
  });
}

window.addEventListener("load", createNavbar);
document.addEventListener("scroll", highlightSection);
