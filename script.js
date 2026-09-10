// Hawaii Ocean Travel
// Main site interactions + direct booking form submission

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.classList.remove("open");
      });
    });
  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });


  /* =========================================
     BOOKING FORM
  ========================================= */

  const bookingForm = document.getElementById("booking-form");

  if (!bookingForm) {
    return;
  }

  const submitButton = bookingForm.querySelector(
    'button[type="submit"], input[type="submit"]'
  );

  /*
   * Prevent customers from selecting a date in the past.
   */

  const dateInput = bookingForm.querySelector(
    'input[name="date"], #booking-date'
  );

  if (dateInput) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
  }


  /* =========================================
     FORM STATUS MESSAGE
  ========================================= */

  let statusMessage = document.getElementById("booking-status");

  if (!statusMessage) {
    statusMessage = document.createElement("div");
    statusMessage.id = "booking-status";
    statusMessage.setAttribute("role", "status");
    statusMessage.setAttribute("aria-live", "polite");

    statusMessage.style.marginTop = "14px";
    statusMessage.style.fontSize = "14px";
    statusMessage.style.lineHeight = "1.5";

    if (submitButton) {
      submitButton.insertAdjacentElement("afterend", statusMessage);
    } else {
      bookingForm.appendChild(statusMessage);
    }
  }


  /* =========================================
     DIRECT FORM SUBMISSION
  ========================================= */

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const formData = new FormData(bookingForm);

    /*
     * Add FormSubmit settings.
     */

    formData.append(
      "_subject",
      "New Hawaii Ocean Travel Booking Request"
    );

    formData.append(
      "_template",
      "table"
    );

    formData.append(
      "_captcha",
      "false"
    );


    /*
     * Use customer's email as reply-to when available.
     */

    const customerEmail = formData.get("email");

    if (customerEmail) {
      formData.append("_replyto", customerEmail);
    }


    /*
     * Change button while sending.
     */

    const originalButtonText = submitButton
      ? submitButton.textContent
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    statusMessage.textContent = "";
    statusMessage.style.color = "";


    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/hawaiioceantravel@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );


      let result = null;

      try {
        result = await response.json();
      } catch (error) {
        result = null;
      }


      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to send booking request."
        );
      }


      /*
       * Success
       */

      statusMessage.textContent =
        "Booking request sent! We’ll contact you shortly.";

      statusMessage.style.color = "#1f7a4d";

      bookingForm.reset();


      /*
       * Restore minimum date after reset.
       */

      if (dateInput) {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
      }


      /*
       * Scroll success message into view on smaller screens.
       */

      statusMessage.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

    } catch (error) {
      console.error("Booking submission error:", error);

      statusMessage.textContent =
        "We couldn't send your request. Please call or text (614) 558-5764, or email hawaiioceantravel@gmail.com.";

      statusMessage.style.color = "#b42318";

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          originalButtonText || "Send Booking Request";
      }
    }
  });
});
