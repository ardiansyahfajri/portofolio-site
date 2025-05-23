document.addEventListener("DOMContentLoaded", function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const icon = themeToggle.querySelector("i");

    // Check for saved theme preference of prefer-color-scheme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#000000");
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", function() {
        html.classList.toggle("dark");

        // Update the icon
        if (html.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#000000");
        }else{
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#0070f3");

        }
    });

    // Mobile navigation toggle
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener("click", function() {
            mobileMenu.classList.remove("translate-x-full");
            document.body.classList.add("overflow-hidden");
        });
        closeMenu.addEventListener("click", function() {
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenu.classList.add("translate-x-full");
                document.body.classList.remove("overflow-hidden");
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e)  {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // Here you would typically send the form data to a server

            // For demonstration, we'll just log it to the console
            console.log("Form submitted:", {
                name: name,
                email: email,
                message: message
            });

            // Shwow success message
            const button = contactForm.querySelector("button[type='submit']");
            const originalText = button.textContent;
            button.textContent = "Message sent!";
            button.classList.add("bg-green-500");

            // Reset the form
            contactForm.reset();

            // Restore button text after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }

    // Add scroll events for header shadow and reveal animations
    const header = document.querySelector("header");
    const section = document.querySelectorAll("section");

    function checkSroll() {
        // Header shadow
        if (window.scrollY > 0) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }

        // Reveal animations for sections
        section.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("opacity-100", "translate-y-0");
                section.classList.remove("opacity-0", "translate-y-4");
            }
        });
    }

    window.addEventListener("scroll", checkSroll);
    // Run on page load
    checkSroll();

    // Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-4");
                // Stop observing the target once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terminal animation
    const terminalContainer = document.getElementById("terminal-container");
    const terminalContent = document.querySelector(".terminal-content");
    const commandSpan = document.querySelector(".command-text");

    if (terminalContainer && terminalContent && commandSpan) {
        const commandTexts = ["Welcome to my portfolio!", "Hello World!"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        // Create or get blinking cursor
        let cursor = terminalContent.querySelector(".typing-cursor");
        if (!cursor) {
            cursor = document.createElement("span");
            cursor.className = 'typing-cursor inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
            terminalContent.appendChild(cursor);
        }

        const type = () => {
            const currentText = commandTexts[textIndex];

            if (!isDeleting) {
                commandSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); // pause before deleting
                    return;
                }
            } else {
                commandSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % commandTexts.length;
                }
            }
            setTimeout(type, isDeleting ? 50 : 50);
        };

        setTimeout(type, 1000); // initial delay
    }
});