function createPublicationCard(pub, index) {
  const card = document.createElement("div");
  card.className = "publication-card";
  card.style.animationDelay = `${index * 0.1}s`;

  let html = `
    <div class="publication-number">#${pub.id}</div>
    <div class="publication-title">${pub.title}</div>
    <div class="publication-source">${pub.source}</div>
    <a href="${pub.link}" class="publication-link" target="_blank">
      View Here
      <i class="fas fa-arrow-right"></i>
    </a>
  `;

  if (pub.image) {
    html += `
      <div class="publication-image-container">
        <img src="${pub.image}" alt="Publication ${pub.id}" class="publication-image">
      </div>
    `;
  }

  card.innerHTML = html;
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
