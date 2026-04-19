// ===========================
// Navigation Menu Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// ===========================
// Smooth Scroll Enhancement
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .highlight-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ===========================
// Add Scroll Animation Classes
// ===========================
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-category, .highlight-card, .contact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.animate-in, 
    .skill-category.animate-in, 
    .highlight-card.animate-in,
    .contact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===========================
// Active Navigation Link Highlighting
// ===========================
function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add CSS for active link
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

highlightActiveLink();

// ===========================
// Dynamic Content Loader Helper
// ===========================
// Function to add new project cards dynamically
window.addProject = function(title, description, tags, projectLink, githubLink) {
    const projectsGrid = document.querySelector('.projects-grid');
    const newCard = document.createElement('div');
    newCard.className = 'project-card animate-in';
    
    const tagHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    newCard.innerHTML = `
        <div class="project-header">
            <h3>${title}</h3>
            <div class="project-tags">
                ${tagHTML}
            </div>
        </div>
        <p class="project-description">${description}</p>
        <div class="project-links">
            <a href="${projectLink}" class="project-link">View Project</a>
            <a href="${githubLink}" class="project-link secondary">GitHub</a>
        </div>
    `;
    
    projectsGrid.appendChild(newCard);
};

// Function to add new skills
window.addSkill = function(category, skills) {
    const skillsGrid = document.querySelector('.skills-grid');
    
    // Check if category exists, if not create it
    let categoryEl = Array.from(skillsGrid.querySelectorAll('.skill-category')).find(el => 
        el.querySelector('h3').textContent === category
    );
    
    if (!categoryEl) {
        categoryEl = document.createElement('div');
        categoryEl.className = 'skill-category';
        categoryEl.innerHTML = `
            <h3>${category}</h3>
            <div class="skill-list"></div>
        `;
        skillsGrid.appendChild(categoryEl);
    }
    
    const skillList = categoryEl.querySelector('.skill-list');
    skills.forEach(skill => {
        const skillBadge = document.createElement('span');
        skillBadge.className = 'skill-badge';
        skillBadge.textContent = skill;
        skillList.appendChild(skillBadge);
    });
};

// Example usage (uncomment to use):
// window.addProject('My New Project', 'Description here', ['Tech', 'Data'], '#', 'https://github.com');
// window.addSkill('New Category', ['Skill1', 'Skill2', 'Skill3']);

console.log('Portfolio loaded successfully!');
console.log('Use window.addProject() and window.addSkill() to add content dynamically');
