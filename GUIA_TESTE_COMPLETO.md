# 🧪 Guia de Teste Completo - Sistema de Checkout e Área de Membros

## 📋 Pré-requisitos

1. **Servidor rodando**: `npm start`
2. **Postman instalado** (ou qualquer cliente HTTP)
3. **Navegador** para testar a interface

## 🚀 Passo 1: Simular Webhook da Kiwify

### Usando Postman:

**Método**: `POST`  
**URL**: `http://localhost:3000/payment/webhook/kiwify`  
**Headers**: 
```
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "order_id": "test-order-12345",
  "order_ref": "TEST123",
  "order_status": "paid",
  "product_type": "membership",
  "payment_method": "credit_card",
  "store_id": "rff19QIYNJNgsEA",
  "payment_merchant_id": 41868167,
  "installments": 1,
  "card_type": "mastercard",
  "card_last4digits": "7600",
  "card_rejection_reason": null,
  "boleto_URL": null,
  "boleto_barcode": null,
  "boleto_expiry_date": null,
  "pix_code": null,
  "pix_expiration": null,
  "sale_type": "producer",
  "created_at": "2025-01-18 11:09",
  "updated_at": "2025-01-18 11:09",
  "approved_date": "2025-01-18 11:09",
  "refunded_at": null,
  "webhook_event_type": "order_approved",
  "Product": {
    "product_id": "845f2fff-61de-4aee-a201-d502e2f5ca94",
    "product_name": "Corel Draw Graphics Suite 2024 - Licença Completa"
  },
  "Customer": {
    "full_name": "João Silva Teste",
    "first_name": "João",
    "email": "joao.teste@exemplo.com",
    "mobile": "+5511999999999",
    "CPF": "12345678901",
    "ip": "192.168.1.1",
    "instagram": "@joaoteste",
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipcode": "01234-567"
  },
  "Commissions": {
    "charge_amount": 59990,
    "product_base_price": 59990,
    "product_base_price_currency": "BRL",
    "kiwify_fee": 6599,
    "kiwify_fee_currency": "BRL",
    "settlement_amount": 59990,
    "settlement_amount_currency": "BRL",
    "sale_tax_rate": 0,
    "sale_tax_amount": 0,
    "commissioned_stores": [],
    "currency": "BRL",
    "my_commission": 53391,
    "funds_status": null,
    "estimated_deposit_date": null,
    "deposit_date": null
  },
  "TrackingParameters": {
    "src": null,
    "sck": null,
    "utm_source": null,
    "utm_medium": null,
    "utm_campaign": null,
    "utm_content": null,
    "utm_term": null,
    "s1": null,
    "s2": null,
    "s3": null
  },
  "Subscription": {
    "id": "ac372ccb-5ed5-4fc7-9353-85b3f5b3fc48",
    "start_date": "2025-01-18T11:09:44.298Z",
    "next_payment": "2025-01-25T11:09:44.298Z",
    "status": "active",
    "plan": {
      "id": "0dff879b-1ec3-4605-9b44-c887b4f4db53",
      "name": "Plano Mensal",
      "frequency": "monthly",
      "qty_charges": 0
    },
    "charges": {
      "completed": [],
      "future": []
    }
  },
  "subscription_id": "ac372ccb-5ed5-4fc7-9353-85b3f5b3fc48",
  "access_url": null
}
```

### ✅ Resultado Esperado:
- Status: `200 OK`
- Console deve mostrar: `✅ Pagamento aprovado na Kiwify!`
- Console deve mostrar: `🎉 Acesso liberado para: joao.teste@exemplo.com`

## 🔍 Passo 2: Verificar se o Pedido foi Criado

**Método**: `GET`  
**URL**: `http://localhost:3000/payment/member-access`

### ✅ Resultado Esperado:
- Página de acesso liberado deve aparecer
- Dados do cliente devem estar corretos
- Produto deve ser "Corel Draw Graphics Suite"

## 🔐 Passo 3: Testar Login na Área de Membros

1. **Acesse**: `http://localhost:3000/cliente/login`
2. **Digite o email**: `joao.teste@exemplo.com`
3. **Clique em "Entrar"**

### ✅ Resultado Esperado:
- Mensagem: "Login realizado! Encontramos 1 pedido(s) para este email."
- Redirecionamento automático para `/cliente/pedidos`

## 📦 Passo 4: Verificar Lista de Pedidos

**URL**: `http://localhost:3000/cliente/pedidos`

### ✅ Resultado Esperado:
- Lista com 1 pedido
- Status: "Aprovado"
- Produto: "Corel Draw Graphics Suite"
- Valor: R$ 599,90

## 🔍 Passo 5: Verificar Detalhes do Pedido

Clique no pedido para ver detalhes.

### ✅ Resultado Esperado:
- Informações completas do pedido
- Dados do cliente
- Opção de download (se produto digital)

## 🧪 Teste Adicional: Criar Mais Pedidos

### Webhook para Adobe Photoshop:
```json
{
  "order_id": "test-order-54321",
  "order_status": "paid",
  "webhook_event_type": "order_approved",
  "Product": {
    "product_name": "Adobe Photoshop CC 2024 - Licença Anual"
  },
  "Customer": {
    "full_name": "Maria Santos Teste",
    "email": "maria.teste@exemplo.com",
    "mobile": "+5511888888888",
    "CPF": "98765432100"
  },
  "Commissions": {
    "charge_amount": 99990,
    "product_base_price": 99990
  }
}
```

## 🐛 Troubleshooting

### Problema: Login não funciona
**Solução**: 
1. Verifique se o webhook foi executado com sucesso
2. Verifique o console do servidor
3. Confirme se o email está correto

### Problema: Webhook retorna erro
**Solução**:
1. Verifique se o servidor está rodando
2. Verifique se a URL está correta
3. Verifique se o JSON está bem formatado

### Problema: Página não carrega
**Solução**:
1. Verifique se todas as rotas estão configuradas
2. Verifique se os arquivos EJS existem
3. Verifique o console do navegador

## 📊 Verificar Logs

Monitore o console do servidor para ver:
- `Webhook Kiwify recebido:`
- `✅ Pagamento aprovado na Kiwify!`
- `🎉 Acesso liberado para:`
- `📦 Produto:`
- `💰 Valor:`

## 🎯 Próximos Passos

Após testar com sucesso:
1. Configure as URLs reais dos checkouts
2. Configure o webhook real da Kiwify
3. Teste com pagamentos reais
4. Configure emails de notificação
