document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

        // Close mobile menu after clicking a link
        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });
    }


    /* =====================================================
       CONTACT FORM — FORMSPREE
       ===================================================== */

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const backToForm = document.getElementById("backToForm");

    if (contactForm && formSuccess) {

        contactForm.addEventListener("submit", async (event) => {

            // Stop the browser from leaving the Queen's Holdings website
            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalButtonText = submitButton
                ? submitButton.innerHTML
                : "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = "<span>Sending...</span>";
            }

            try {

                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: new FormData(contactForm),
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Form submission failed.");
                }

                // Hide the form
                contactForm.style.display = "none";

                // Show our custom Queen's Holdings success message
                formSuccess.classList.add("is-visible");

                // Clear the form
                contactForm.reset();

            } catch (error) {

                console.error("Form submission error:", error);

                alert(
                    "Sorry, there was a problem sending your enquiry. Please try again."
                );

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }

            }

        });
    }


    /* =====================================================
       SEND ANOTHER ENQUIRY
       ===================================================== */

    if (backToForm && contactForm && formSuccess) {

        backToForm.addEventListener("click", () => {

            formSuccess.classList.remove("is-visible");

            contactForm.style.display = "";

            contactForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    }

});