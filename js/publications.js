function createPublicationCard(pub) {
  const card = document.createElement("div");
  card.className = "publication-card";
  if (!pub.image) {
    card.classList.add("no-image");
  }

  const imageHtml = pub.image
    ? `<div class="publication-image-container">
         <img src="${pub.image}" alt="Publication ${pub.id}" class="publication-image">
       </div>`
    : "";

  card.innerHTML = `
    <div class="publication-content-wrapper">
      <p class="publication-id">#${pub.id}</p>
      <p class="publication-title">${pub.title}</p>
      <a href="${pub.link}" class="publication-link" target="_blank" rel="noopener noreferrer">
        View Publication <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    ${imageHtml}
  `;
  return card;
}

function renderPublications(publications) {
  const publicationsList = document.getElementById("publicationsList");
  publicationsList.innerHTML = "";

  publications
    .sort((a, b) => b.id - a.id)
    .forEach((pub) => {
      publicationsList.appendChild(createPublicationCard(pub));
    });

  setupScrollReveal();
}

fetch("../js/publications.json")
  .then((response) => response.json())
  .then((data) => {
    renderPublications(data.publications);
  })
  .catch((error) => console.error("Error loading publications:", error));

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".publication-card");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });
}
