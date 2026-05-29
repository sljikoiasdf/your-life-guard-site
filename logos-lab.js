/* Your Life Guard — brand marks */
window.LogoLab = (function () {
  var RED = '#DE3939', YEL = '#FAEE38', YEL2 = '#EFC610', INK = '#16181D', W = '#FFFFFF';
  var SHIELD = 'M32 4 L55 12 V29 C55 43.5 45.2 53.4 32 60 C18.8 53.4 9 43.5 9 29 V12 Z';
  function svg(inner) { return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + '</svg>'; }
  function uid(p) { return p + Math.random().toString(36).slice(2, 7); }
  function flagShield(mode) {
    if (mode === 'ink' || mode === 'reverse') {
      var c = mode === 'ink' ? INK : W, k = mode === 'ink' ? W : INK;
      return svg('<path d="' + SHIELD + '" fill="' + c + '"/>' + '<circle cx="32" cy="30" r="11" fill="' + k + '"/>' + '<path d="M32 24V36M26 30H38" stroke="' + c + '" stroke-width="4.4" stroke-linecap="round"/>');
    }
    var id = uid('fs');
    return svg('<defs><clipPath id="' + id + '"><path d="' + SHIELD + '"/></clipPath></defs>' + '<g clip-path="url(#' + id + ')">' + '<rect x="9" y="4" width="46" height="56" fill="' + YEL2 + '"/>' + '<polygon points="9,12 55,12 9,49" fill="' + RED + '"/>' + '</g>' + '<circle cx="32" cy="30" r="11.5" fill="#fff"/>' + '<path d="M32 24V36M26 30H38" stroke="' + RED + '" stroke-width="4.6" stroke-linecap="round"/>');
  }
  return { flagShield: flagShield };
})();
