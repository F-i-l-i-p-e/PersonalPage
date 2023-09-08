// DOM fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Home click listener
    document.querySelector('.nav-link[href="#Home"]').addEventListener('click', fetchProjects);
    // About click listener
    document.querySelector('.nav-link[href="#About"]').addEventListener('click', showAbout);
  
    // Fetch projects initially
    fetchProjects();
});

// Fetch projects
function fetchProjects() {
    const url = 'https://raw.githubusercontent.com/F-i-l-i-p-e/PlantAPI/main/projects.json?' + new Date().getTime();
  
    fetch(url)
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            container.classList.remove('about-mode'); // Remove class
            container.innerHTML = ''; // Clear content
  
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.name}">
                <h4>${project.name}</h4>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Tech Stack:</strong> ${project.techStack}</p>
                <a href="${project.button.link}" target="_blank">${project.button.label}</a>
                `;
                container.appendChild(projectCard);
  
                // Image click listener
                projectCard.querySelector('img').addEventListener('click', function() {
                    showImage(project.image);
                });
            });
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

// Show About
function showAbout() {
    const container = document.getElementById('projects-container');
    container.classList.add('about-mode'); // Add class
    const aboutContent = `
    <div class="about-content">
        <h2>Welcome to Project Showcase</h2>
        <p>Discover the unique characteristics and technology stacks of various projects. Let the beauty of code inspire you!</p>
    </div>
    `;
    container.innerHTML = aboutContent;
}

// Function to click and open image
function showImage(imageSrc) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<img src="${imageSrc}" class="enlarged-image" alt="Enlarged Image">`;
    document.body.appendChild(overlay);
  
    // Click to hide image
    overlay.addEventListener('click', hideImage);
    
    // Esc to hide image
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideImage();
    });
}

function hideImage() {
    const overlay = document.querySelector('.overlay');
    if (overlay) document.body.removeChild(overlay); // Remove overlay
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
});
