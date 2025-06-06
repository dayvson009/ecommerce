// Seleção dos elementos
  const decreaseButton = document.getElementById('decrease-btn');
  const increaseButton = document.getElementById('increase-btn');
  const quantityInput = document.getElementById('quantity');
  const buttonOptions = document.querySelectorAll('.button-option');
  const priceBeforeElement = document.getElementById("priceBefore");
  const priceElement = document.getElementById("price");
  const buttonBuy = document.getElementById("buttonBuy");
  const mainImage = document.getElementById('mainImage');
  const buttonBuyWhatsapp = document.getElementById("buttonBuyWhatsapp");
  const whatsapplink = "https://wa.me/5581984319706?text=Preciso%20de%20ajuda%20para%20o%20produto%20";

  function getLinkSeparate(element){
    const url = element.href;

    const regex = /(https:\/\/[^\/]+\/r\/)([^:]+):(\d+)/;
      const match = url.match(regex);

      // Verificando se a correspondência foi encontrada e exibindo as partes
      if (match) {
        const part1 = match[1];  // Parte 1: https até /r/
        const part2 = match[2];  // Parte 2: entre /r/ e :1
        const part3 = match[3];  // Parte 3: depois do :
        return [part1, part2, part3];
      } else {
        console.log("Não encontrado!");
      }
  }

  function changeImage(url) {
    mainImage.src = url;
  }

  buttonOptions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttonOptions.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      changeImage(e.target.dataset.image);
      
      priceBeforeElement.innerHTML = "R$ "+parseFloat(e.target.dataset.priceBefore).toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 2});

      priceElement.innerHTML = "R$ "+parseFloat(e.target.dataset.priceCurrent).toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 2});

      quantityInput.setAttribute('max', e.target.dataset.stoke)

      quantityInput.value=1;

      const linkbuy = getLinkSeparate(buttonBuy);

      buttonBuy.href = linkbuy[0]+e.target.dataset.sku+":"+linkbuy[2];
      buttonBuyWhatsapp.href = whatsapplink+linkbuy[0]+e.target.dataset.sku+":"+linkbuy[2];

      setCountButtonBuy();

    })
  })
  
  function setCountButtonBuy(){
    const linkbuy = getLinkSeparate(buttonBuy);
    buttonBuy.href = linkbuy[0]+linkbuy[1]+":"+quantityInput.value;
    buttonBuyWhatsapp.href = whatsapplink+linkbuy[0]+linkbuy[1]+":"+quantityInput.value;
  }

  // Função para diminuir a quantidade
  decreaseButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {  // Evita que o valor fique menor que 1
      quantityInput.value = currentValue - 1;
      setCountButtonBuy();
    }
  });

  // Função para aumentar a quantidade
  increaseButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    let maxQuantity = parseInt(quantityInput.getAttribute('max')); // Obtém o valor max do atributo 'max'
    
    if (currentValue < maxQuantity) {  // Evita que ultrapasse o valor máximo
      quantityInput.value = currentValue + 1;
      setCountButtonBuy();
    }
  });

  // Se o usuário alterar manualmente o valor no input
  quantityInput.addEventListener('input', () => {
    let currentValue = quantityInput.value.trim();
    let maxQuantity = parseInt(quantityInput.getAttribute('max')); // Obtém o valor max do atributo 'max'
    if (!/^\d+$/.test(currentValue)) {
      quantityInput.value = 1;  // Se o valor não for um número válido, ajusta para 1
      setCountButtonBuy()
    } else {
      if (currentValue < 1 || isNaN(currentValue)) {
        quantityInput.value = 1;  // Se o valor for inválido ou menor que 1, ajusta para 1
        setCountButtonBuy()
      } else if (currentValue > maxQuantity) {
        quantityInput.value = maxQuantity;  // Se ultrapassar o valor máximo, ajusta para o valor máximo
        setCountButtonBuy()
      }else{
        setCountButtonBuy()
      }
    }

  });

