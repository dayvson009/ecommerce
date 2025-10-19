const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Função para carregar produtos do JSON
function carregarProdutos() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../produtos.json'), 'utf8');
    const produtosData = JSON.parse(data);
    return produtosData.produtos;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

// Função para carregar dados dos pedidos
function carregarPedidos() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../pedidos.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
    return { pedidos: [], clientes: [], produtos_digitais: {}, produtos_fisicos: {} };
  }
}

// Função para salvar dados dos pedidos
function salvarPedidos(dados) {
  try {
    fs.writeFileSync(path.join(__dirname, '../pedidos.json'), JSON.stringify(dados, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar pedidos:', error);
    return false;
  }
}

// Função para criar um novo pedido
function criarPedido(orderId, produto, cliente, status = 'aprovado', plataforma = 'kiwify') {
  const dados = carregarPedidos();
  const novoPedido = {
    id: Date.now().toString(),
    order_id: orderId,
    produto: {
      id: produto.id,
      name: produto.name,
      google_drive_folder: produto.google_drive_folder
    },
    cliente: {
      email: cliente.email,
      nome: cliente.full_name || cliente.nome,
      telefone: cliente.mobile || cliente.telefone
    },
    status: status,
    plataforma: plataforma,
    data_criacao: new Date().toISOString(),
    valor_total: produto.skus.data[0].price_discount,
    tipo_produto: produto.tipo || 'digital'
  };
  
  dados.pedidos.push(novoPedido);
  salvarPedidos(dados);
  return novoPedido;
}

// Função para atualizar status do pedido
function atualizarStatusPedido(orderId, novoStatus) {
  const dados = carregarPedidos();
  const pedido = dados.pedidos.find(p => p.order_id === orderId);
  
  if (pedido) {
    pedido.status = novoStatus;
    pedido.data_atualizacao = new Date().toISOString();
    salvarPedidos(dados);
    return pedido;
  }
  return null;
}

// Função para liberar acesso do cliente
function liberarAcessoCliente(cliente, produto) {
  const dados = carregarPedidos();
  
  // Verificar se cliente já existe
  let clienteExistente = dados.clientes.find(c => c.email === cliente.email);
  
  if (!clienteExistente) {
    // Criar novo cliente
    clienteExistente = {
      id: Date.now().toString(),
      email: cliente.email,
      nome: cliente.full_name || cliente.nome,
      telefone: cliente.mobile || cliente.telefone,
      data_cadastro: new Date().toISOString(),
      status: 'ativo',
      produtos_comprados: []
    };
    
    dados.clientes.push(clienteExistente);
  }
  
  // Adicionar produto aos produtos comprados
  const produtoJaComprado = clienteExistente.produtos_comprados.find(p => p.id === produto.id);
  if (!produtoJaComprado) {
    clienteExistente.produtos_comprados.push({
      id: produto.id,
      nome: produto.name,
      data_compra: new Date().toISOString(),
      status: 'ativo'
    });
  }
  
  salvarPedidos(dados);
  return clienteExistente;
}

// Rota para obter URLs de checkout - REMOVIDA (não é mais necessária)
// Os links agora são passados diretamente do backend para o frontend

// Webhook da Kiwify para pagamentos aprovados
router.post('/webhook/kiwify', async (req, res) => {
  try {
    console.log('Webhook Kiwify recebido:', JSON.stringify(req.body, null, 2));
    
    const webhookData = req.body;
    
    // Verificar se é um pagamento aprovado
    if (webhookData.webhook_event_type === 'order_approved' && webhookData.order_status === 'paid') {
      console.log('✅ Pagamento aprovado na Kiwify!');
      
      // Extrair informações do webhook
      const orderId = webhookData.order_id;
      const customer = webhookData.Customer;
      const product = webhookData.Product;
      
    // Encontrar o produto correspondente
    const produtos = carregarProdutos();
    const produto = produtos.find(p => p.id_kiwify.includes(product.product_id.toLowerCase()));
      
      if (produto) {
        // Criar pedido
        const pedido = criarPedido(orderId, produto, customer, 'aprovado', 'kiwify');
        
        // Liberar acesso do cliente
        const clienteLiberado = liberarAcessoCliente(customer, produto);
        
        console.log('🎉 Acesso liberado para:', customer.email);
        console.log('📦 Produto:', produto.name);
        console.log('💰 Valor:', webhookData.Commissions?.product_base_price / 100);
        
        // Aqui você pode adicionar:
        // - Envio de email com dados de acesso
        // - Notificação por WhatsApp
        // - Integração com sistema de login
        // - etc.
        
      } else {
        console.log('⚠️ Produto não encontrado:', product.product_name);
      }
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro no webhook Kiwify:', error);
    res.status(500).send('Erro interno');
  }
});


// Rota para página de acesso à área de membros (com upsell) - GENÉRICA
router.get('/member-access', (req, res) => {
  res.render('member-access', {
    title: 'Acesso Liberado!',
    pedido: null,
    cliente: null,
    produto: null
  });
});

// Rota para página de sucesso (redirecionamento após compra)
router.get('/success', (req, res) => {
  res.render('success', {
    title: 'Compra Realizada!',
    message: 'Sua compra foi processada com sucesso! Você receberá um email com os dados de acesso.'
  });
});

module.exports = router;
