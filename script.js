// ============================================================
// CONFIG: Edit contact info, counties, and status notes here.
// Everything the site displays pulls from this block.
// ============================================================
const CONFIG = {
  consultantName: "Justin Hiller",
  phone: "[JUSTIN_PHONE]",
  email: "[JUSTIN_EMAIL]",
  serviceArea: "San Antonio, New Braunfels & surrounding counties",
  eligibleCounties: ["Bexar", "Comal", "Guadalupe", "Wilson"],
  programStatusNote:
    "TERP grant rounds open and close throughout the year. Call to find out what's open right now.",
  moneyRealityNote:
    "TERP pays you back after you buy and finish the steps. It's a reimbursement, not a discount up front, and the amount is capped by the state.",
};

document.addEventListener("DOMContentLoaded", () => {
  populateConfig();
  initChecker();
  initNav();
});

function populateConfig() {
  document.querySelectorAll("[data-phone]").forEach((el) => {
    el.href = "tel:" + CONFIG.phone;
    if (el.dataset.phone === "label") el.textContent = CONFIG.phone;
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.href = "mailto:" + CONFIG.email;
    if (el.dataset.email === "label") el.textContent = CONFIG.email;
  });
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = CONFIG.consultantName;
  });
  document.querySelectorAll("[data-service-area]").forEach((el) => {
    el.textContent = CONFIG.serviceArea;
  });
  document.querySelectorAll("[data-status-note]").forEach((el) => {
    el.textContent = CONFIG.programStatusNote;
  });
  document.querySelectorAll("[data-money-note]").forEach((el) => {
    el.textContent = CONFIG.moneyRealityNote;
  });
}

// ---- Mobile nav ----
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Eligibility checker ----
function initChecker() {
  const widget = document.getElementById("checker-widget");
  if (!widget) return;

  const questions = [
    {
      id: "county",
      text: "Where does your equipment mostly operate?",
      options: CONFIG.eligibleCounties.concat(["Somewhere else"]),
    },
    {
      id: "equipment",
      text: "What are you looking to replace or repower?",
      options: [
        "On-road diesel truck over 8,500 lbs",
        "Non-road diesel equipment with a 25+ HP engine",
        "Neither",
      ],
    },
    {
      id: "age",
      text: "Roughly how old is the machine you'd retire?",
      options: ["2010 or older", "2011-2017", "2018 or newer", "Not sure"],
    },
    {
      id: "usage",
      text: "Does it run at least 75% of the time in those counties?",
      options: ["Yes", "No", "Not sure"],
    },
  ];

  let step = 0;
  const answers = {};

  function render() {
    if (step < questions.length) {
      showQuestion(questions[step]);
    } else {
      showResult();
    }
  }

  function showQuestion(q) {
    const buttons = q.options
      .map(
        (opt) =>
          '<button class="checker-btn" type="button" data-value="' +
          opt +
          '">' +
          opt +
          "</button>"
      )
      .join("");

    widget.innerHTML =
      '<div class="checker-progress">Question ' +
      (step + 1) +
      " of " +
      questions.length +
      "</div>" +
      '<h3 class="checker-question">' +
      q.text +
      "</h3>" +
      '<div class="checker-options">' +
      buttons +
      "</div>" +
      (step > 0
        ? '<button class="checker-back" type="button">← Back</button>'
        : "");

    widget.querySelectorAll(".checker-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers[q.id] = btn.dataset.value;
        step++;
        render();
      });
    });

    var back = widget.querySelector(".checker-back");
    if (back) {
      back.addEventListener("click", () => {
        step--;
        render();
      });
    }
  }

  function showResult() {
    const eligibleCounty = CONFIG.eligibleCounties.indexOf(answers.county) !== -1;
    const eligibleEquipment = answers.equipment !== "Neither";
    const olderMachine = answers.age === "2010 or older";
    const usageOk = answers.usage === "Yes" || answers.usage === "Not sure";

    var heading, message, tone;

    if (!eligibleCounty || !eligibleEquipment) {
      tone = "unlikely";
      heading = "Probably Not a Fit, But Worth a Quick Check";
      message =
        "Based on what you selected, this doesn't line up with the main TERP programs. But exceptions and other programs exist. A quick call can confirm either way.";
    } else if (!olderMachine || !usageOk) {
      tone = "maybe";
      heading = "Could Be Worth a Conversation";
      message =
        "Some of the details are in the gray area, and it comes down to specifics like exact model year, engine tier, and operating hours. " +
        CONFIG.consultantName +
        " can tell you whether it pencils out for your situation.";
    } else {
      tone = "likely";
      heading = "This Looks Worth a Call";
      message =
        "On paper, this is the kind of project TERP is built for. " +
        CONFIG.consultantName +
        " can tell you what to expect for your specific machine.";
    }

    widget.innerHTML =
      '<div class="checker-result checker-result--' +
      tone +
      '">' +
      "<h3>" +
      heading +
      "</h3>" +
      "<p>" +
      message +
      "</p>" +
      '<div class="checker-ctas">' +
      '<a href="tel:' +
      CONFIG.phone +
      '" class="btn btn--primary">Call ' +
      CONFIG.consultantName +
      "</a>" +
      '<a href="mailto:' +
      CONFIG.email +
      '" class="btn btn--secondary">Email ' +
      CONFIG.consultantName +
      "</a>" +
      "</div>" +
      '<p class="checker-disclaimer">This is a rough estimate, not an official decision. Only TCEQ determines eligibility and amounts. ' +
      CONFIG.consultantName +
      " will give you the honest read on your actual situation.</p>" +
      "</div>" +
      '<button class="checker-back" type="button">← Start Over</button>';

    widget.querySelector(".checker-back").addEventListener("click", () => {
      step = 0;
      for (var k in answers) delete answers[k];
      render();
    });
  }

  render();
}

// ---- Smooth scroll ----
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute("href"));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  }
});
