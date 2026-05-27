// public/js/main.js

document.addEventListener("DOMContentLoaded", function() {
  
  // Seleciona todos os elementos que devem ter a animação
  const revealElements = document.querySelectorAll('.reveal');

  // Configurações do Observador
  const observerOptions = {
    root: null, // Usa a área visível do navegador como referência
    rootMargin: '0px 0px -100px 0px', // Ativa 100px ANTES de entrar na tela (evita cortes)
    threshold: 0.1 // Ativa quando 10% do elemento já estiver visível
  };

  // Cria o Observador
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se o elemento ESTÁ visível na área de observação
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Se saiu, remove para permitir animação de entrada na próxima vez
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  // Começa a observar cada elemento
  revealElements.forEach(element => {
    observer.observe(element);
  });

});