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
        html2canvas(document.querySelector('#share_card_container'), {
          onclone: function (document) {
            document.getElementById('share_card_container').style.display = 'block';
          },
        })
          .then(canvas => {
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            Fancybox.show([{
              src: `
              <p style='font-size: 16px;font-weight: bold;margin-bottom:10px;'>右键/长按以保存图片</p>
              <img src='${image}' width='300' style='border: 1px solid #f3f3f3;'>
            `, type: 'html',
            }], { click: () => void 0 });
          });
      });
  });
}
