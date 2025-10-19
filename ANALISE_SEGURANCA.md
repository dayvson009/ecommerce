# 🔒 Análise de Segurança do Sistema

## ⚠️ **Vulnerabilidades Identificadas**

### 1️⃣ **Webhook da Kiwify - CRÍTICO**
**Problema**: Qualquer pessoa pode enviar requisições POST para `/payment/webhook/kiwify`
**Risco**: 
- Criar pedidos falsos
- Liberar acesso indevido
- Sobrecarregar o sistema

**Solução Recomendada**:
```javascript
// Adicionar validação de assinatura da Kiwify
router.post('/webhook/kiwify', async (req, res) => {
  // Verificar assinatura do webhook
  const signature = req.headers['x-kiwify-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verificarAssinaturaKiwify(payload, signature)) {
    return res.status(401).json({ error: 'Assinatura inválida' });
  }
  
  // ... resto do código
});
```

### 2️⃣ **Arquivos JSON Expostos**
**Problema**: `produtos.json` e `pedidos.json` podem ser acessados diretamente
**Risco**: 
- Exposição de dados sensíveis
- Manipulação de dados

**Solução Recomendada**:
```javascript
// Adicionar middleware de proteção
app.use('/produtos.json', (req, res) => {
  res.status(404).send('Not Found');
});

app.use('/pedidos.json', (req, res) => {
  res.status(404).send('Not Found');
});
```

### 3️⃣ **Autenticação por Email Simples**
**Problema**: Login apenas por email, sem senha
**Risco**: 
- Acesso não autorizado
- Impersonação de clientes

**Solução Recomendada**:
```javascript
// Implementar autenticação mais robusta
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  // Verificar senha ou implementar OTP por email
  const cliente = await verificarCredenciais(email, senha);
  
  if (!cliente) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  // ... resto do código
});
```

### 4️⃣ **Tokens de Autenticação Simples**
**Problema**: Tokens base64 facilmente decodificáveis
**Risco**: 
- Falsificação de tokens
- Acesso não autorizado

**Solução Recomendada**:
```javascript
// Usar JWT com chave secreta
const jwt = require('jsonwebtoken');

function gerarToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function validarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
```

### 5️⃣ **Download de Arquivos Sem Validação**
**Problema**: Downloads baseados apenas em status do pedido
**Risco**: 
- Acesso a arquivos não autorizados
- Bypass de autenticação

**Solução Recomendada**:
```javascript
// Adicionar validação robusta
router.get('/download/:pedidoId/:arquivoId', verificarAuth, (req, res) => {
  const { pedidoId, arquivoId } = req.params;
  const email = req.userEmail;
  
  // Verificar se o pedido pertence ao usuário
  const pedido = verificarPropriedadePedido(pedidoId, email);
  
  if (!pedido || pedido.status !== 'aprovado') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  
  // ... resto do código
});
```

## 🛡️ **Medidas de Segurança Implementadas**

### ✅ **Já Implementado**
- Cookies HTTP-only para tokens
- Validação de propriedade de pedidos
- Verificação de status para downloads
- Redirecionamento automático para login

### 🔧 **Melhorias Recomendadas**

#### **1. Proteção de Webhook**
```javascript
// Adicionar ao .env
KIWIFY_WEBHOOK_SECRET=sua_chave_secreta_aqui

// Middleware de validação
function validarWebhookKiwify(req, res, next) {
  const signature = req.headers['x-kiwify-signature'];
  const payload = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.KIWIFY_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Assinatura inválida' });
  }
  
  next();
}
```

#### **2. Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: 'Muitas tentativas de webhook'
});

router.post('/webhook/kiwify', webhookLimiter, validarWebhookKiwify, ...);
```

#### **3. Validação de Dados**
```javascript
const { body, validationResult } = require('express-validator');

const validarWebhook = [
  body('order_id').notEmpty().isString(),
  body('order_status').isIn(['paid', 'pending', 'cancelled']),
  body('Customer.email').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

#### **4. Logs de Segurança**
```javascript
function logSeguranca(acao, detalhes) {
  const log = {
    timestamp: new Date().toISOString(),
    acao: acao,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    detalhes: detalhes
  };
  
  console.log('SECURITY_LOG:', JSON.stringify(log));
  
  // Salvar em arquivo ou banco de dados
  fs.appendFileSync('security.log', JSON.stringify(log) + '\n');
}
```

## 🚨 **Ações Imediatas Recomendadas**

### **Prioridade ALTA**
1. **Implementar validação de webhook da Kiwify**
2. **Proteger arquivos JSON**
3. **Adicionar rate limiting**

### **Prioridade MÉDIA**
1. **Melhorar autenticação**
2. **Implementar logs de segurança**
3. **Adicionar validação de dados**

### **Prioridade BAIXA**
1. **Implementar JWT**
2. **Adicionar monitoramento**
3. **Implementar backup automático**

## 📋 **Checklist de Segurança**

- [ ] Webhook com validação de assinatura
- [ ] Arquivos JSON protegidos
- [ ] Rate limiting implementado
- [ ] Logs de segurança ativos
- [ ] Validação de dados robusta
- [ ] Autenticação melhorada
- [ ] Monitoramento de tentativas suspeitas
- [ ] Backup automático dos dados
- [ ] HTTPS obrigatório em produção
- [ ] Headers de segurança configurados

## 🔐 **Configuração de Produção**

```javascript
// Adicionar ao server.js
app.use(helmet()); // Headers de segurança
app.use(compression()); // Compressão
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```
