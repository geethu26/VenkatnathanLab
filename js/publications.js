function createPublicationCard(pub, index) {
  const card = document.createElement("div");
  card.className = "publication-card";
  card.style.animationDelay = `${index * 0.1}s`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "publication-content";

  contentDiv.innerHTML = `
    <div class="publication-number">#${pub.id}</div>
    <div class="publication-title ">${pub.title} <p class="publication-source">${pub.source}</p></div>
    
    <a href="${pub.link}" class="publication-link" target="_blank">
      View Here 
      <i class="fas fa-arrow-right"></i>
    </a>
  `;

  card.appendChild(contentDiv);

  if (pub.image) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "publication-image-container";
    imageContainer.innerHTML = `
      <img src="${pub.image}" alt="Publication ${pub.id}" class="publication-image">
    `;
    card.appendChild(imageContainer);
  } else {
    card.classList.add("no-image");
    contentDiv.style.width = "100%";
  }

  return card;
}

function renderPublications(publications) {
  const publicationsList = document.getElementById("publicationsList");
  publicationsList.innerHTML = "";

  publications
    .sort((a, b) => b.id - a.id)
    .forEach((pub, index) => {
      publicationsList.appendChild(createPublicationCard(pub, index));
    });
}

// Load publications data
fetch("../js/pub.json")
  .then((response) => response.json())
  .then((data) => {
    renderPublications(data.publications);
  })
  .catch((error) => console.error("Error loading publications:", error));

// For hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !hamburger.contains(e.target) &&
    !navLinks.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Close menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
