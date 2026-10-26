/* EXPOSE – contact form
 * A static site has no server, so the form works in one of two ways:
 *  1) If FORM_ENDPOINT is set (e.g. a Formspree / Getform URL) it is sent there with fetch().
 *  2) Otherwise it opens the visitor's e-mail app with the message pre-filled (mailto:).
 * Change CONTACT_EMAIL (and optionally FORM_ENDPOINT) below before publishing.
 */
(function () {
  "use strict";
  var CONTACT_EMAIL = "expose-project@example.org";   // <-- replace with the project address
  var FORM_ENDPOINT = "";                              // <-- optional, e.g. "https://formspree.io/f/xxxxxxx"

  var form = document.getElementById("contact-form");
  if (!form) return;
  var ok = document.getElementById("success");
  var msg = form.elements["message"];
  var counter = document.getElementById("counter");
  var MAX = 1500;

  msg.addEventListener("input", function () { counter.textContent = msg.value.length + " / " + MAX; });

  function setInvalid(name, bad) {
    var f = form.elements[name].closest(".field");
    f.classList.toggle("invalid", bad);
    form.elements[name].setAttribute("aria-invalid", bad ? "true" : "false");
    return bad;
  }
  function validate() {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var bad = [
      setInvalid("name", form.elements["name"].value.trim().length < 2),
      setInvalid("email", !emailRe.test(form.elements["email"].value.trim())),
      setInvalid("topic", !form.elements["topic"].value),
      setInvalid("message", msg.value.trim().length < 10 || msg.value.length > MAX),
      setInvalid("consent", !form.elements["consent"].checked)
    ];
    return bad.indexOf(true) === -1;
  }
  ["name", "email", "topic", "message", "consent"].forEach(function (n) {
    form.elements[n].addEventListener("blur", validate);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements["website"].value) return;          // honeypot: bots fill this in
    if (!validate()) { var first = form.querySelector(".invalid input, .invalid select, .invalid textarea"); if (first) first.focus(); return; }

    var payload = {
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      affiliation: form.elements["affiliation"].value.trim(),
      topic: form.elements["topic"].value,
      message: msg.value.trim()
    };
    function done(text) {
      ok.textContent = text; ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset(); counter.textContent = "0 / " + MAX;
    }

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done("Thank you, " + payload.name + ". Your message has been sent and we will reply by e-mail."); })
        .catch(function () { ok.textContent = "Sorry, the message could not be sent. Please e-mail " + CONTACT_EMAIL + " directly."; ok.classList.add("show"); });
    } else {
      var body = "Name: " + payload.name + "\nEmail: " + payload.email + "\nAffiliation: " + (payload.affiliation || "-") + "\n\n" + payload.message;
      location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("[EXPOSE] " + payload.topic) + "&body=" + encodeURIComponent(body);
      done("Thank you, " + payload.name + ". Your e-mail app should have opened with the message ready to send. If nothing opened, write to " + CONTACT_EMAIL + ".");
    }
  });
})();
