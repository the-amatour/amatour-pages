document.addEventListener("DOMContentLoaded", () => {
    // 🧩 Function to load reusable HTML partials (header/footer)
    async function loadPartial(id, file) {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;

        // Attach menu toggle behavior *after* header is injected
        if (id === "header") {
          const toggleButton = document.getElementById("menu-toggle");
          const menu = document.getElementById("mobile-menu");

          toggleButton?.addEventListener("click", (e) => {
            e.stopPropagation();
            menu?.classList.toggle("hidden");
          });

          document.addEventListener("click", (e) => {
            if (!menu?.contains(e.target) && !toggleButton?.contains(e.target)) {
              menu?.classList.add("hidden");
            }
          });
        }
      }

    // 🚀 Load header and footer when the page loads
    loadPartial("header", "./shared/header.html");
    loadPartial("footer", "./shared/footer.html");

    // Carousel
  //   const carousel = document.getElementById("carousel-slides");
  // const prevBtn = document.getElementById("prev-slide");
  // const nextBtn = document.getElementById("next-slide");
  // const slides = carousel.children;
  // const totalSlides = slides.length;
  // let currentIndex = 0;

  // let startX = 0;
  // let isSwiping = false;

  // // This function moves the carousel to the correct slide
  // function updateCarousel() {
  //   carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  // }

  // function goToPrevSlide() {
  //   currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  //   updateCarousel();
  // }

  // function goToNextSlide() {
  //   currentIndex = (currentIndex + 1) % totalSlides;
  //   updateCarousel();
  // }

  // prevBtn.addEventListener("click", goToPrevSlide);
  // nextBtn.addEventListener("click", goToNextSlide);

  // // Swipe gesture handlers
  // carousel.addEventListener("touchstart", (e) => {
  //   startX = e.touches[0].clientX;
  //   isSwiping = true;
  // });

  // carousel.addEventListener("touchmove", (e) => {
  //   if (!isSwiping) return;
  //   const currentX = e.touches[0].clientX;
  //   const diff = currentX - startX;

  //   // Optional: if you want live dragging visual, you could apply transform here.
  // });

  // carousel.addEventListener("touchend", (e) => {
  //   if (!isSwiping) return;
  //   const endX = e.changedTouches[0].clientX;
  //   const deltaX = endX - startX;
  //   const swipeThreshold = 50; // minimum px swipe to trigger

  //   if (deltaX > swipeThreshold) {
  //     goToPrevSlide();
  //   } else if (deltaX < -swipeThreshold) {
  //     goToNextSlide();
  //   }

  //   isSwiping = false;
  // });

  async function renderAnnouncements() {
    const announcementsContainer = document.getElementById("announcement-board");
    if (!announcementsContainer) return;

    try {
      // Create a placeholder JSON file at ./data/announcements.json
      const response = await fetch("./scheduling/announcements.json");
      const announcements = await response.json();

      announcements.forEach(announcement => {
        const announcementCard = document.createElement("div");
        announcementCard.className = "bg-[#ece4d6] rounded-xl p-6 transition-all duration-300 transform hover:scale-105";

        const iconMap = {
          "results": "🏆",
          "event": "📅",
          "points": "🎁"
        };
        const icon = iconMap[announcement.type] || "📌"; // Default icon

        announcementCard.innerHTML = `
          <div class="flex items-center space-x-4 mb-4">
            <span class="text-3xl">${icon}</span>
            <h3 class="text-lg font-semibold text-[#005f60] font-heading">${announcement.title}</h3>
          </div>
          <p class="text-sm">${announcement.description}</p>
        `;
        announcementsContainer.appendChild(announcementCard);
      });

    } catch (error) {
      console.error("Error fetching or rendering announcements:", error);
      announcementsContainer.innerHTML = "<p class='text-center text-gray-500'>Announcements coming soon.</p>";
    }
  }

  // 🚀 Call the function to render announcements when the page loads
  renderAnnouncements();
});
