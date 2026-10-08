
(() => {


  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
 
// --------menu----------//


  const filterButtons = document.querySelectorAll("[data-filter]");
const menuItems = document.querySelectorAll(".menu-item");
const noResults = document.getElementById("noResults");

filterButtons.forEach(button => {

  button.addEventListener("click", function () {

    const filter = this.dataset.filter;

    // Active button
    filterButtons.forEach(btn => {
      btn.classList.remove("btn-dark", "active");
      btn.classList.add("btn-outline-dark");
    });

    this.classList.remove("btn-outline-dark");
    this.classList.add("btn-dark", "active");

    let visibleItems = 0;

    menuItems.forEach(item => {

      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.classList.remove("d-none");
        visibleItems++;
      } else {
        item.classList.add("d-none");
      }

    });

    // No results message
    if (visibleItems === 0) {
      noResults.classList.remove("d-none");
    } else {
      noResults.classList.add("d-none");
    }

  });

});
 // ---------- Special Offer Countdown ----------

const countdown = document.getElementById("countdown");
const cdD = document.getElementById("cdD");
const cdH = document.getElementById("cdH");
const cdM = document.getElementById("cdM");
const cdS = document.getElementById("cdS");

let endTime = new Date();
endTime.setDate(endTime.getDate() + 2);
endTime.setHours(endTime.getHours() + 5);

function updateCountdown() {

  const now = new Date();
  const difference = endTime - now;

  if (difference <= 0) {
    endTime = new Date();
    endTime.setDate(endTime.getDate() + 2);
    endTime.setHours(endTime.getHours() + 5);
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  cdD.textContent = String(days).padStart(2, "0");
  cdH.textContent = String(hours).padStart(2, "0");
  cdM.textContent = String(minutes).padStart(2, "0");
  cdS.textContent = String(seconds).padStart(2, "0");
}

if (countdown) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
// Hero Stats Counter
const countObs = new IntersectionObserver((entries, obs) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const el = entry.target;
    const end = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);

    const start = performance.now();
    const duration = 1400;

    function tick(now) {

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const value = end * (1 - Math.pow(1 - progress, 3));

      el.textContent = value.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }

    }

    requestAnimationFrame(tick);
    obs.unobserve(el);

  });

}, {
  threshold: 0.6
});

document.querySelectorAll("[data-count]").forEach(el => {
  countObs.observe(el);
});

  /* ---------- Search ---------- */
  const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");

if (searchBtn && searchBox) {

  searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("show");

    if (searchBox.classList.contains("show")) {
      document.getElementById("menuSearch").focus();
    }
  });

}


  /* ---------- Navbar: scroll state, active link, mobile collapse ---------- */
  const nav = $('#navbar');
  const links = $$('.nav-link');
  const sections = links.map(l => $(l.getAttribute('href'))).filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 30);
    const pos = y + 140;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= pos) current = s; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 

  const collapseEl = $('#mainNav');
  links.forEach(l => l.addEventListener('click', () => {
    if (collapseEl.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
  }));




  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
    });
  }, { threshold: .12 });
  $$('[data-reveal]').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 90}ms`; io.observe(el); });


  /* ---------- Offer countdown (rolls to next Sunday night) ---------- */
  function nextDeadline() {
    const d = new Date();
    d.setHours(23, 59, 59, 0);
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
    if (d < new Date()) d.setDate(d.getDate() + 7);
    return d;
  }
  let deadline = nextDeadline();
  const pad = n => String(n).padStart(2, '0');
  function tickCountdown() {
    let diff = deadline - new Date();
    if (diff <= 0) { deadline = nextDeadline(); diff = deadline - new Date(); }
    const s = Math.floor(diff / 1000);
    $('#cdD').textContent = pad(Math.floor(s / 86400));
    $('#cdH').textContent = pad(Math.floor(s % 86400 / 3600));
    $('#cdM').textContent = pad(Math.floor(s % 3600 / 60));
    $('#cdS').textContent = pad(s % 60);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);


                //--------back to top---------------*//

// -------- Back To Top -------- //

// -------- Back To Top -------- //

const backToTop = document.getElementById("back-to-top");
const backToTopBtn = document.querySelector("#back-to-top button");

if (backToTop && backToTopBtn) {

  backToTop.style.display = "none";

  window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }

  });

  backToTopBtn.addEventListener("click", function () {

    const startPosition = window.pageYOffset;
    const duration = 1000;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out effect
      const ease = 1 - Math.pow(1 - progress, 4);

      window.scrollTo(
        0,
        startPosition * (1 - ease)
      );

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }

    }

    requestAnimationFrame(scrollAnimation);

  });

}

  /* ---------- Init ---------- */
 $('#year').textContent = new Date().getFullYear();
})();
