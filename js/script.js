// function loadHTML(elementId, filePath) {
//     return fetch(filePath)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById(elementId).innerHTML = data;

//             // Run any scripts inside loaded HTML
//             const temp = document.createElement('div');
//             temp.innerHTML = data;
//             temp.querySelectorAll("script").forEach(oldScript => {
//                 const newScript = document.createElement("script");
//                 if (oldScript.src) {
//                     newScript.src = oldScript.src;
//                 } else {
//                     newScript.textContent = oldScript.textContent;
//                 }
//                 document.body.appendChild(newScript);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading HTML:', error);
//             alert('Failed to load: ' + filePath);
//         });
// }

// // Detect if in /services/ folder to adjust paths accordingly
// const isInServicesFolder = window.location.pathname.includes('/services/');

// // Load header and footer dynamically
// Promise.all([
//     loadHTML('header', isInServicesFolder ? '../header.html' : 'header.html'),
//     loadHTML('footer', isInServicesFolder ? '../footer.html' : 'footer.html')
// ]).then(() => {
//     setActiveNavLink();

//     // ✅ Re-initialize lucide icons after header loads
//     if (window.lucide) {
//         lucide.createIcons();
//     }

//     // Optional: re-run any header functions if needed
//     initHeaderFunctions?.();
// });



function loadHTML(elementId, filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Inject HTML
            document.getElementById(elementId).innerHTML = data;

            // ✅ Run any scripts inside the loaded HTML
            const temp = document.createElement("div");
            temp.innerHTML = data;
            temp.querySelectorAll("script").forEach(oldScript => {
                const newScript = document.createElement("script");
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                document.body.appendChild(newScript);
            });
        })
        .catch(error => console.error("Error loading HTML:", error));
}

// ✅ Detect if current page is inside /services/ folder
const isInServicesFolder = window.location.pathname.includes("/services/");
const isInBlogsFolder = window.location.pathname.includes("/posts_blogs/");

// ✅ Load header & footer dynamically
Promise.all([
    loadHTML("header", isInServicesFolder || isInBlogsFolder ? "../header.html" : "header.html"),
    loadHTML("footer", isInServicesFolder || isInBlogsFolder ? "../footer.html" : "footer.html")
]).then(() => {
    // After header loads:
    setActiveNavLink();
    initHeaderFunctions();

    // ✅ Initialize Lucide icons if available
    if (window.lucide) {
        lucide.createIcons();
    }
    const footerYear = document.querySelector("#footer #currentYear");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});

// ✅ Highlight current active nav link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("a[href]");

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("text-primary", "font-bold",);
        } else {

            link.classList.remove("text-primary", "font-bold");
        }
    });
}

// ✅ Initialize dropdowns & mobile toggle for new header
function initHeaderFunctions() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuContainer = document.getElementById("mobile-menu-container");
    const mobileServicesBtn = document.getElementById("mobile-services-button");
    const mobileServicesDropdown = document.getElementById("mobile-services-dropdown");

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && mobileMenuContainer) {
        mobileMenuBtn.addEventListener("click", () => {
            const isVisible = !mobileMenuContainer.classList.contains("hidden");
            mobileMenuContainer.classList.toggle("hidden", isVisible);
        });
    }

    // --- Mobile Services Dropdown Toggle ---
    if (mobileServicesBtn && mobileServicesDropdown) {
        mobileServicesBtn.addEventListener("click", () => {
            const isVisible = mobileServicesDropdown.classList.contains("visible");
            if (isVisible) {
                mobileServicesDropdown.classList.remove("visible", "opacity-100");
                mobileServicesDropdown.classList.add("opacity-0", "invisible");
            } else {
                mobileServicesDropdown.classList.add("visible", "opacity-100");
                mobileServicesDropdown.classList.remove("opacity-0", "invisible");
            }
        });
    }
}
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu-container');
const servicesButton = document.getElementById('mobile-services-button');
const servicesDropdown = document.getElementById('mobile-services-dropdown');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

servicesButton.addEventListener('click', () => {
    const expanded = servicesDropdown.classList.toggle('opacity-100');
    servicesDropdown.classList.toggle('visible');
});
