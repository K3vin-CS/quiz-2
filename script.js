document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-links");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});

const dayItems = document.querySelectorAll(".itinerary-day");

dayItems.forEach((day) => {
    const header = day.querySelector(".day-header");

    header.addEventListener("click", () => {
        dayItems.forEach((other) => {
            if (other !== day) {
                other.classList.remove("open");
                const otherContent = other.querySelector(".day-content");
                otherContent.style.maxHeight = null;
            }
        });

        day.classList.toggle("open");
        const content = day.querySelector(".day-content");

        if (day.classList.contains("open")) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null;
        }
    });
});

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(targetId);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

let activities = [];

function addActivity() {
  const activity = document.getElementById("activityInput").value;

  if (activity.trim() === "") return;

  activities.push(activity);
  renderActivities();
  document.getElementById("activityInput").value = "";
}

function renderActivities() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  activities.forEach((act, index) => {
    list.innerHTML += `<li>${act}</li>`;
  });
}

function saveItinerary() {
  const name = document.getElementById("itineraryName").value;
  const dest = document.getElementById("destination").value;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const notes = document.getElementById("notes").value;

  if (!name || !dest || !start || !end) {
    alert("Please fill all required fields.");
    return;
  }

  const itinerary = {
    name,
    destination: dest,
    startDate: start,
    endDate: end,
    notes,
    activities
  };

  let saved = JSON.parse(localStorage.getItem("itineraries")) || [];
  saved.push(itinerary);

  localStorage.setItem("itineraries", JSON.stringify(saved));

  alert("Itinerary saved!");
  window.location.href = "itinerary-list.html";
}

function goBack() {
  window.location.href = "itinerary-list.html";
}


function showToast(msg, ok=true) {
  const t = document.getElementById('toast');
  t.hidden = false;
  t.textContent = msg;
  t.style.background = ok ? '#2e7d32' : '#b00020';
  setTimeout(()=> t.hidden = true, 2500);
}

document.querySelector('.save-btn').addEventListener('click', function(e){
  this.disabled = true;
  this.textContent = 'Saving...';
  setTimeout(() => {
    this.disabled = false;
    this.textContent = 'Save Itinerary';
    showToast('Itinerary saved', true);
  }, 900);
});
