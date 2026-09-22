document.addEventListener("DOMContentLoaded", function() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });

});

document.addEventListener("DOMContentLoaded", function() {
  const alertas = document.querySelectorAll('[data-flash-message]');
  
  if (alertas.length > 0) {
    setTimeout(() => {
      alertas.forEach(alerta => {
        alerta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          alerta.remove();
        }, 600);
      });
    }, 6000);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('[data-dismiss-flash]').forEach((button) => {
    button.addEventListener('click', () => {
      const flashMessage = button.closest('[data-flash-message]');
      const notification = flashMessage.querySelector('.flash-message');

      notification.classList.add('is-leaving');
      window.setTimeout(() => flashMessage.remove(), 250);
    });
  });
});
