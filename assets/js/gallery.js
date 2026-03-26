/**
 * Macro Dataset – Shared Gallery Utilities
 * Minimal shared helpers; page-specific logic lives in inline <script> blocks.
 */

/**
 * Lazy-load images that enter the viewport using IntersectionObserver.
 * Images must have data-src instead of src to opt in.
 * (Currently unused since we use loading="lazy" directly, kept for future use.)
 */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyImages);
