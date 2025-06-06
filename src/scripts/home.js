$(document).ready(function() {
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav:true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  });
})

$(document).ready(function() {
  var owl = $('.owl-carousel-destaques');
  owl.owlCarousel({
    items: 5,
    loop: true,
    margin: 0,
    nav:true
  });
});


const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle?.addEventListener("click", () => {
  menu.classList.toggle("active");
});
