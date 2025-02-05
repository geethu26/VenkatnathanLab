// Example data structure with actual member information
const groupMembers = {
  present: [
    {
      name: "Aparna Shanbhag",
      position: "PhD Student",
      research:
        "Research interests: Improving Li-ion battery lifetimes through molecular dynamics studies of electrolytes",
      email: "aparna.shanbhag@students.iiserpune.ac.in",
      image: "aparna.jpg",
      yearJoined: "2020",
    },
    {
      name: "Shriniwas Iyer",
      position: "PhD Student",
      research:
        "Research interests: Machine learning approaches for materials discovery",
      email: "shriniwas.iyer@students.iiserpune.ac.in",
      image: "shriniwas.jpg",
      yearJoined: "2021",
    },
    // Add more present members here
  ],
  formerPostdocs: [
    {
      name: "Dr. Sourav Mondal",
      research: "Polymer Electrolytes for Li-ion Batteries",
      duration: "2018-2020",
      currentPosition: "Assistant Professor, IIT Indore",
      image: "sourav.jpg",
    },
    // Add more former postdocs here
  ],
  formerPhD: [
    {
      name: "Dr. Anand Kumar",
      thesis: "Studies on Proton Transport in Imidazole based Systems",
      graduationYear: "2019",
      currentPosition: "Scientist, CSIR-NCL Pune",
      image: "anand.jpg",
    },
    // Add more former PhD students here
  ],
  formerBSMS: [
    {
      name: "Aditya Ramanathan",
      project: "Computational studies of ion transport in solid electrolytes",
      year: "2023",
      image: "aditya.jpg",
    },
    // Add more former BS-MS students here
  ],
  visiting: [
    {
      name: "Dr. Rebecca Miller",
      institution: "University of California, Berkeley",
      duration: "Summer 2023",
      image: "rebecca.jpg",
    },
    // Add more visiting researchers here
  ],
};

// Function to create card - now with error handling for images
function createMemberCard(member, type) {
  const card = document.createElement("div");
  card.className = "member-card";

  // Default image if member image is missing
  const imageUrl = member.image || "default-profile.jpg";

  let content = `
        <img src="images/${imageUrl}" alt="${member.name}" class="member-image" onerror="this.src='images/default-profile.jpg'">
        <div class="member-info">
            <div class="member-name">${member.name}</div>
    `;

  switch (type) {
    case "present":
      content += `
                <div class="member-details">${member.position}</div>
                <div class="member-details">${member.research}</div>
                <div class="member-details">Joined: ${member.yearJoined}</div>
                <a href="mailto:${member.email}" class="member-email">${member.email}</a>
            `;
      break;

    case "postdoc":
      content += `
                <div class="member-details">${member.research}</div>
                <div class="member-details">Duration: ${member.duration}</div>
                <div class="member-details">Current: ${member.currentPosition}</div>
            `;
      break;

    case "phd":
      content += `
                <div class="member-details">Thesis: ${member.thesis}</div>
                <div class="member-details">Graduated: ${member.graduationYear}</div>
                <div class="member-details">Current: ${member.currentPosition}</div>
            `;
      break;

    case "bsms":
      content += `
                <div class="member-details">Project: ${member.project}</div>
                <div class="member-details">Year: ${member.year}</div>
            `;
      break;

    case "visiting":
      content += `
                <div class="member-details">From: ${member.institution}</div>
                <div class="member-details">Duration: ${member.duration}</div>
            `;
      break;
  }

  content += "</div>";
  card.innerHTML = content;
  return card;
}

// Function to check if a section is empty
function isSectionEmpty(members) {
  return !members || members.length === 0;
}

// Modified render function with section visibility handling
function renderMembers() {
  console.log("Starting to render members..."); // Debug log

  // Helper function to render a section
  function renderSection(sectionId, members, type) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.log(`Section ${sectionId} not found`); // Debug log
      return;
    }

    if (isSectionEmpty(members)) {
      section.parentElement.style.display = "none";
      return;
    }

    section.parentElement.style.display = "block";
    members.forEach((member) => {
      section.appendChild(createMemberCard(member, type));
    });
  }

  // Render each section
  renderSection("present-members", groupMembers.present, "present");
  renderSection("former-postdocs", groupMembers.formerPostdocs, "postdoc");
  renderSection("former-phd", groupMembers.formerPhD, "phd");
  renderSection("former-bsms", groupMembers.formerBSMS, "bsms");
  renderSection("former-visiting", groupMembers.visiting, "visiting");

  console.log("Finished rendering members"); // Debug log
}

// Make sure DOM is loaded before rendering
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting render..."); // Debug log
  renderMembers();
});
