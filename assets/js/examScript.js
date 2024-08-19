$(document).ready(function () {
  // section timer count down
  // Set the initial time
  let timeRemaining = "00:39:36";

  // Convert time string to seconds
  function timeToSeconds(time) {
    const parts = time.split(":");
    return +parts[0] * 3600 + +parts[1] * 60 + +parts[2];
  }

  // Convert seconds to time string
  function secondsToTime(seconds) {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  let totalSeconds = timeToSeconds(timeRemaining);

  // Update the countdown every second
  const countdown = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      return;
    }
    totalSeconds -= 1;
    $(".time-remaining").text(secondsToTime(totalSeconds));
  }, 1000);

  // ============================================================ //
  // section break timer count down
  $("#finishSectionModal , #filterQuestionsModal").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#finishSectionModal").on("shown.bs.modal", function () {
    let breakTimeInMinutes = 30;
    let breakTimeInSeconds = breakTimeInMinutes * 60;
    const breakTimeCounter = $(".break-time-counter");

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(
        2,
        "0"
      )} : ${String(remainingSeconds).padStart(2, "0")} Min`;
    }

    function updateBreakTimeCounter() {
      breakTimeCounter.text(formatTime(breakTimeInSeconds));
      if (breakTimeInSeconds > 0) {
        breakTimeInSeconds--;
        setTimeout(updateBreakTimeCounter, 1000);
      }
    }

    updateBreakTimeCounter();

    // Hide the modal and navigate to index.html after 30 seconds
    setTimeout(function () {
      $("#finishSectionModal").modal("hide");
      window.location.href = "index.html";
    }, 3000);
  });
  // ============================================================ //

  // change theme color
  function applyTheme(theme) {
    $("body")
      .removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-\S+/g) || []).join(" ");
      })
      .addClass(theme);
  }

  // Apply the theme from localStorage if it exists
  var savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    applyTheme(savedTheme);
    $('input[value="' + savedTheme + '"]').prop("checked", true);
  }

  // Listen for theme changes
  $('input[name="theme"]').on("change", function () {
    var selectedTheme = $(this).val();
    localStorage.setItem("selectedTheme", selectedTheme);
    applyTheme(selectedTheme);
  });

  // ============================================================ //

  //   tabs functionality
  // Tabs functionality

  function updateTabClasses() {
    $(".nav-link").each(function () {
      var tabId = $(this).attr("data-bs-target");
      var questionBlock = $(tabId).find(".question-block");

      // Debugging: Log the current state
      console.log(`Updating tab ${$(this).attr("id")}...`);

      // Check for visited state
      if (questionBlock.find(".form-check-ques-input:checked").length > 0) {
        $(this).addClass("visited");
      } else {
        $(this).removeClass("visited");
      }

      // Check for flagged state based on the class of the tab
      if ($(this).hasClass("flagged")) {
        questionBlock.addClass("flagged");
      } else {
        questionBlock.removeClass("flagged");
      }

      // Check for unresolved state
      if (questionBlock.find(".form-check-ques-input:checked").length === 0) {
        $(this).addClass("unresolved");
      } else {
        $(this).removeClass("unresolved");
      }

      // Debugging: Log the updated classes
      console.log(
        `Tab ${$(this).attr("id")} classes: ${$(this).attr("class")}`
      );
    });
  }
  updateTabClasses();

  $(".form-check-ques-input").on("change", function () {
    updateTabClasses();
  });

  var currentTab = 2;
  var tabs = $("#v-pills-tab .nav-link");
  var tabContents = $("#v-pills-tabContent .tab-pane");

  function showTab(index) {
    tabs.removeClass("active");
    tabContents.removeClass("show active");

    $(tabs[index]).addClass("active");
    $(tabContents[index]).addClass("show active");

    $("#backBtn").prop("disabled", index === 0);
    $("#nextBtn").html(
      index === tabs.length - 1
        ? "Submit"
        : 'Next <i class="fa-solid fa-chevron-right ms-2"></i>'
    );
  }

  $("#nextBtn").click(function () {
    if (currentTab < tabs.length - 1) {
      currentTab++;
      showTab(currentTab);
    } else {
      alert("Form submitted!");
    }
  });

  $("#backBtn").click(function () {
    if (currentTab > 0) {
      currentTab--;
      showTab(currentTab);
    }
  });

  showTab(currentTab);

  // ============================================================ //

  // Handle right-click on the label (Desktop)
  // Determine the platform
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Set the timeout duration based on the platform
  const longPressDuration = isAndroid ? 3000 : 500; // Adjust the values as needed

  // Handle right-click on the label (Desktop)
  $(document).on("contextmenu", ".btn-check-answer", function (event) {
    event.preventDefault(); // Prevent the default right-click menu
    event.stopPropagation(); // Stop the event from bubbling up

    // Toggle the strike-through class
    $(this).toggleClass("strike-through");
  });

  // Handle long-press on the label (Mobile)
  let touchTimeout;

  $(document).on("touchstart", ".btn-check-answer", function (event) {
    const $this = $(this);

    touchTimeout = setTimeout(function () {
      $this.toggleClass("strike-through");
    }, longPressDuration);
  });

  $(document).on("touchend touchmove", ".btn-check-answer", function (event) {
    clearTimeout(touchTimeout);
  });

  // Handle left-click on the radio button
  $(document).on("click", ".form-check-ques-input", function () {
    // Add line-through style to the currently selected option (if it was right-clicked or long-pressed)
    var selectedLabel = $(this).next(".btn-check-answer");
    if (selectedLabel.hasClass("strike-through")) {
      selectedLabel.removeClass("strike-through");
    }
  });

  // ============================================================ //
  //     textarea limit
  $(".limited-textarea").keyup(function () {
    var characterCount = $(this).val().length,
      current = $("#current"),
      maximum = $("#maximum"),
      theCount = $("#limit-text");

    current.text(characterCount);

    if (characterCount > 450) {
      maximum.css("color", "#f00");
      current.css("color", "#f00");
      theCount.css("font-weight", "bold");
    } else {
      maximum.css("color", "#313131");
      current.css("color", "#313131");
      theCount.css("font-weight", "normal");
    }
  });

  // ============================================================ //
  $(".add-report").click(function () {
    const currentTab = $("#v-pills-tab .nav-link.active");
    const flagIcon = '<i class="fa-solid fa-flag ms-2 flag-icon"></i>';

    // Toggle flag icon and class
    if (currentTab.find(".flag-icon").length > 0) {
      currentTab.find(".flag-icon").remove();
      currentTab.removeClass("flagged");
    } else {
      currentTab.append(flagIcon);
      currentTab.addClass("flagged");
    }

    updateTabClasses();
  });

  // ============================================================ //
  // filter tabs
  $('input[name="filterOptions"]').change(function () {
    const selectedFilter = $('input[name="filterOptions"]:checked').val();
    const filteredTabsContainer = $("#filteredTabsContainer");

    filteredTabsContainer.empty();

    if (selectedFilter) {
      $(".nav-link").each(function () {
        const tabNumber = $(this).text().trim();
        const classes = $(this).attr("class").split(" ");

        let shouldAppend = false;
        let filterClass = selectedFilter + "-ques";
        let flagIcon = "";

        // Check for specific class combinations
        if (selectedFilter === "flagged") {
          if (classes.includes("visited") && classes.includes("flagged")) {
            shouldAppend = true;
            filterClass = "visited-flagged-ques";
            flagIcon = '<i class="fa-solid fa-flag ms-2 flag-icon"></i>';
          } else if (
            classes.includes("unresolved") &&
            classes.includes("flagged")
          ) {
            shouldAppend = true;
            filterClass = "unresolved-flagged-ques";
            flagIcon = '<i class="fa-solid fa-flag ms-2 flag-icon"></i>';
          } else if (classes.includes("flagged")) {
            shouldAppend = true;
            filterClass = "flagged-ques";
            flagIcon = '<i class="fa-solid fa-flag ms-2 flag-icon"></i>';
          }
        } else if (classes.includes(selectedFilter)) {
          shouldAppend = true;
          if (classes.includes("flagged")) {
            flagIcon = '<i class="fa-solid fa-flag ms-2 flag-icon"></i>';
          }
        }

        // Append the filtered tab
        if (shouldAppend) {
          filteredTabsContainer.append(
            `<div class="filtered-tab ${filterClass} mt-2">${tabNumber}${flagIcon}</div>`
          );
        }
      });
    }
  });

  $(".clear-filter").click(function () {
    // Uncheck all radio buttons
    $("input[name='filterOptions']").prop("checked", false);

    // Clear the filtered tabs container
    $("#filteredTabsContainer").empty();
  });

  // ============================================================ //
  // highlight selected text
  function addHighlightListener(eventType) {
    document.addEventListener(eventType, function (event) {
      var selection = window.getSelection();
      if (selection.toString().length > 0) {
        var range = selection.getRangeAt(0);
        var commonAncestorContainer = range.commonAncestorContainer;

        // Check if the common ancestor is within a .question-block
        if ($(commonAncestorContainer).closest(".question-block").length > 0) {
          highlightSelection(selection);
        }
      }
    });
  }

  addHighlightListener("mouseup");
  addHighlightListener("touchend");

  function highlightSelection(selection) {
    var range = selection.getRangeAt(0);
    var span = document.createElement("span");
    span.className = "highlight";
    span.style.backgroundColor = "yellow";

    range.surroundContents(span);
  }

  // ============================================================ //

  // calculator

  function calculator() {
    var sum = "";
    var len;
    //var arr= [];
    var operators = ["+", "-", "*", "/"];
    var inputVal = document.getElementById("screen");
    $(".buttons .digit").on("click", function () {
      var num = $(this).attr("value");
      sum += num;
      //arr.push(num);
      $("#screen").html(sum);
      len = inputVal.innerHTML.split("");
      console.log(len);
      //console.log(arr);
    });
    $(".buttons .operator").on("click", function (e) {
      e.preventDefault();
      var ops = $(this).attr("value");
      sum += ops;
      //arr.push(num);
      $("#screen").html(sum);
      len = inputVal.innerHTML;
      if (/(?=(\D{2}))/g.test(sum)) {
        sum = len.substring(0, len.length - 1);
        $("#screen").html(sum);
      }
      //len = inputVal.innerHTML.split("");
      //console.log(len);

      //console.log(arr);
    });

    $("#equal").on("click", function () {
      var total = eval(sum);
      //$("#screen").attr('value', total);
      $("#screen").html(total % 1 != 0 ? total.toFixed(2) : total);
    });

    $("#clear").on("click", function () {
      sum = "";
      arr = [];
      $("#screen").html(0);
    });
  }
  calculator();
});
