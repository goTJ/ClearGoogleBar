function addGaScript() {
  var head = document.getElementsByTagName('head')[0];
  var e = document.createElement('script');
  e.setAttribute('type','text/javascript');
  e.innerHTML = 
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','_cleargooglebar_ga');\n" +
    "_cleargooglebar_ga('create', 'UA-45967685-1');\n" +
    "_cleargooglebar_ga('set', 'page', '/' + window.location.hostname + window.location.pathname + window.location.search);\n" +
    "_cleargooglebar_ga('send', 'pageview');\n";
  head.appendChild(e);
}

window.onload = function RemoveIcons() {
  var share_url = 'https://plus.google.com/u/0/stream/all';
  var plus_url = 'https://plus.google.com/u/0/';
  var plus_me_url = 'https://plus.google.com/u/0/me';
  var share_element = null;
  var plus_element = null;
  var plus_me_element = null;

  // Get two icons in Google bar.
  // One should be in the left side, the other should be in the right side.
  // plus_me is for old Google bar.
  var elements = document.getElementsByTagName('a');
  for (var i = 0; i < elements.length; i++) {
    var href = elements[i].getAttribute('href');
    if (href == null)
      continue;
    href = href.split('?')[0];
    if (share_element == null && href == share_url) {
      share_element = elements[i];
    } else if (plus_element == null && href == plus_url) {
      plus_element = elements[i];
    } else if (plus_me_element == null && href == plus_me_url) {
      plus_me_element = elements[i];
    }
  }
  // Replace plus_element if it's old Google bar.
  if (plus_me_element != null && plus_element.parentNode.tagName == 'LI')
    plus_element = plus_me_element;

  // Find the nearest common parent of these two icons.
  // Assume the width of an ancestor must be greater than or equal to its descendants.
  var common_ancestor = null;
  var share_ancestor = share_element;
  var plus_ancestor = plus_element;
  while (share_ancestor != null && plus_ancestor != null) {
    if (share_ancestor == plus_ancestor) {
      common_ancestor = share_ancestor;
      break;
    }
    if (share_ancestor.clientWidth < plus_ancestor.clientWidth) {
      share_ancestor = share_ancestor.parentNode;
    } else {
      plus_ancestor = plus_ancestor.parentNode;
    }
  }

  if (common_ancestor != null && common_ancestor.parentNode != null) {
    common_ancestor.parentNode.removeChild(common_ancestor);
    addGaScript();
  }
};
