
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
  const night = document.getElementById('night');

  const scrollToBtns = document.querySelectorAll('.scroll-to');

  beach.style.height = window.outerHeight + 'px';

  const handleScroll = () => raf( () => {
      const scrolled = Math.floor(window.scrollY);

      // Start going dusk
      if (scrolled > 100) {
        logo.classList.add('logo--hide');
        night.style.opacity = 1;
      } else {
        logo.classList.remove('logo--hide');
        night.style.opacity = 0;
      }
    })

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

