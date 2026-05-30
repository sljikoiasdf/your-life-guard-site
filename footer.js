/* Your Life Guard — shared site footer.
   Single source of truth: edit this once and every page updates. */

(function () {
  var year = new Date().getFullYear();

  var html =
  '<footer class="site-footer">' +
    '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html#top" aria-label="Your Life Guard home">' +
            '<span class="ylg-mark" data-logo="dark"></span>' +
            '<span class="brand-name">Your Life Guard</span>' +
          '</a>' +
          '<p>Life insurance advice that helps protect Australian families’ mortgages, income and futures.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Explore</h4>' +
          '<a href="index.html#cover">What we cover</a>' +
          '<a href="index.html#matters">Why it matters</a>' +
          '<a href="index.html#how">How it works</a>' +
          '<a href="index.html#partners">Partners</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Get in touch</h4>' +
          '<a href="tel:1300718859">1300 718 859</a>' +
          '<a href="mailto:enquiries@yourlifeguard.com.au">enquiries@yourlifeguard.com.au</a>' +
          '<a href="index.html#partners">Partner with us</a>' +
          '<a href="index.html#contact">Request a callback</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Legal</h4>' +
          '<a href="privacy-policy.html">Privacy Policy</a>' +
          '<a href="https://saveucomau.sharepoint.com/:b:/s/LifeExperts/IQAUs5DjWaDaS4wtyEu81DFpAeVQ5xB0ianDspOv0teaLDg?e=2vvRMz" target="_blank" rel="noopener">Financial Services Guide</a>' +
        '</div>' +
      '</div>' +

      '<div class="disclaimer">' +
        '<p>Copyright © ' + year + ' Your Life Guard Pty. Ltd. Your Life Guard Pty Ltd and its advisers operate as authorised representatives of Life Experts Pty Ltd ABN 35 647 911 671, Australian Financial Services Licence No. 533827. Your Life Guard and its advisers are only authorised to advise and deal in Life Insurance, Income Protection, Total and Permanent Disability and Trauma Insurance.</p>' +
        '<p>Your Life Guard only provides general advice, which means we haven’t considered your individual financial situation, objectives or needs. Before acting on it, please consider the appropriateness of the advice, having regard to these factors.</p>' +
        '<p>Before making a decision to purchase or continue to hold a life insurance product, you should read the relevant Product Disclosure Statement (PDS). The PDS contains the terms and conditions of the product and the details of the product issuer, and you should consider it prior to purchase. The Target Market Determination for each product is also available. PDSs for the financial products on this website are available by calling us on 1300 718 859 or by visiting the website of each product provider.</p>' +
        '<p>Whilst Your Life Guard attempts to provide comparisons from as many providers as possible, not all providers of insurance products are included in our comparisons. Prior to making any financial decisions regarding financial products, we highly recommend that you seek individual taxation and legal advice relevant to your particular situation.</p>' +
        '<p>Please view the <a href="https://saveucomau.sharepoint.com/:b:/s/LifeExperts/IQAUs5DjWaDaS4wtyEu81DFpAeVQ5xB0ianDspOv0teaLDg?e=2vvRMz" target="_blank" rel="noopener">Financial Services Guide here</a> and our <a href="privacy-policy.html">Privacy Policy here</a>.</p>' +
      '</div>' +
    '</div>' +
  '</footer>';

  function mount() {
    var slot = document.getElementById('ylg-footer');
    if (!slot) return;
    slot.outerHTML = html;
    if (window.LogoLab && window.LogoLab.flagShield) {
      document.querySelectorAll('.site-footer [data-logo]').forEach(function (el) {
        el.innerHTML = window.LogoLab.flagShield('color');
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
