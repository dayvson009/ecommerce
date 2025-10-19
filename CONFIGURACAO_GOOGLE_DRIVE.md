# 🔗 Configuração do Google Drive

## 📁 Como Configurar o Link do Google Drive

### 1️⃣ **Criar Pasta no Google Drive**

1. Acesse [Google Drive](https://drive.google.com)
2. Crie uma nova pasta para seus produtos digitais
3. Faça upload dos arquivos do produto
4. Configure as permissões da pasta como "Qualquer pessoa com o link pode visualizar"

### 2️⃣ **Obter o Link da Pasta**

1. Clique com o botão direito na pasta
2. Selecione "Compartilhar"
3. Copie o link de compartilhamento
4. O link será algo como: `https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL`

### 3️⃣ **Configurar no Sistema**

**Abra o arquivo**: `views/cliente-detalhes.ejs`

**Localize a linha** (aproximadamente linha 387):
```javascript
<a href="https://drive.google.com/drive/folders/SEU_FOLDER_ID_AQUI" target="_blank"
```

**Substitua** `SEU_FOLDER_ID_AQUI` pelo ID real da sua pasta do Google Drive.

### 4️⃣ **Exemplo de Configuração**

**Antes:**
```javascript
<a href="https://drive.google.com/drive/folders/SEU_FOLDER_ID_AQUI" target="_blank"
```

**Depois:**
```javascript
<a href="https://drive.google.com/drive/folders/1ABC123DEF456GHI789JKL" target="_blank"
```

### 5️⃣ **Configurações Adicionais**

#### **Para Produtos Diferentes:**
Se você tiver produtos diferentes, pode criar pastas separadas e configurar dinamicamente:

```javascript
// No arquivo routes/cliente.js, na função de detalhes do pedido
const googleDriveLinks = {
  1: 'https://drive.google.com/drive/folders/COREL_FOLDER_ID',
  2: 'https://drive.google.com/drive/folders/PHOTOSHOP_FOLDER_ID',
  3: 'https://drive.google.com/drive/folders/SKETCHUP_FOLDER_ID',
  4: 'https://drive.google.com/drive/folders/AUTOCAD_FOLDER_ID'
};

// Passar o link correto para a view
res.render('cliente-detalhes', {
  pedido: pedido,
  googleDriveLink: googleDriveLinks[pedido.produto.id] || 'https://drive.google.com/drive/folders/DEFAULT_FOLDER_ID'
});
```

#### **Para Links Dinâmicos:**
```javascript
// Na view cliente-detalhes.ejs
<a href="<%= googleDriveLink %>" target="_blank"
```

### 6️⃣ **Teste a Configuração**

1. Execute o webhook de teste
2. Faça login na área do cliente
3. Acesse os detalhes do pedido
4. Verifique se o link do Google Drive funciona

### 7️⃣ **Dicas Importantes**

- ✅ **Sempre teste** o link antes de colocar em produção
- ✅ **Configure permissões** corretas na pasta do Google Drive
- ✅ **Use pastas organizadas** para cada produto
- ✅ **Mantenha backups** dos arquivos importantes
- ✅ **Monitore o uso** do Google Drive para não exceder limites

### 8️⃣ **Troubleshooting**

**Problema**: Link não funciona
**Solução**: Verifique se a pasta está configurada como "Qualquer pessoa com o link pode visualizar"

**Problema**: Arquivo não aparece
**Solução**: Verifique se os arquivos foram enviados para a pasta correta

**Problema**: Erro de permissão
**Solução**: Reconfigure as permissões da pasta no Google Drive
