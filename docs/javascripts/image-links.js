(function () {
  function linkDocumentationImages() {
    document.querySelectorAll(".md-typeset img").forEach(function (image) {
      if (image.closest("a")) {
        return;
      }

      var source = image.currentSrc || image.getAttribute("src");
      if (!source) {
        return;
      }

      var link = document.createElement("a");
      link.className = "yatsu-image-link";
      link.href = new URL(source, document.baseURI).href;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", "Open image: " + (image.alt || "documentation image"));

      image.parentNode.insertBefore(link, image);
      link.appendChild(image);
    });
  }

  var sidebarFrame = 0;

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

    document.documentElement.style.setProperty(
      "--yatsu-sidebar-visible-height",
      Math.max(0, Math.floor(visibleHeight)) + "px",
    );
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
    window.document$.subscribe(function () {
      linkDocumentationImages();
      startSidebarHeightUpdates();
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      linkDocumentationImages();
      startSidebarHeightUpdates();
    });
  } else {
    linkDocumentationImages();
    startSidebarHeightUpdates();
  }
})();
