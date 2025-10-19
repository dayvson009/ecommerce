# E-commerce com Mercado Pago

Este é um e-commerce simples desenvolvido em Node.js com Express e integração ao Mercado Pago.

## Produtos Disponíveis

- **Corel Draw Graphics Suite 2024** - R$ 599,90
- **Adobe Photoshop CC 2024** - R$ 999,90  
- **SketchUp Pro 2024** - R$ 499,90
- **AutoCAD 2024** - R$ 1.499,90

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `config.env` para `.env` e configure suas credenciais do Mercado Pago:

```bash
cp config.env .env
```

Edite o arquivo `.env` com suas credenciais reais:

```env
# Configurações do Servidor
PORT=3000

# Credenciais do Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=SEU_ACCESS_TOKEN_AQUI
MERCADOPAGO_PUBLIC_KEY=SEU_PUBLIC_KEY_AQUI

# URLs de retorno (ajuste conforme seu domínio)
MERCADOPAGO_SUCCESS_URL=http://localhost:3000/success
MERCADOPAGO_FAILURE_URL=http://localhost:3000/failure
MERCADOPAGO_PENDING_URL=http://localhost:3000/pending
```

### 3. Obter Credenciais do Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Crie uma conta ou faça login
3. Crie uma nova aplicação
4. Copie o **Access Token** e **Public Key**
5. Cole nas variáveis de ambiente

### 4. Executar o Projeto

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Como Funciona

1. **Homepage**: Lista os produtos disponíveis
2. **Página do Produto**: Clique em qualquer produto para ver detalhes
3. **Checkout**: Clique em "Comprar Agora" para ser redirecionado ao Mercado Pago
4. **Pagamento**: Processe o pagamento no checkout transparente do Mercado Pago
5. **Retorno**: Após o pagamento, você será redirecionado para uma página de sucesso/falha

## Estrutura do Projeto

```
├── routes/
│   ├── home.js              # Página inicial com produtos
│   ├── initiateCheckout.js  # Página de detalhes do produto
│   ├── payment.js           # Rotas de pagamento
│   └── index.js             # Configuração das rotas
├── views/
│   ├── home.ejs             # Template da homepage
│   ├── initiateCheckout.ejs # Template da página do produto
│   ├── success.ejs          # Página de sucesso
│   ├── failure.ejs          # Página de falha
│   └── pending.ejs          # Página de pagamento pendente
├── src/
│   ├── styles/              # Arquivos CSS
│   └── scripts/             # Arquivos JavaScript
└── server.js                # Servidor principal
```

## Funcionalidades Implementadas

✅ **Produtos Fictícios**: Corel Draw, Photoshop, SketchUp, AutoCAD  
✅ **Integração Mercado Pago**: Checkout transparente  
✅ **Páginas de Retorno**: Sucesso, falha e pendente  
✅ **Interface Responsiva**: Design moderno e funcional  
✅ **Sistema de Avaliações**: Estrelas e comentários  
✅ **Galeria de Imagens**: Visualização dos produtos  

## Próximos Passos

Para tornar o projeto ainda mais funcional, você pode:

1. **Adicionar Banco de Dados**: Para persistir produtos e pedidos
2. **Sistema de Usuários**: Cadastro e login de clientes
3. **Carrinho de Compras**: Múltiplos produtos
4. **Painel Administrativo**: Gerenciar produtos e pedidos
5. **Notificações**: Email/SMS de confirmação
6. **Relatórios**: Vendas e analytics

## Suporte

Para dúvidas sobre a integração com Mercado Pago, consulte a [documentação oficial](https://www.mercadopago.com.br/developers/pt/docs).