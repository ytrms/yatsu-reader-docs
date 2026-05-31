(function () {
  var sidebarFrame = 0;

  function anchorScrollwrapsToBottom(scrollwraps) {
    scrollwraps.forEach(function (scrollwrap) {
      scrollwrap.scrollTop = scrollwrap.scrollHeight - scrollwrap.clientHeight;
    });
  }

  function updateSidebarHeight() {
    var sidebar = document.querySelector(".md-sidebar--primary:not([hidden]), .md-sidebar--secondary:not([hidden])");
    var footer = document.querySelector(".md-footer");

    if (!sidebar || !footer || !window.matchMedia("(min-width: 1220px)").matches) {
      document.documentElement.style.removeProperty("--yatsu-sidebar-visible-height");
      return;
    }

    var sidebarTop = Math.max(0, sidebar.getBoundingClientRect().top);
    var footerTop = footer.getBoundingClientRect().top;
    var fullHeight = window.innerHeight - sidebarTop;
    var footerGap = 16;
    var visibleHeight = Math.min(fullHeight, footerTop - sidebarTop - footerGap);
    var footerIsReducingHeight = visibleHeight < fullHeight - 1;
    var bottomAnchoredScrollwraps = Array.prototype.filter.call(
      document.querySelectorAll(".md-sidebar__scrollwrap"),
      function (scrollwrap) {
        var maxScrollTop = scrollwrap.scrollHeight - scrollwrap.clientHeight;
        var isAtBottom = maxScrollTop > 0 && scrollwrap.scrollTop >= maxScrollTop - 2;

        if (!footerIsReducingHeight) {
          scrollwrap.dataset.yatsuStickToBottom = isAtBottom ? "true" : "false";
        } else if (isAtBottom) {
          scrollwrap.dataset.yatsuStickToBottom = "true";
        }

        return footerIsReducingHeight && scrollwrap.dataset.yatsuStickToBottom === "true";
      }
    );

    document.documentElement.style.setProperty(
      "--yatsu-sidebar-visible-height",
      Math.max(0, Math.floor(visibleHeight)) + "px"
    );

    anchorScrollwrapsToBottom(bottomAnchoredScrollwraps);
    window.requestAnimationFrame(function () {
      anchorScrollwrapsToBottom(bottomAnchoredScrollwraps);
    });
  }

  function scheduleSidebarHeightUpdate() {
    if (sidebarFrame) {
      return;
    }

    sidebarFrame = window.requestAnimationFrame(function () {
      sidebarFrame = 0;
      updateSidebarHeight();
    });
  }

  function startSidebarHeightUpdates() {
    updateSidebarHeight();
    scheduleSidebarHeightUpdate();
  }

  window.addEventListener("scroll", scheduleSidebarHeightUpdate, { passive: true });
  window.addEventListener("resize", scheduleSidebarHeightUpdate);

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(startSidebarHeightUpdates);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startSidebarHeightUpdates);
  } else {
    startSidebarHeightUpdates();
  }
})();
