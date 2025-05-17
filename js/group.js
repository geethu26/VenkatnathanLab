function createMemberItem(member) {
  return `
    <div class="member-item">
      <img src="${member.image}" alt="${
    member.name
  }" class="member-image" onerror="this.src='../images/default-profile.jpg'">
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <div class="member-details">
          ${member.role ? `<p><strong>Role:</strong> ${member.role}</p>` : ""}
          ${
            member.currentPosition
              ? `<p><strong>Current Position:</strong> ${member.currentPosition}</p>`
              : ""
          }
          ${
            member.researchTopic
              ? `<p><strong>Research Topic:</strong> ${member.researchTopic}</p>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
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
      .map((member) => createMemberItem(member))
      .join("");

    // Separate PhD students from postdoctoral researchers
    const phdStudents = data.alumni.postdoctoralResearchers.filter(
      (member) =>
        member.role.includes("Ph.D. Student") ||
        member.role.includes("Research Associate")
    );
    const postDocs = data.alumni.postdoctoralResearchers.filter(
      (member) =>
        !member.role.includes("Ph.D. Student") &&
        !member.role.includes("Research Associate")
    );

    // Render alumni sections
    const alumniSections = {
      "postdoctoral-researchers": postDocs,
      "phd-students": phdStudents,
      "graduate-students": data.alumni.graduateStudents,
      "visiting-students": data.alumni.visitingStudents,
      "project-students": Array.isArray(data.alumni.projectStudents)
        ? data.alumni.projectStudents
        : [data.alumni.projectStudents],
    };

    Object.entries(alumniSections).forEach(([sectionId, members]) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement && members) {
        sectionElement.innerHTML = members
          .map((member) => createMemberItem(member))
          .join("");
      }
    });
  } catch (error) {
    console.error("Error loading members data:", error);
    document.getElementById("current-members").innerHTML =
      '<p class="error">Error loading current members data</p>';

    const alumniSections = [
      "postdoctoral-researchers",
      "phd-students",
      "graduate-students",
      "visiting-students",
      "project-students",
    ];

    alumniSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.innerHTML = '<p class="error">Error loading alumni data</p>';
      }
    });
  }
}

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
