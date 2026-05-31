/**
 * Nutra Queen Inc. - Contact Form Handler
 * Validates and submits the contact form via fetch() to a backend endpoint.
 * To use this in production, replace CONTACT_API_URL with your real server URL.
 */

// ---------- CONFIGURATION ----------
// Change this to your real endpoint (e.g. '/api/contact', 'https://your-server.com/submit', etc.)
var CONTACT_API_URL = '/api/contact';

(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var feedbackEl = document.getElementById('formFeedback');
  var submitBtn = form.querySelector('.btn-submit');
  var spinner   = submitBtn ? submitBtn.querySelector('.spinner') : null;

  // ---------- VALIDATE SINGLE FIELD ----------
  function validateField(field) {
    var value = field.value.trim();
    var errorEl = field.parentNode.querySelector('.field-error');
    var valid = true;
    var message = '';

    // Required check
    if (field.hasAttribute('required') && value === '') {
      valid = false;
      message = 'This field is required.';
    }

    // Email format
    if (valid && field.type === 'email' && value !== '') {
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) {
        valid = false;
        message = 'Please enter a valid email address.';
      }
    }

    // Phone format (basic check, optional field)
    if (valid && field.type === 'tel' && value !== '') {
      var phoneRe = /^[\d\s\-+().]{7,20}$/;
      if (!phoneRe.test(value)) {
        valid = false;
        message = 'Please enter a valid phone number.';
      }
    }

    // Update UI
    if (!valid) {
      field.classList.add('error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    } else {
      field.classList.remove('error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }

    return valid;
  }

  // ---------- VALIDATE ALL ----------
  function validateAll() {
    var allValid = true;
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (f) {
      if (!validateField(f)) {
        allValid = false;
      }
    });
    return allValid;
  }

  // ---------- SHOW FEEDBACK ----------
  function showFeedback(message, type) {
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.className = 'form-feedback ' + type;
    feedbackEl.style.display = 'block';
  }

  function hideFeedback() {
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'form-feedback';
    }
  }

  // ---------- LOADING STATE ----------
  function setLoading(loading) {
    if (!submitBtn || !spinner) return;
    if (loading) {
      submitBtn.classList.add('loading');
      spinner.style.display = 'inline-block';
    } else {
      submitBtn.classList.remove('loading');
      spinner.style.display = 'none';
    }
  }

  // ---------- RESET FORM ----------
  function resetForm() {
    form.reset();
    var errorFields = form.querySelectorAll('.error');
    errorFields.forEach(function (f) { f.classList.remove('error'); });
    var errorMsgs = form.querySelectorAll('.field-error');
    errorMsgs.forEach(function (el) { el.style.display = 'none'; });
  }

  // ---------- SUBMIT ----------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideFeedback();

    // Validate
    if (!validateAll()) {
      showFeedback('Please fix the errors above before submitting.', 'error-msg');
      return;
    }

    setLoading(true);

    // Build payload
    var payload = {
      firstName: form.querySelector('#firstName').value.trim(),
      lastName:  form.querySelector('#lastName').value.trim(),
      email:     form.querySelector('#email').value.trim(),
      phone:     form.querySelector('#phone').value.trim(),
      company:   form.querySelector('#company').value.trim(),
      subject:   form.querySelector('#subject').value,
      message:   form.querySelector('#message').value.trim(),
      timestamp: new Date().toISOString()
    };

    fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Server responded with ' + response.status);
        }
        return response.json().catch(function () {
          // If the server doesn't return JSON, treat HTTP success as success
          return {};
        });
      })
      .then(function () {
        showFeedback('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
        resetForm();
      })
      .catch(function (err) {
        console.error('Contact form submission error:', err);
        showFeedback('Something went wrong. Please try again or email us directly at sales@nutraqueen.com.', 'error-msg');
      })
      .finally(function () {
        setLoading(false);
      });
  });

  // ---------- LIVE VALIDATION ON BLUR ----------
  var inputFields = form.querySelectorAll('input, select, textarea');
  inputFields.forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.value.trim() !== '' || field.hasAttribute('required')) {
        validateField(field);
      }
    });
    // Clear error on focus
    field.addEventListener('focus', function () {
      field.classList.remove('error');
      var errorEl = field.parentNode.querySelector('.field-error');
      if (errorEl) {
        errorEl.style.display = 'none';
      }
    });
  });

})();
