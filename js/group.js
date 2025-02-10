function createMemberCard(member) {
  // Helper function to render field if it exists
  const renderField = (field, prefix = "", suffix = "") => {
    return field ? `${prefix}${field}${suffix}` : "";
  };

  return `
    <div class="member-card">
        ${renderField(
          member.image,
          `<img src="`,
          `" alt="${member.name || "Member"}" class="member-image">`
        )}
        <div class="member-info">
            ${renderField(member.name, '<h3 class="member-name">', "</h3>")}
            <p class="member-details">
                ${renderField(member.info)}
                ${renderField(member.email, "<br>")}
                ${renderField(member.education, "<br>")}
            </p>
        </div>
    </div>
  `;
}

// Fetch and render members data
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

    // Render alumni
    document.getElementById("alumni").innerHTML = data.alumni
      .map((member) => createMemberCard(member))
      .join("");
  } catch (error) {
    console.error("Error loading members data:", error);
    document.getElementById("current-members").innerHTML =
      '<p class="error">Error loading current members data</p>';
    document.getElementById("alumni").innerHTML =
      '<p class="error">Error loading alumni data</p>';
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
