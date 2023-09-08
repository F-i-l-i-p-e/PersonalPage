document.addEventListener('DOMContentLoaded', function () {
    // Fetch projects initially
    fetchProjects();

    // Event listener for scroll effect on navbar
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Event listener for click effect on navbar toggler
    $('.navbar-toggler').click(function () {
        if ($('.navbar').hasClass('scrolled')) {
            $('.navbar').removeClass('scrolled');
        } else {
            $('.navbar').addClass('scrolled');
        }
    });
});

// Fetch projects
function fetchProjects() {
    const url = 'https://raw.githubusercontent.com/F-i-l-i-p-e/PersonalPage/main/projects.json?' + new Date().getTime();
  
    fetch(url)
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            container.innerHTML = ''; // Clear content
  
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card d-flex flex-column';
                projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.name}">
                <h4>${project.name}</h4>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Tech Stack:</strong> ${project.techStack}</p>
                <div class="mt-auto">
                    <a href="${project.button.link}" class="btn btn-primary btn-custom" target="_blank">${project.button.label}</a>
                </div>
                `;
                container.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}
