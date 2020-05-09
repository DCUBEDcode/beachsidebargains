const beach = document.getElementById('beach');
const logo = document.getElementById('logo');
const night = document.getElementById('night');

beach.style.height = window.outerHeight + 'px';

const handleScroll = () => raf( () => {
    console.log(Math.floor(window.scrollY));
    const scrolled = Math.floor(window.scrollY);
    logo.style.transform = 'translateY(' + scrolled + 'px)';
    if (scrolled > 100) {
      night.style.opacity = 1;
    } else {
      night.style.opacity = 0;
    }
  })

// requestAnimationFrame
const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function( callback ) {
    window.setTimeout( callback, 1000 / 60 )
  }

window.addEventListener('scroll', handleScroll);
