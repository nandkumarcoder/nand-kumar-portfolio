/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC - NAND KUMAR
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initTypingEffect();
    initNavbarScroll();
    initProjectFilters();
    initContactForm();
    initChatbot();
});

/* ==========================================================================
   1. PARTICLE SYSTEM BACKGROUND
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 120;
    
    // Set Canvas Size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Boundary Collisions
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    function init() {
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }
    init();

    // Draw lines connecting particles
    function connect() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(187, 105, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. HERO TYPING ANIMATION
   ========================================================================== */
function initTypingEffect() {
    const typedTextEl = document.getElementById("typed-text");
    if (!typedTextEl) return;

    const phrases = [
        "AI Developer.",
        "Data Scientist.",
        "Django Developer.",
        "Zoho Specialist.",
        "Problem Solver."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        // Adjust color depending on phrase content for rich styling
        if (phraseIndex === 0) typedTextEl.style.color = "var(--accent-ai)";
        else if (phraseIndex === 1) typedTextEl.style.color = "var(--accent-ds)";
        else if (phraseIndex === 2) typedTextEl.style.color = "var(--accent-web)";
        else if (phraseIndex === 3) typedTextEl.style.color = "var(--accent-zoho)";

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Wait before starting deletion
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start effect
    setTimeout(type, 1000);
}

/* ==========================================================================
   3. NAVIGATION & SCROLL ACTIVE SPY
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.getElementById("nav-links");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Scrolled header background
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active Spy Link
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Mobile Menu Toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("open");
            const icon = menuToggle.querySelector("i");
            if (navLinksContainer.classList.contains("open")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Close menu on click of navlinks (mobile)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("open");
                menuToggle.querySelector("i").className = "fa-solid fa-bars";
            });
        });
    }
}

/* ==========================================================================
   4. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filtersContainer = document.getElementById("project-filters-container");
    if (!filtersContainer) return;
    const filterButtons = filtersContainer.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Set active class
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    card.style.animation = "fade-in-up 0.4s forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   5. CONTACT FORM MOCK SUBMISSION
   ========================================================================== */
function initContactForm() {
    // The form submits naturally to FormSubmit.co via standard HTML POST.
}

/* ==========================================================================
   6. INTERACTIVE PORTFOLIO ASSISTANT (LEFT-SIDE POPUP)
   ========================================================================== */
function initChatbot() {
    const chatContainer = document.getElementById("chatbot-container");
    const chatToggle = document.getElementById("chatbot-toggle");
    const chatClose = document.getElementById("chat-close");
    const chatMessagesBox = document.getElementById("chat-messages-box");
    const chatForm = document.getElementById("chat-input-form");
    const chatInput = document.getElementById("chat-input-field");
    const chipsContainer = document.getElementById("chat-chips");

    if (!chatContainer || !chatToggle || !chatClose) return;

    // Toggle Chat Window
    chatToggle.addEventListener("click", () => {
        chatContainer.classList.toggle("active");
        if (chatContainer.classList.contains("active")) {
            chatInput.focus();
            scrollToBottom();
        }
    });

    chatClose.addEventListener("click", () => {
        chatContainer.classList.remove("active");
    });

    // Close when clicking outside on desktop
    document.addEventListener("click", (e) => {
        if (!chatContainer.contains(e.target) && chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
        }
    });

    // Scroll to bottom
    function scrollToBottom() {
        chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    }

    // Dialog Flow Responses mapping
    const botDatabase = {
        zoho: `I specialize in the Zoho Ecosystem! I build custom databases in <strong>Zoho Creator</strong>, customize <strong>Zoho CRM</strong>, develop automation scripts using <strong>Deluge Script</strong>, and integrate platforms using webhooks & Zoho Flow. Let me know if you need to automate a specific business workflow!`,
        django: `For backend and web development, I rely heavily on <strong>Django (Python)</strong>. I create fast, secure REST APIs with Django Rest Framework (DRF), handle MVC routing, integrate databases (PostgreSQL, SQLite), and manage token-based authorizations.`,
        ai: `In Artificial Intelligence & Machine Learning, I design models for predictive modeling (like LSTM neural nets for demand forecasting), Natural Language Processing (sentiment analysis), and image classification. I use <strong>TensorFlow, Keras, NLTK, and Scikit-Learn</strong>.`,
        data: `In Data Science, I analyze raw data, construct visualizations, and deliver actionable insights. My workflow utilizes <strong>Python, SQL, Pandas, NumPy, and Matplotlib</strong> to extract, clean, and model complex datasets.`,
        location: `I am proudly based in the industrial and historical city of <strong>Kanpur, Uttar Pradesh, India</strong>. I work both locally and remotely on worldwide projects!`,
        kanpur: `Yes, I am located in <strong>Kanpur</strong>, Uttar Pradesh! I live and work here, coding solutions for global clients.`,
        contact: `You can reach me directly via email at <a href="mailto:nandkumarcoder@gmail.com" class="chat-link">nandkumarcoder@gmail.com</a>. You can also send a message using the Contact Form on the page.`,
        email: `My professional email is <a href="mailto:nandkumarcoder@gmail.com" class="chat-link">nandkumarcoder@gmail.com</a>. Feel free to shoot me an email regarding contracts or project ideas!`,
        github: `You can check out my complete open-source repositories and code history on GitHub here: <a href="https://github.com/nandkumarcoder" target="_blank" rel="noopener" class="chat-link">github.com/nandkumarcoder</a>.`,
        linkedin: `You can connect with me on LinkedIn here: <a href="https://www.linkedin.com/in/nand-kumar-943jf/" target="_blank" rel="noopener" class="chat-link">linkedin.com/in/nand-kumar-943jf</a>.`,
        skills: `My professional skills are divided into:<br>• <strong>AI & Data Science</strong>: TensorFlow, NLP, Pandas, ML/DL<br>• <strong>Web Development</strong>: Django (Python), HTML, CSS, JavaScript<br>• <strong>Zoho Automation</strong>: Creator, CRM, Deluge Scripting, Flows<br>• <strong>Languages</strong>: Python, Deluge, SQL, JavaScript, C++`
    };

    // Chatbot response simulation (Typing effect)
    function simulateBotResponse(text) {
        // Create typing indicator element
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "message bot-message typing-indicator-msg";
        typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
        chatMessagesBox.insertBefore(typingIndicator, chipsContainer);
        scrollToBottom();

        // Simulate thinking delay
        setTimeout(() => {
            typingIndicator.remove();
            
            const messageEl = document.createElement("div");
            messageEl.className = "message bot-message";
            chatMessagesBox.insertBefore(messageEl, chipsContainer);
            
            // Since responses have HTML links, we inject as innerHTML but render it progressively
            // For safety and compatibility, we write HTML directly but add a subtle fade-in class
            messageEl.innerHTML = text;
            scrollToBottom();
        }, 800 + Math.random() * 700);
    }

    // Process user input
    function handleUserQuery(query) {
        if (!query.trim()) return;

        // Render user message
        const userMsgEl = document.createElement("div");
        userMsgEl.className = "message user-message";
        userMsgEl.textContent = query;
        chatMessagesBox.insertBefore(userMsgEl, chipsContainer);
        scrollToBottom();

        const lowercaseQuery = query.toLowerCase();
        let botResponse = `I'm not sure I understood that fully. Can you try asking about "Zoho skills", "Django", "AI and Data Science", or "how to contact"? You can also email me directly at <a href="mailto:nandkumarcoder@gmail.com">nandkumarcoder@gmail.com</a>.`;

        // Search in database
        if (lowercaseQuery.includes("zoho") || lowercaseQuery.includes("deluge")) {
            botResponse = botDatabase.zoho;
        } else if (lowercaseQuery.includes("django") || lowercaseQuery.includes("backend") || lowercaseQuery.includes("web")) {
            botResponse = botDatabase.django;
        } else if (lowercaseQuery.includes("ai") || lowercaseQuery.includes("machine learning") || lowercaseQuery.includes("intelligence") || lowercaseQuery.includes("nlp") || lowercaseQuery.includes("neural")) {
            botResponse = botDatabase.ai;
        } else if (lowercaseQuery.includes("data science") || lowercaseQuery.includes("dataset") || lowercaseQuery.includes("pandas") || lowercaseQuery.includes("data")) {
            botResponse = botDatabase.data;
        } else if (lowercaseQuery.includes("location") || lowercaseQuery.includes("where") || lowercaseQuery.includes("live") || lowercaseQuery.includes("kanpur")) {
            botResponse = botDatabase.location;
        } else if (lowercaseQuery.includes("contact") || lowercaseQuery.includes("reach") || lowercaseQuery.includes("hire") || lowercaseQuery.includes("message")) {
            botResponse = botDatabase.contact;
        } else if (lowercaseQuery.includes("email") || lowercaseQuery.includes("mail")) {
            botResponse = botDatabase.email;
        } else if (lowercaseQuery.includes("github") || lowercaseQuery.includes("git") || lowercaseQuery.includes("code")) {
            botResponse = botDatabase.github;
        } else if (lowercaseQuery.includes("linkedin") || lowercaseQuery.includes("social")) {
            botResponse = botDatabase.linkedin;
        } else if (lowercaseQuery.includes("skill") || lowercaseQuery.includes("stack") || lowercaseQuery.includes("programming")) {
            botResponse = botDatabase.skills;
        } else if (lowercaseQuery.includes("hello") || lowercaseQuery.includes("hi") || lowercaseQuery.includes("hey")) {
            botResponse = `Hello there! I'm here to answer any questions you have about my programming projects, Zoho automation, Django expertise, or location. What would you like to know?`;
        }

        simulateBotResponse(botResponse);
    }

    // Form Submit
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value;
        chatInput.value = "";
        handleUserQuery(text);
    });

    // Chips clicks
    const chips = chipsContainer.querySelectorAll(".chat-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            const question = chip.getAttribute("data-question");
            handleUserQuery(question);
        });
    });
}
