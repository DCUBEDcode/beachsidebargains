
// requestAnimationFrame
const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ) {
    window.setTimeout( callback, 1000 / 60 )
  }


// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}


window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above

  var form = document.getElementById("form");
  var button = document.getElementById("form-button");
  var status = document.getElementById("form-status");

  const beach = document.getElementById('beach');
  const logo = document.getElementById('logo');
  const dusk = document.getElementById('dusk');

  const scrollToBtns = document.querySelectorAll('.scroll-to');

  const placeholder = document.getElementById('instaplaceholder');

  const placeholderTop = placeholder.getBoundingClientRect().top;
  const placeholderHeight = placeholder.offsetHeight;

  let feedLoaded = false;

  beach.style.height = window.outerHeight + 'px';

  const handleScroll = () => raf( () => {
    const scrolled = Math.floor(window.scrollY);
    const duskTime = 125;

    // Start going dusk
    if (scrolled > duskTime) {
      logo.classList.add('logo--hide');
      dusk.style.opacity = 1;
    } else {
      logo.classList.remove('logo--hide');
      dusk.style.opacity = 0;
    }

    if (scrolled >= (placeholderTop - window.innerHeight) && !feedLoaded) {
      loadFeed();
    }

  })


  function loadFeed() {
    feed.run();
    feedLoaded = true;
  }

  function hidePlaceholder() {
    placeholder.style.display = 'none';
  }

  const feed = new Instafeed({
    accessToken: 'IGQVJYY1hhM2ZAtQlFMMFgwMUZAuQ1Jyc285OUhUZAkpjOTV3d1NmLXYwaWh5V25kbU5ibWk3YUtMRUw3TEZAvd0lMd0M5M3Rqd3J2Wkl4MkNzMjlpcmtwdnFtZAS1Td2lXXzNZAVE0tNVM1enJqQ3ZApSXljcgZDZD',
    limit: 5,
    apiTimeout: 10000,
    template: '<div class="hero__thumb"><a href="{{link}}"><img title="{{caption}}" src="{{image}}" /></a></div>',
    after: hidePlaceholder
  });


  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });

  window.addEventListener('scroll', handleScroll);

  if (placeholderTop < window.innerHeight) {
    loadFeed();
  }

  scrollToBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const scrollTo = e.target.dataset.scrollTo;

      document.getElementById(scrollTo).scrollIntoView({
        behavior: 'smooth'
      });
    })
  });
});

