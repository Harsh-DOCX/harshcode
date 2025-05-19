let body = document.body;
let changeTheme = document.getElementById("changeTheme");
let skillElement = document.getElementById("skillcase");
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

let skills = [
    'HTML',
    'CSS',
    'JAVASCRIPT',
    'REACT',
    'DSA',
    'C Programming',
    'PYTHON'
]

hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Optional: Close the menu when a link is clicked
    document.querySelectorAll('.feature a').forEach(link =>
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        })
    );

let skillIndex = 0;
let charIndex = 0;

function typeSkill() {
    if (charIndex < skills[skillIndex].length) {
        skillElement.textContent += skills[skillIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeSkill, 150); 
    } else {
        setTimeout(eraseSkill, 1500); 
    }
}

function eraseSkill() {
    if (charIndex > 0) {
        skillElement.textContent = skills[skillIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseSkill, 100); // erase speed
    } else {
        skillIndex = (skillIndex + 1) % skills.length;
        setTimeout(typeSkill, 300); // wait before typing next
    }
}

// Save theme to localStorage
let saveTheme = () => {
    const currentTheme = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
};


let toggleTheme = () => {
    body.classList.toggle("light");
    if (body.classList.contains("light")) {
        changeTheme.classList.remove("fa-sun");
        changeTheme.classList.add("fa-moon");
    } else {
        changeTheme.classList.remove("fa-moon");
        changeTheme.classList.add("fa-sun");
    }
    saveTheme()
};


// Load saved theme on page load
let loadTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    }
};

changeTheme.addEventListener("click", toggleTheme);

document.addEventListener("DOMContentLoaded", ()=>{
    loadTheme();
    typeSkill();
});

window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.blur-on-scroll');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
});
