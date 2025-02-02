function createPublicationCard(pub) {
  const card = document.createElement("div");
  card.className = "publication-card";

  // Create content container
  const contentDiv = document.createElement("div");
  contentDiv.className = "publication-content";

  // Add publication number and title to content container
  contentDiv.innerHTML = `
      <div class="publication-number">#${pub.id}</div>
      <div class="publication-title">${pub.title}</div>
      <a href="${pub.link}" class="publication-link" target="_blank">
        View Here 
        <i class="fas fa-arrow-right"></i>
      </a>
    `;

  // Add content container to card
  card.appendChild(contentDiv);

  // Only create image container if image exists
  if (pub.image) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "publication-image-container";
    imageContainer.innerHTML = `
        <img src="${pub.image}" alt="Publication ${pub.id}" class="publication-image">
      `;
    card.appendChild(imageContainer);
  } else {
    // If no image, add a class to the card for full-width content
    card.classList.add("no-image");
    contentDiv.style.width = "100%";
  }

  return card;
}

function renderPublications(publications) {
  const publicationsList = document.getElementById("publicationsList");
  publicationsList.innerHTML = "";

  publications
    .sort((a, b) => b.id - a.id) // Sort by ID in descending order
    .forEach((pub) => {
      publicationsList.appendChild(createPublicationCard(pub));
    });
}

// Load publications data
fetch("../js/publications.json")
  .then((response) => response.json())
  .then((data) => {
    renderPublications(data.publications);
  })
  .catch((error) => console.error("Error loading publications:", error));
