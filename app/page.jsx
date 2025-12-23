"use client";

import "./globals.css";
import { useEffect } from "react";

const HTML = `PASTE_YOUR_HTML_HERE_WITHOUT_THE_SCRIPT_TAG`;

export default function HomePage() {
  useEffect(() => {
    // Hero button scroll to mini form
    (function () {
      var btn = document.getElementById("truHeroStartQuote");
      var miniSection = document.getElementById("truMiniSection");
      if (btn && miniSection) {
        btn.addEventListener("click", function () {
          miniSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    })();

    // Mini form redirect
    (function () {
      var btn = document.getElementById("truMiniSubmit");
      if (!btn) return;

      btn.addEventListener("click", function () {
        var name = document.getElementById("miniName")?.value?.trim() || "";
        var zip = document.getElementById("miniZip")?.value?.trim() || "";
        var size = document.getElementById("miniSize")?.value || "";

        if (!name || !zip || !size) {
          alert("Please fill out all fields to proceed.");
          return;
        }

        // TEMP: send them to your internal Next page
        var url = "/online-estimate";

        window.location.href = url;
      });
    })();

    // Contact form validation + floating labels (your existing logic)
    (function () {
      var form = document.getElementById("truContactForm");
      if (!form) return;

      var nameField = form.querySelector('.tru-field[data-field="name"]');
      var emailField = form.querySelector('.tru-field[data-field="email"]');
      var messageField = form.querySelector('.tru-field[data-field="message"]');

      var nameInput = document.getElementById("contactName");
      var emailInput = document.getElementById("contactEmail");
      var messageInput = document.getElementById("contactMessage");

      function validateEmail(value) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
      }

      function setFieldState(fieldEl, hasError) {
        if (!fieldEl) return;
        if (hasError) fieldEl.classList.add("has-error");
        else fieldEl.classList.remove("has-error");

        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (input && input.value.trim() !== "") fieldEl.classList.add("has-value");
        else fieldEl.classList.remove("has-value");
      }

      form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
        var input = fieldEl.querySelector(".tru-contact-input, .tru-contact-textarea");
        if (!input) return;

        input.addEventListener("input", function () {
          setFieldState(fieldEl, false);
        });

        input.addEventListener("blur", function () {
          setFieldState(fieldEl, fieldEl.classList.contains("has-error"));
        });

        setFieldState(fieldEl, false);
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var hasError = false;

        if (!nameInput.value.trim()) {
          setFieldState(nameField, true);
          hasError = true;
        } else setFieldState(nameField, false);

        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          setFieldState(emailField, true);
          hasError = true;
        } else setFieldState(emailField, false);

        if (!messageInput.value.trim()) {
          setFieldState(messageField, true);
          hasError = true;
        } else setFieldState(messageField, false);

        if (hasError) return;

        alert("Thank you. Your message has been sent to the TruMove team.");
        form.reset();
        form.querySelectorAll(".tru-field").forEach(function (fieldEl) {
          fieldEl.classList.remove("has-error", "has-value");
        });
      });
    })();
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
