document.addEventListener('DOMContentLoaded', function () {
  makeTableScrollable();
  hideFooter();
})

function makeTableScrollable() {
  const tables = document.getElementsByTagName('table');
  [].slice.call(tables).forEach(function (el) {
    el.outerHTML = '<div style="overflow-x: auto">' + el.outerHTML + '</div>';
  })
}

function hideFooter() {
  if (window.location.pathname.includes('about-me')) {
    document.querySelector('.footer').style.display = 'none';
  }
}