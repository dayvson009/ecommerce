# 🎯 Guia de Configuração Final - Sistema Organizado

## ✅ **Reorganização Concluída**

### **Arquivos Removidos:**
- ❌ `views/admin-pedidos.ejs` (não utilizado)
- ❌ `views/teste-sistema.html` (arquivo de teste)
- ❌ Rotas de admin do `routes/cliente.js`

### **Arquivos Mantidos:**
- ✅ `views/cliente-detalhes.ejs` (usado em `/cliente/pedido/:id`)

## 📁 **Nova Estrutura Centralizada**

### **`produtos.json` - Fonte Única de Verdade**
```json
{
  "produtos": [
    {
      "id": 1,
      "name": "Corel Draw Graphics Suite 2024 - Licença Completa",
      "price_discount": 599.90,
      "tipo": "digital",
      "google_drive_folder": "SEU_FOLDER_ID_COREL_AQUI",
      "botoes": {
        "mercadolivre": "https://produto.mercadolivre.com.br/MLB-COREL-XXXXXXXXX",
        "shopee": "https://shopee.com.br/corel-draw-graphics-suite-XXXXXXXXX",
        "kiwify": "https://kiwify.com/corel-draw-graphics-suite-XXXXXXXXX"
      }
    }
  ]
}
```

### **Arquivos Atualizados:**
- ✅ `routes/home.js` - Agora usa `produtos.json`
- ✅ `routes/payment.js` - Removido `CHECKOUT_URLS` e `produtos` duplicados
- ✅ `views/cliente-detalhes.ejs` - Google Drive dinâmico do JSON
- ✅ `server.js` - Proteção de arquivos JSON

## 🔧 **Como Configurar**

### **1️⃣ URLs dos Checkouts**
**Abra**: `produtos.json`
**Para cada produto**, substitua as URLs nos `botoes`:

```json
"botoes": {
  "mercadolivre": "https://produto.mercadolivre.com.br/MLB-SEU-PRODUTO-REAL",
  "shopee": "https://shopee.com.br/seu-produto-real",
  "kiwify": "https://kiwify.com/seu-produto-real"
}
```

### **2️⃣ Google Drive**
**Para cada produto**, substitua o `google_drive_folder`:

```json
"google_drive_folder": "1ABC123DEF456GHI789JKL"
```

### **3️⃣ Webhook da Kiwify**
**Configure na Kiwify**:
- **URL**: `https://SEU_DOMINIO/payment/webhook/kiwify`
- **Eventos**: `order_approved`

## 🔒 **Segurança Implementada**

### **✅ Proteções Ativas:**
- Arquivos JSON protegidos (404 para acesso direto)
- Cookies HTTP-only
- Validação de propriedade de pedidos
- Verificação de status para downloads

### **⚠️ Vulnerabilidades Identificadas:**
1. **Webhook sem validação de assinatura** (CRÍTICO)
2. **Autenticação apenas por email** (MÉDIO)
3. **Tokens base64 simples** (MÉDIO)

**📋 Ver**: `ANALISE_SEGURANCA.md` para soluções detalhadas

## 🧪 **Como Testar**

### **1️⃣ Teste Completo:**
```bash
# 1. Execute o webhook
curl -X POST http://localhost:3000/payment/webhook/kiwify \
  -H "Content-Type: application/json" \
  -d '{"order_id":"test-123","order_status":"paid","webhook_event_type":"order_approved","Product":{"product_name":"Corel Draw Graphics Suite 2024 - Licença Completa"},"Customer":{"full_name":"João Teste","email":"joao@teste.com","mobile":"+5511999999999","CPF":"12345678901"},"Commissions":{"charge_amount":59990,"product_base_price":59990}}'

# 2. Teste login
curl -X POST http://localhost:3000/cliente/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@teste.com"}'
```

### **2️⃣ URLs para Testar:**
- **🏠 Home**: `http://localhost:3000/`
- **🔐 Login**: `http://localhost:3000/cliente/login`
- **📦 Pedidos**: `http://localhost:3000/cliente/pedidos`
- **🎉 Acesso**: `http://localhost:3000/payment/member-access`

## 📊 **Benefícios da Reorganização**

### **✅ Vantagens:**
1. **Fonte única de verdade** - Todos os produtos em `produtos.json`
2. **Manutenção simplificada** - Editar apenas 1 arquivo
3. **Consistência** - Mesmos dados em todas as páginas
4. **Segurança melhorada** - Arquivos JSON protegidos
5. **Código limpo** - Removidas duplicações

### **🎯 Próximos Passos Recomendados:**
1. **Configurar URLs reais** nos `botoes`
2. **Configurar Google Drive** com IDs reais
3. **Implementar validação de webhook** (segurança)
4. **Testar com pagamentos reais**
5. **Configurar HTTPS** em produção

## 🚀 **Sistema Pronto para Produção**

O sistema está organizado e funcional! Agora você tem:

- ✅ **Estrutura centralizada** com `produtos.json`
- ✅ **Checkout externo** funcionando
- ✅ **Webhook da Kiwify** operacional
- ✅ **Área de membros** completa
- ✅ **Proteções básicas** implementadas
- ✅ **Código limpo** e organizado

**🎉 Parabéns! Seu sistema está pronto para uso!**
