# 🚀 Teste Rápido - Passo a Passo

## ⚡ Teste Manual Simples

### 1️⃣ **Primeiro: Simular Webhook com Postman**

**URL**: `POST http://localhost:3000/payment/webhook/kiwify`

**Body (JSON)**:
```json
{
  "order_id": "test-123",
  "order_status": "paid",
  "webhook_event_type": "order_approved",
  "Product": {
    "product_name": "Corel Draw Graphics Suite 2024 - Licença Completa"
  },
  "Customer": {
    "full_name": "João Teste",
    "email": "joao@teste.com",
    "mobile": "+5511999999999",
    "CPF": "12345678901"
  },
  "Commissions": {
    "charge_amount": 59990,
    "product_base_price": 59990
  }
}
```

### 2️⃣ **Verificar no Console**
Você deve ver:
```
Webhook Kiwify recebido: {...}
✅ Pagamento aprovado na Kiwify!
🎉 Acesso liberado para: joao@teste.com
```

### 3️⃣ **Testar Login**
1. Acesse: `http://localhost:3000/cliente/login`
2. Digite: `joao@teste.com`
3. Clique em "Entrar"

### 4️⃣ **Verificar Pedidos**
Deve redirecionar para: `http://localhost:3000/cliente/pedidos`

---

## 🔧 Se não funcionar:

### Problema: "Nenhum pedido encontrado"
**Solução**: O webhook não foi executado corretamente

### Problema: Erro 404 no webhook
**Solução**: Verifique se o servidor está rodando na porta 3000

### Problema: Login não redireciona
**Solução**: Verifique o console do navegador (F12)

---

## 📱 Teste com cURL (alternativa ao Postman):

```bash
curl -X POST http://localhost:3000/payment/webhook/kiwify \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "test-123",
    "order_status": "paid",
    "webhook_event_type": "order_approved",
    "Product": {
      "product_name": "Corel Draw Graphics Suite 2024 - Licença Completa"
    },
    "Customer": {
      "full_name": "João Teste",
      "email": "joao@teste.com",
      "mobile": "+5511999999999",
      "CPF": "12345678901"
    },
    "Commissions": {
      "charge_amount": 59990,
      "product_base_price": 59990
    }
  }'
```

---

## 🎯 URLs para Testar:

- **Login**: `http://localhost:3000/cliente/login`
- **Pedidos**: `http://localhost:3000/cliente/pedidos`
- **Acesso**: `http://localhost:3000/payment/member-access/test-123`
- **Webhook**: `http://localhost:3000/payment/webhook/kiwify`
