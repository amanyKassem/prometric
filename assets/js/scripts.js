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

  // Smooth scroll function
  function smoothScroll(target) {
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 200,
      },
      500
    );
  }

  
  $("a[href^='#']").on("click", function (e) {
    var href = $(this).attr("href");
    if (href.startsWith("#")) {
      e.preventDefault();

      this.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      var target = href;
      if ($(target).length) {
        smoothScroll(target);
      }
    } 
  });

  // Scroll the active link into view on page load
  var activeLink = $(".side-menu .links .active")[0];
  if (activeLink) {
    activeLink.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  // Handle anchor click to scroll to the link with smooth scroll
  $(".side-menu .links a").on("click", function (e) {
    var href = $(this).attr("href");
    if (href.includes("#")) {
      // Handle navigation to another page with an anchor link
      var parts = href.split("#");
      var page = parts[0];
      var anchor = "#" + parts[1];

      var currentPage = window.location.pathname.split("/").pop();

      // Store the anchor in local storage
      localStorage.setItem("scrollTarget", anchor);
      localStorage.setItem("activeLinkIndex", $(this).parent().index());

      // Check if the target page is the same as the current page
      if (currentPage === page) {
        $(".side-menu .links a").removeClass("active");
        $(this).addClass("active");

        this.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });

        if ($(anchor).length) {
          smoothScroll(anchor);
        }
      }
    } else {
      // Navigate to the new page without anchor
      window.location.href = href;
    }
  });

  // Retrieve and smooth scroll to the target anchor on page load
  var scrollTarget = localStorage.getItem("scrollTarget");
  var activeLinkIndex = localStorage.getItem("activeLinkIndex");
  if (scrollTarget) {
    localStorage.removeItem("scrollTarget");
    localStorage.removeItem("activeLinkIndex");
    if ($(scrollTarget).length) {
      smoothScroll(scrollTarget);
      if (activeLinkIndex !== null) {
        $(".side-menu .links a").removeClass("active");
        $(".side-menu .links li")
          .eq(activeLinkIndex)
          .find("a")
          .addClass("active");
      }
    }
  }
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
