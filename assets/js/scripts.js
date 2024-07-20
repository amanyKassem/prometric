// loader js
$(window).on("load", function () {
  $(".loader-container").fadeOut(4500);
  $("body").css("overflow-y", "auto");
});

$(document).ready(function () {
  function checkScroll() {
    if ($(window).scrollTop() > 150) {
      $(".normal-nav").addClass("change-bg");
      $(".top-bar").addClass("change-bg");
    } else {
      //remove the background property so it comes transparent again
      $(".normal-nav").removeClass("change-bg");
      $(".top-bar").removeClass("change-bg");
    }
  }
  checkScroll();

  $(window).on("scroll", function () {
    checkScroll();
  });

  // toggle menu
  $("nav .toggle").click(function () {
    $(".overlay").css({
      transform: "scaleX(1)",
    });

    $(".menu").addClass("ul-dir");
  });

  $("nav .overlay").click(function () {
    $(this).removeAttr("style");
    $(".menu").removeClass("ul-dir");
  });

  function initiateAnimation() {
    AOS.init({
      delay: 500, // values from 0 to 3000, with step 50ms
      duration: 900, // values from 0 to 3000, with step 50ms
      easing: "ease-out-back", // default easing for AOS animations
    });

    if ($(window).width() < 560) {
      AOS.init({
        once: true,
      });
    }
  }
  initiateAnimation();

  // show/hide password
  $(".toggle-password").on("click", function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    let input = $($(this).parent().prev("input"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  // add to cart
  $(".add-to-cart").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });

  //scroll top
  var scrollButton = $("#scroll-top");
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 700) {
      scrollButton.fadeIn(1000);
    } else {
      scrollButton.fadeOut(1000);
    }
  });

  //click to scroll top
  scrollButton.click(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // notification dropdown
  const imageContainer = document.querySelector(".image-container");
  const dropdownContent = document.querySelector(".dropdown-content");
  if (imageContainer) {
    imageContainer.addEventListener("click", function (event) {
      if (window.innerWidth < 768) {
        // Mobile view
        window.location.href = "notifications.html";
      } else {
        // Desktop view
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.opacity = 0;
          dropdownContent.style.transform = "translateY(-10px)";
          setTimeout(() => {
            dropdownContent.style.display = "none";
          }, 300); // Matches the CSS transition duration
        } else {
          dropdownContent.style.display = "block";
          setTimeout(() => {
            dropdownContent.style.opacity = 1;
            dropdownContent.style.transform = "translateY(0)";
          }, 10); // Small delay to ensure the display block is set before the transition
        }
      }
      event.stopPropagation();
    });

    // Close the dropdown when clicking outside
    window.addEventListener("click", function (e) {
      if (!imageContainer.contains(e.target)) {
        dropdownContent.style.opacity = 0;
        dropdownContent.style.transform = "translateY(-10px)";
        setTimeout(() => {
          dropdownContent.style.display = "none";
        }, 300); // Matches the CSS transition duration
      }
    });
  }
});

const wppButton = document.getElementById("wpp-link");
const closeButton = document.getElementById("close-bt");

if (wppButton) {
  wppButton.onclick = () => {
    wppButton.classList.add("hide-this");
  };

  closeButton.onclick = () => {
    wppButton.classList.remove("hide-this");
  };
}
