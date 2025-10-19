# Sistema de Área do Cliente - E-commerce

Este sistema implementa uma área do cliente completa para acompanhamento de pedidos, com suporte a produtos digitais e físicos.

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Pedidos
- **Criação automática de pedidos** via webhook do Mercado Pago
- **Atualização de status** em tempo real
- **Armazenamento persistente** em arquivo JSON
- **Rastreamento de produtos físicos**

### ✅ Área do Cliente
- **Login por email** (busca pedidos existentes)
- **Listagem de pedidos** com status visual
- **Detalhes completos** de cada pedido
- **Download seguro** de produtos digitais
- **Rastreamento** de produtos físicos

### ✅ Produtos Digitais
- **Download protegido** por autenticação
- **Múltiplos arquivos** por produto
- **Instruções de instalação**
- **Controle de acesso** por status do pedido

### ✅ Produtos Físicos
- **Informações de rastreamento**
- **Códigos de transporte**
- **Prazos de entrega**
- **Dimensões e peso**

### ✅ Painel Administrativo
- **Visualização de todos os pedidos**
- **Atualização manual de status**
- **Gestão de códigos de rastreamento**
- **Interface responsiva**

## 📁 Estrutura de Arquivos

```
├── routes/
│   ├── cliente.js          # Rotas da área do cliente
│   ├── payment.js          # Rotas de pagamento (atualizado)
│   └── index.js            # Rotas principais (atualizado)
├── views/
│   ├── cliente-login.ejs   # Página de login
│   ├── cliente-pedidos.ejs # Lista de pedidos
│   ├── cliente-detalhes.ejs # Detalhes do pedido
│   └── admin-pedidos.ejs   # Painel administrativo
├── pedidos.json            # Base de dados dos pedidos
└── server.js               # Servidor (atualizado)
```

## 🔧 Como Usar

### 1. Instalação de Dependências
```bash
npm install cookie-parser
```

### 2. Configuração do Webhook
O webhook do Mercado Pago deve apontar para:
```
https://seu-dominio.com/payment/webhook
```

### 3. Acessos do Sistema

#### Área do Cliente
- **Login**: `/cliente/login`
- **Meus Pedidos**: `/cliente/pedidos`
- **Detalhes**: `/cliente/pedido/{id}`

#### Painel Administrativo
- **Admin**: `/cliente/admin`

### 4. Fluxo de Funcionamento

1. **Cliente faz pagamento** → Mercado Pago processa
2. **Webhook recebido** → Sistema cria/atualiza pedido
3. **Cliente acessa área** → Login por email
4. **Visualiza pedidos** → Status e detalhes
5. **Download produtos** → Acesso seguro (se aprovado)
6. **Admin gerencia** → Atualiza status e rastreamento

## 📊 Status de Pedidos

| Status | Descrição | Ação Disponível |
|--------|-----------|------------------|
| `pending` | Pagamento pendente | Aguardando aprovação |
| `in_process` | Processando | Em análise |
| `approved` | Aprovado | Download liberado |
| `cancelled` | Cancelado | Sem acesso |
| `rejected` | Rejeitado | Sem acesso |

## 🔐 Segurança

### Autenticação
- **Tokens base64** com timestamp
- **Cookies HTTP-only** para sessão
- **Validação por email** do cliente

### Downloads
- **Verificação de propriedade** do pedido
- **Status obrigatório** (apenas aprovados)
- **Logs de auditoria** para downloads

### Dados Sensíveis
- **Informações do cliente** protegidas
- **IDs de pagamento** mascarados
- **URLs de download** controladas

## 🛠️ Personalização

### Adicionar Novos Produtos Digitais
Edite o arquivo `pedidos.json`:
```json
{
  "produtos_digitais": {
    "5": {
      "id": 5,
      "nome": "Novo Software",
      "tipo": "digital",
      "instrucoes": "Instruções de instalação...",
      "arquivos": [
        {
          "id": "arquivo-unico",
          "nome": "Instalador",
          "url": "https://exemplo.com/arquivo.zip",
          "tamanho": "100 MB"
        }
      ]
    }
  }
}
```

### Adicionar Produtos Físicos
```json
{
  "produtos_fisicos": {
    "6": {
      "id": 6,
      "nome": "Produto Físico",
      "tipo": "fisico",
      "peso": "500g",
      "dimensoes": "20x15x10 cm",
      "prazo_entrega": "7-10 dias úteis",
      "rastreamento": {
        "codigo": "",
        "transportadora": "",
        "status": "pendente"
      }
    }
  }
}
```

## 📱 Interface Responsiva

- **Design mobile-first**
- **Cards adaptativos** para pedidos
- **Modais responsivos** para admin
- **Navegação intuitiva**

## 🔄 Webhook Atualizado

O webhook agora processa:
- ✅ Criação de novos pedidos
- ✅ Atualização de status existentes
- ✅ Extração de dados do cliente
- ✅ Associação com produtos
- ✅ Logs detalhados

## 🚀 Próximos Passos Sugeridos

1. **Sistema de notificações** por email
2. **Integração com transportadoras** para rastreamento automático
3. **Relatórios de vendas** no painel admin
4. **Sistema de avaliações** de produtos
5. **Cupons de desconto** e promoções
6. **Backup automático** dos dados
7. **API REST** para integrações externas

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs do servidor
- Confirme a configuração do webhook
- Teste com pagamentos em modo sandbox
- Valide os dados em `pedidos.json`

---

**Sistema desenvolvido para integração completa com Mercado Pago e gestão eficiente de pedidos digitais e físicos.**
