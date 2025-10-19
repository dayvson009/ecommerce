# Configuração das URLs de Checkout

## Como configurar as URLs dos checkouts externos:

1. **MercadoLivre**: 
   - Acesse sua conta no MercadoLivre
   - Crie um anúncio para cada produto
   - Copie a URL do anúncio
   - Cole no arquivo `routes/payment.js` na linha 8

2. **Shopee**:
   - Acesse sua conta na Shopee
   - Crie um produto para cada item
   - Copie a URL do produto
   - Cole no arquivo `routes/payment.js` na linha 9

3. **Kiwify**:
   - Acesse sua conta na Kiwify
   - Crie um produto para cada item
   - Copie a URL do produto
   - Cole no arquivo `routes/payment.js` na linha 10

## Exemplo de configuração:

```javascript
const CHECKOUT_URLS = {
  mercadolivre: 'https://produto.mercadolivre.com.br/MLB-1234567890', // URL real do MercadoLivre
  shopee: 'https://shopee.com.br/produto-1234567890', // URL real da Shopee
  kiwify: 'https://kiwify.com/produto-1234567890' // URL real da Kiwify
};
```

## Configuração do Webhook da Kiwify:

1. Acesse sua conta na Kiwify
2. Vá em Configurações > Webhooks
3. Adicione um novo webhook com a URL:
   ```
   https://seudominio.com/payment/webhook/kiwify
   ```
4. Selecione o evento: `order_approved`

## URLs de redirecionamento na Kiwify:

Configure na Kiwify para redirecionar após o pagamento para:
```
https://seudominio.com/payment/member-access/{order_id}
```

## Testando o sistema:

1. Configure as URLs reais
2. Teste uma compra na Kiwify
3. Verifique se o webhook está funcionando
4. Confirme se o acesso está sendo liberado automaticamente
