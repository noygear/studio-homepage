(function () {
  var html = '\n  <div class="footer-brand">\n' +
    '    <div class="footer-logo">Noygear</div>\n' +
    '    <div class="footer-tag">An Aware Partners venture studio · Permanent capital · No fund clock</div>\n' +
    '    <div class="footer-links"><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></div>\n' +
    '  </div>\n' +
    '  <div class="footer-meta">No public solicitation. Inquiries only.</div>\n';
  function render() {
    var el = document.querySelector('footer.site-footer');
    if (el) el.innerHTML = html;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
