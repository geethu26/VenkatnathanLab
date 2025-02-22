function createMemberCard(member) {
  return `
    <div class="member-card" data-member='${JSON.stringify(member)}'>
      <img src="${member.image}" alt="${member.name}" class="member-image">
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role || ""}</p>
      </div>
    </div>
  `;
}

function createModalContent(member) {
  const details = [
    { label: "Role", value: member.role },
    { label: "Info", value: member.info },
    { label: "Research Topic", value: member.researchTopic },
    { label: "Email", value: member.email },
    { label: "Education", value: member.education },
    { label: "Experience", value: member.experience },
    { label: "Current Position", value: member.currentPosition },
  ];

  return details
    .filter((detail) => detail.value)
    .map((detail) => `<p><strong>${detail.label}:</strong> ${detail.value}</p>`)
    .join("");
}

function initializeModal() {
  const modal = document.getElementById("memberModal");
  const closeButton = modal.querySelector(".close-button");
  const modalImage = modal.querySelector(".modal-image");
  const modalName = modal.querySelector(".modal-name");
  const modalDetails = modal.querySelector(".modal-details");

  // Close modal when clicking the close button or outside the modal
  closeButton.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Add click handlers to all member cards
  document.querySelectorAll(".member-card").forEach((card) => {
    card.addEventListener("click", () => {
      const member = JSON.parse(card.dataset.member);
      modalImage.src = member.image;
      modalImage.alt = member.name;
      modalName.textContent = member.name;
      modalDetails.innerHTML = createModalContent(member);
      modal.style.display = "block";
    });
  });
}

async function loadMembersData() {
  try {
    const response = await fetch("../js/groupMembers.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Render current members
    document.getElementById("current-members").innerHTML = data.currentMembers
      .map((member) => createMemberCard(member))
      .join("");

    // Render alumni sections
    const alumniSections = {
      "graduate-students": data.alumni.graduateStudents,
      "undergraduate-students": data.alumni.undergraduateStudents,
      "postdoctoral-researchers": data.alumni.postdoctoralResearchers,
      "visiting-students": data.alumni.visitingStudents,
    };

    Object.entries(alumniSections).forEach(([sectionId, members]) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement && members) {
        sectionElement.innerHTML = members
          .map((member) => createMemberCard(member))
          .join("");
      }
    });

    // Initialize modal functionality after rendering all members
    initializeModal();
  } catch (error) {
    console.error("Error loading members data:", error);
    document.getElementById("current-members").innerHTML =
      '<p class="error">Error loading current members data</p>';

    const alumniSections = [
      "graduate-students",
      "undergraduate-students",
      "postdoctoral-researchers",
      "visiting-students",
    ];

    alumniSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.innerHTML = '<p class="error">Error loading alumni data</p>';
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMembersData();
  initializeNavigation();
});

// Hamburger menu functionality
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadMembersData();
  initializeNavigation();
});
