// Explore Button
let exploreBtn = document.querySelector(".title .btn"),
  hadithSection = document.querySelector(".hadith");

exploreBtn.addEventListener("click", function () {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
let fixedDiv = document.querySelector(".header");
let scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    fixedDiv.classList.add("active");
  } else {
    fixedDiv.classList.remove("active");
  }

  if (window.scrollY > 500) {
    scrollBtn.classList.add("active");
  } else {
    scrollBtn.classList.remove("active");
  }
});

scrollBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hadith Changer

let hadithContainer = document.querySelector(".hadithContainer"),
  next = document.querySelector(".btns .next"),
  prev = document.querySelector(".btns .prev"),
  number = document.querySelector(".btns .number");
let hadithIndex = 0;

function hadithChanger() {
  fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then((Response) => Response.json())
    .then((data) => {
      let Hadiths = data.data.hadiths;
      changeHadith();
      next.addEventListener("click", function () {
        if (hadithIndex === 299) {
          hadithIndex === 0;
        } else {
          hadithIndex++;
        }
        changeHadith();
      });
      prev.addEventListener("click", function () {
        if (hadithIndex === 0) {
          hadithIndex === 299;
        } else {
          hadithIndex--;
        }
        changeHadith();
      });
      function changeHadith() {
        hadithContainer.innerHTML = Hadiths[hadithIndex].arab;
        number.innerHTML = `300 / ${hadithIndex + 1}`;
      }
    });
}
hadithChanger();

// Link Section
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Surah API

let surahsContainer = document.querySelector(".surhasContainer");
getSurah();
function getSurah() {
  // Fatch Surah Meta Data (Name Of Surah)
  fetch("http://api.alquran.cloud/v1/quran/en.asad ")
    .then((Response) => Response.json())
    .then((data) => {
      let srahs = data.data.surahs;
      let numberOfSurah = 114;
      for (let i = 0; i < numberOfSurah; i++) {
        surahsContainer.innerHTML += `
          <div class="surah">
            <p>${srahs[i].name}</p>
            <p>${srahs[i].englishName}</p>
          </div>`;
      }
      let surahTitles = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup"),
        aya1Container = document.querySelector(".ayat");

      surahTitles.forEach((title, index) => {
        title.addEventListener("click", function () {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((Response) => Response.json())
            .then((data) => {
              aya1Container.innerHTML = "";
              let ayat = data.data.ayahs;
              ayat.forEach((aya) => {
                popup.classList.add("active");
                aya1Container.innerHTML += `
                <p> ${aya.numberInSurah} - ${aya.text} </p>
                `;
              });
            });
        });
      });
      let closePopup = document.querySelector(".close-popup");
      closePopup.addEventListener("click", function () {
        popup.classList.remove("active");
      });
    });
}

// Time Pray API

let cards = document.querySelector(".cards");
getTimePray();
function getTimePray() {
  fetch(
    "http://api.aladhan.com/v1/timingsByCity/12-10-2023?city=cairo&country=egypt&method=8"
  )
    .then((Response) => Response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (let time in times) {
        cards.innerHTML += `
                  <div class="card">
              <div class="clock">
                <div class="prayTime">${times[time]}</div>
              </div>
              <p>${time}</p>
            </div>
      `;
      }
    });
}

// Active Side Bar

let bars = document.querySelector(".bars");
let sideBar = document.querySelector(".header ul");

bars.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
