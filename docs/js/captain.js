// document.ready will execute twice, declare this flag for judge
// must be declared via 'var' keyword
var MOUNTED = false;

$(function () {
  if (!MOUNTED) {
    MOUNTED = true;

    highlightCode();
    makeTableScrollable();
    splitText();
    bindBackToTopEvent();
    bindFancybox();
    shareBlog();
    bindClickToSaveEvent();
  }
});

function highlightCode() {
  hljs.highlightAll();
}

function makeTableScrollable() {
  const tables = document.getElementsByTagName('table');
  if (tables.length) {
    for (let i = 0; i < tables.length; i++) {
      tables[i].outerHTML = '<div style="overflow-x: auto">' + tables[i].outerHTML + '</div>';
    }
  }
}

function splitText() {
  const element = $('.post_content > p');
  element.each(function (index, el) {
    const content = el.textContent;
    if (content.length > 300) {
      el.textContent = content.substring(0, 305) + ' ...';
    }
  });
}

function bindBackToTopEvent() {
  const $backToTop = $('#back_to_top');
  $(window).on('scroll', function () {
    const scrollY = window.scrollY;
    const display = $backToTop.css('display');
    if (scrollY < 30) {
      return $backToTop.css('display', 'none');
    }
    if (display === 'none') {
      return $backToTop.css('display', 'block');
    }
  });
  $backToTop.on('click', function () {
    $('body,html').animate({
      scrollTop: 0,
    }, 800);
    return false;
  });
}

function bindFancybox() {
  Fancybox.bind('[data-fancybox="gallery"]');
}

function shareBlog() {
  $('#share_blog').on('click', function () {
    QRCode.toDataURL(encodeURI(location.href), { margin: 0 })
      .then(url => {
        const text = $('.post_content').text();
        $('#title').html($('.post_title h1').text());
        $('#author').html('CaptainOfPhB');
        $('#summary').text(text.substring(0, 200) + ' ...');
        $('#qrcode').attr('src', url);
        Fancybox.show(
          [{
            src: '#share_card_container',
            type: 'inline',
          }],
          { click: () => void 0 },
        );
      });
  });
}

function bindClickToSaveEvent() {
  $('#download').on('click', function () {
    html2canvas(
      document.querySelector('#share_card_container'),
      {
        ignoreElements: function (el) {
          return el.id === 'download';
        },
      })
      .then(canvas => {
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        Fancybox.close();
        Fancybox.show(
          [{
            src: image,
            type: 'image',
          }],
          { click: () => void 0 },
        );
      });
  });
}

