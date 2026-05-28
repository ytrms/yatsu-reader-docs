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

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(linkDocumentationImages);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", linkDocumentationImages);
  } else {
    linkDocumentationImages();
  }
})();
