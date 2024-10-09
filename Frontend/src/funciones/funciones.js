document.addEventListener("DOMContentLoaded", () => {
    let navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        let navbarToggler = document.querySelector('.navbar-toggler');
        if (!navbarToggler.classList.contains('collapsed')) {
          navbarToggler.click();
        }
      });
    });
  });