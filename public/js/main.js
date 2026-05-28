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

document.addEventListener("DOMContentLoaded", function() {
  // Seleciona tanto a mensagem flash quanto o quadro de erros
  const alertas = document.querySelectorAll('#flash-msg, .alert.alert-danger');
  
  if (alertas.length > 0) {
    // Define o tempo que a mensagem ficará na tela (5000 = 5 segundos)
    setTimeout(() => {
      alertas.forEach(alerta => {
        // Aplica a transição de saída via CSS inline
        alerta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateY(-10px)'; // Sobe um pouquinho enquanto some
        
        // Remove o elemento do HTML após a animação de saída terminar (600ms)
        setTimeout(() => {
          alerta.remove();
        }, 600);
      });
    }, 5000); 
  }
});