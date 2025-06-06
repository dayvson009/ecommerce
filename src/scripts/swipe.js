document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const imageIndex = document.getElementById('imageIndex'); // Novo elemento para o índice
  const indexText = document.getElementById('indexText'); // Texto do índice
  const prevButton = document.getElementById('prevButton'); // Botão de navegação esquerda
  const nextButton = document.getElementById('nextButton'); // Botão de navegação direita
  
  // Total de miniaturas (número fixo de imagens)
  const totalImages = thumbnails.length;
  
  // Armazenar o índice da imagem ativa atual
  let activeIndex = 0;

  // Função para atualizar a imagem principal
  function changeImage(url) {
      mainImage.src = url;
  }

  // Atualiza o índice da imagem abaixo da principal
  function updateImageIndex() {
    indexText.textContent = `${activeIndex + 1}/${totalImages}`;
  }

  // A cada "mouseover" nas miniaturas, atualizamos o índice ativo
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('mouseover', function () {
      activeIndex = index; // Atualiza o índice da imagem ativa
      changeImage(thumbnail.dataset.image); // Atualiza a imagem principal
      updateImageIndex(); // Atualiza o contador de índice
    });
  });

  let pullDeltaX = 0;
  let startX = 0;

  // Função para detectar a direção do swipe
  function detectSwipeDirection() {
    if (pullDeltaX > 0) {
      console.log("Swipe para a direita");
      changeImageForSwipe('left');
    } else if (pullDeltaX < 0) {
      console.log("Swipe para a esquerda");
      changeImageForSwipe('right');
    }
  }

  // Função que altera a imagem com base na direção do swipe
  function changeImageForSwipe(direction) {
    if (direction === 'right') {
      // Vai para a próxima imagem, com navegação infinita
      activeIndex = (activeIndex + 1) % totalImages;
    } else if (direction === 'left') {
      // Vai para a imagem anterior, com navegação infinita
      activeIndex = (activeIndex - 1 + totalImages) % totalImages;
    }
    
    // Atualiza a imagem principal
    changeImage(thumbnails[activeIndex].dataset.image);
    updateImageIndex(); // Atualiza o contador de índice
  }

  // Função que detecta o início do movimento
  function startDrag(e) {
    startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX; // Captura a posição inicial

    const moveHandler = (e) => {
      const x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX; // Captura a posição atual
      pullDeltaX = x - startX; // Calcular a distância do movimento
    };

    const endHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchend", endHandler);

      detectSwipeDirection(); // Detecta a direção do swipe
      pullDeltaX = 0; // Reseta a variável após o swipe
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchend", endHandler);
  }

  // Adicionando eventos para detectar swipe
  mainImage.addEventListener("mousedown", startDrag);
  mainImage.addEventListener("touchstart", startDrag);
  
  // Função para navegação com os botões de passar imagem
  prevButton.addEventListener('click', function () {
    activeIndex = (activeIndex - 1 + totalImages) % totalImages; // Vai para a imagem anterior
    changeImage(thumbnails[activeIndex].dataset.image);
    updateImageIndex();
  });

  nextButton.addEventListener('click', function () {
    activeIndex = (activeIndex + 1) % totalImages; // Vai para a próxima imagem
    changeImage(thumbnails[activeIndex].dataset.image);
    updateImageIndex();
  });

  // Inicializa o índice
  updateImageIndex();
});
