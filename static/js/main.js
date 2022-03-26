document.addEventListener('DOMContentLoaded', function () {
  makeTableScrollable();
  ellipsisText();
  hideFooter();
})

function makeTableScrollable() {
  const tables = document.getElementsByTagName('table');
  [].slice.call(tables).forEach(function (el) {
    el.outerHTML = '<div style="overflow-x: auto">' + el.outerHTML + '</div>';
  })
}

function ellipsisText() {
  const elements = document.querySelectorAll('.home .summary');
  [].slice.call(elements).forEach(function (el) {
    const content = el.textContent;
    if (content.length > 300) {
      el.textContent = content.substring(0, 305) + ' ...';
    }
  });
}

function hideFooter() {
  if (window.location.pathname.includes('about-me')) {
    document.querySelector('.footer').style.display = 'none';
  }
}