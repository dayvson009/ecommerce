const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Função para carregar dados dos pedidos
function carregarPedidos() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../pedidos.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
    return { pedidos: [], clientes: [] };
  }
}

// Função para gerar token simples
function gerarToken(email) {
  return Buffer.from(email + '_' + Date.now()).toString('base64');
}

// Função para validar token
function validarToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [email] = decoded.split('_');
    return email;
  } catch (error) {
    return null;
  }
}

// Middleware para verificar autenticação
function verificarAuth(req, res, next) {
  const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    // Se for uma requisição de página, redirecionar para login
    if (req.accepts('html')) {
      return res.redirect('/cliente/login');
    }
    return res.status(401).json({ error: 'Token de autenticação necessário' });
  }
  
  const email = validarToken(token);
  if (!email) {
    // Se for uma requisição de página, redirecionar para login
    if (req.accepts('html')) {
      return res.redirect('/cliente/login');
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  req.userEmail = email;
  next();
}

// Rota para login (buscar pedidos por email)
router.post('/login', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }
    
    const dados = carregarPedidos();
    const pedidosCliente = dados.pedidos.filter(pedido => 
      pedido.cliente.email.toLowerCase() === email.toLowerCase()
    );
    
    if (pedidosCliente.length === 0) {
      return res.status(404).json({ error: 'Nenhum pedido encontrado para este email' });
    }
    
    // Gerar token de autenticação
    const token = gerarToken(email);
    
    // Definir cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });
    
    res.json({
      success: true,
      token: token,
      pedidos: pedidosCliente.length,
      message: 'Login realizado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar pedidos do cliente autenticado
router.get('/meus-pedidos', verificarAuth, (req, res) => {
  try {
    const dados = carregarPedidos();
    const pedidosCliente = dados.pedidos.filter(pedido => 
      pedido.cliente.email.toLowerCase() === req.userEmail.toLowerCase()
    );
    
    res.json({
      success: true,
      pedidos: pedidosCliente,
      total: pedidosCliente.length
    });
    
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar detalhes de um pedido específico
router.get('/pedido/:id', verificarAuth, (req, res) => {
  try {
    const { id } = req.params;
    const dados = carregarPedidos();
    
    const pedido = dados.pedidos.find(p => 
      p.id === id && p.cliente.email.toLowerCase() === req.userEmail.toLowerCase()
    );
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    res.json({
      success: true,
      pedido: pedido
    });
    
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para página de login
router.get('/login', (req, res) => {
  res.render('cliente-login', {
    title: 'Área do Cliente - Login'
  });
});

// Rota para página de pedidos
router.get('/pedidos', verificarAuth, (req, res) => {
  res.render('cliente-pedidos', {
    title: 'Meus Pedidos'
  });
});

// Rota para página de detalhes do pedido
router.get('/pedido/:id', verificarAuth, (req, res) => {
  res.render('cliente-detalhes', {
    title: 'Detalhes do Pedido'
  });
});

// Rota para download de arquivo (apenas para produtos digitais aprovados)
router.get('/download/:pedidoId', verificarAuth, (req, res) => {
  try {
    const { pedidoId } = req.params;
    const dados = carregarPedidos();
    
    // Buscar o pedido
    const pedido = dados.pedidos.find(p => 
      p.id === pedidoId && 
      p.cliente.email.toLowerCase() === req.userEmail.toLowerCase()
    );
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    // Verificar se o pedido está aprovado
    if (pedido.status !== 'aprovado') {
      return res.status(403).json({ error: 'Pedido não aprovado para download' });
    }
    
    // Verificar se é produto digital
    if (pedido.tipo_produto !== 'digital') {
      return res.status(404).json({ error: 'Produto não é digital' });
    }
    
    // Redirecionar para o Google Drive
    if (pedido.produto.google_drive_folder) {
      const googleDriveUrl = `https://drive.google.com/drive/folders/${pedido.produto.google_drive_folder}`;
      res.redirect(googleDriveUrl);
    } else {
      res.status(404).json({ error: 'Link de download não disponível' });
    }
    
  } catch (error) {
    console.error('Erro no download:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

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

// Rota para atualizar status do pedido (admin)
router.post('/admin/atualizar-status', (req, res) => {
  try {
    const { orderId, novoStatus } = req.body;
    
    if (!orderId || !novoStatus) {
      return res.status(400).json({ error: 'Order ID e novo status são obrigatórios' });
    }
    
    const dados = carregarPedidos();
    const pedido = dados.pedidos.find(p => p.order_id === orderId);
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    // Atualizar status
    pedido.status = novoStatus;
    
    salvarPedidos(dados);
    
    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      pedido: pedido
    });
    
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para logout
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true, message: 'Logout realizado com sucesso' });
});

module.exports = router;
