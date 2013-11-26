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
    herf = herf.split('?')[0];
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
  }
};
