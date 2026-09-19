"use strict";

// trending
const track = document.getElementById("trendingTrack");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Open details for ${movie.title.toLowerCase()}`);

  card.innerHTML = `
    <div class="movie-card-inner">
      <img src="${movie.image}" alt="${movie.title}" />
      <div class="movie-card-overlay"></div>
    </div>`;

  card.addEventListener("click", () => openModal(movie));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(movie);
    }
  });

  return card;
}

function renderTrending() {
  if (!track) return;
  const fragment = document.createDocumentFragment();
  trendingMovies.forEach((movie) => {
    fragment.appendChild(createMovieCard(movie));
  });
  track.appendChild(fragment);
}

function scrollCarousel(direction) {
  if (!track) return;
  const distance = track.clientWidth * 0.8 * direction;
  track.scrollBy({ left: distance, behavior: "smooth" });
}

scrollLeftBtn?.addEventListener("click", () => scrollCarousel(-1));
scrollRightBtn?.addEventListener("click", () => scrollCarousel(1));

// movie model
const modalBackdrop = document.getElementById("movieModal");
const modalCard = document.getElementById("movieModalCard");
const modalBody = document.getElementById("movieModalBody");
const modalCloseBtn = document.getElementById("movieModalClose");

function buildModalHtml(movie) {
  const genreChips = movie.genres
    .split(",")
    .map((genre) => `<span class="chip">${genre.trim()}</span>`)
    .join("");

  return `
    <div class="modal-header">
      <img class="banner" src="${movie.cover}" alt="${movie.title} banner" />
      <div class="modal-header-grad"></div>
      <img class="modal-title-img" src="${movie.titleImg}" alt="${movie.title}" />
    </div>
    <div class="modal-body">
      <div class="modal-chips">
        <div class="chips-genres">${genreChips}</div>
      </div>
      <p class="modal-desc">${movie.desc}</p>
      <button class="modal-cta" type="button">Get started</button>
    </div>`;
}

function openModal(movie) {
  if (!modalBackdrop || !modalBody) return;
  modalBody.innerHTML = buildModalHtml(movie);
  modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.hidden = true;
  document.body.style.overflow = "";
}

modalCloseBtn?.addEventListener("click", closeModal);
modalBackdrop?.addEventListener("click", closeModal);
modalCard?.addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop && !modalBackdrop.hidden) {
    closeModal();
  }
});

// FAQ accordition
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const toggle = item.querySelector(".faq-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const willOpen = !item.classList.contains("faq-item--open");

    faqItems.forEach((other) => {
      other.classList.remove("faq-item--open");
      other.querySelector(".faq-toggle")?.setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      item.classList.add("faq-item--open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});


renderTrending();