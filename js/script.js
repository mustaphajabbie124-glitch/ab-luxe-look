// AB Luxe Look interactions


// Mobile navigation

const menuToggle = document.getElementById("menu-toggle");
const navWrapper = document.querySelector(".nav-wrapper");
const navigationLinks = document.querySelectorAll(".main-navigation a");

if (menuToggle && navWrapper) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navWrapper.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


// Close the mobile menu after selecting a link

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navWrapper) {
            navWrapper.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});


// Header scroll effect

const header = document.querySelector(".site-header");

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


// Gallery lightbox

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");
const galleryButtons = Array.from(
    document.querySelectorAll(".gallery-button")
);

let currentGalleryIndex = 0;

function showGalleryImage(index) {
    if (!lightbox || !lightboxImage || galleryButtons.length === 0) {
        return;
    }

    // Wrap around when the first or last image is reached.
    currentGalleryIndex =
        (index + galleryButtons.length) % galleryButtons.length;

    const selectedButton = galleryButtons[currentGalleryIndex];
    const image = selectedButton.querySelector("img");
    const imageSource = selectedButton.dataset.image;
    const imageAlt = image ? image.alt : "AB Luxe Look gallery image";

    if (!imageSource) {
        return;
    }

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageAlt;

    if (lightboxCounter) {
        lightboxCounter.textContent =
            `${currentGalleryIndex + 1} / ${galleryButtons.length}`;
    }
}

function openLightbox(index) {
    if (!lightbox || !lightboxImage) {
        return;
    }

    showGalleryImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    if (lightboxClose) {
        lightboxClose.focus();
    }
}

function closeLightbox() {
    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}

galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openLightbox(index);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
        showGalleryImage(currentGalleryIndex - 1);
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
        showGalleryImage(currentGalleryIndex + 1);
    });
}

// Close the lightbox when the backdrop is clicked
if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

// Escape closes the lightbox; arrow keys change images
document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        showGalleryImage(currentGalleryIndex - 1);
    } else if (event.key === "ArrowRight") {
        showGalleryImage(currentGalleryIndex + 1);
    }
});

// WhatsApp

// Confirmed WhatsApp Business number

const whatsappNumber = "220833242366";


function openWhatsApp(message) {

    if (
        whatsappNumber ===
        "REPLACE_WITH_CONFIRMED_NUMBER"
    ) {

        alert(
            "WhatsApp number has not been added yet. The business owner can provide the confirmed number."
        );

        return;

    }

    const encodedMessage =
        encodeURIComponent(message);

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}


// Service booking buttons

const serviceButtons =
    document.querySelectorAll(".service-card .btn");


serviceButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        if (
            whatsappNumber ===
            "REPLACE_WITH_CONFIRMED_NUMBER"
        ) {
            return;
        }

        const serviceCard =
            button.closest(".service-card");

        const serviceTitle =
            serviceCard
                ?.querySelector("h3")
                ?.textContent
                .trim();

        if (!serviceTitle) {
            return;
        }

        event.preventDefault();

        openWhatsApp(
            `Hello AB Luxe Look,\n\nI would like to book the following service:\n\nService: ${serviceTitle}`
        );

    });

});


// Shop order buttons

const productButtons =
    document.querySelectorAll(".whatsapp-order");


productButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productName =
            button.dataset.product ||
            "a product";

        openWhatsApp(
            `Hello AB Luxe Look,\n\nI am interested in:\n\n${productName}\n\nPlease send me more information.`
        );

    });

});


// Booking form

const bookingForm =
    document.getElementById("booking-form");


if (bookingForm) {

    bookingForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name")?.value.trim() || "";

        const service =
            document.getElementById("service")?.value.trim() || "";

        const date =
            document.getElementById("date")?.value || "";

        const time =
            document.getElementById("time")?.value || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        const bookingDetails = [
            "Hello AB Luxe Look,",
            "",
            "I would like to book an appointment.",
            "",
            `Name: ${name}`,
            `Service: ${service}`,
            `Preferred Date: ${date}`,
            `Preferred Time: ${time}`
        ];

        if (message) {
            bookingDetails.push(`Message: ${message}`);
        }

        openWhatsApp(bookingDetails.join("\\n"));

    });

}


// WhatsApp contact button

const whatsappContact =
    document.getElementById("whatsapp-contact");


if (whatsappContact) {

    whatsappContact.addEventListener("click", () => {

        openWhatsApp(
            "Hello AB Luxe Look,\n\nI would like to make an enquiry."
        );

    });

}