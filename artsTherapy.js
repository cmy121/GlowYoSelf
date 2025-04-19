



<!-- Back to Top Button -->
<button onclick="scrollToTop()" id="backToTopBtn" title="Go to top">↑</button>

<script>
    // When the user scrolls down 200px from the top, show the button
window.onscroll = function () {
  toggleBackToTopButton();
};

function toggleBackToTopButton() {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

// When the user clicks the button, scroll to the top smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>
