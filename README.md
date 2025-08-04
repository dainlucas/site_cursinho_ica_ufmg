# 📚 Site Cursinho Comunitário

Um site institucional para cursinho comunitário, desenvolvido com foco na **simplicidade**, **acessibilidade** e **facilidade de manutenção**.

## 🎯 Objetivo

Criar um site informativo para cursinho comunitário que visa democratizar o acesso ao ensino superior, oferecendo informações sobre:
- Editais e vagas disponíveis
- Informações sobre o cursinho
- Contatos e localização
- Processo de inscrição

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização com Flexbox/Grid para layouts responsivos  
- **JavaScript Vanilla** - Funcionalidades básicas (menu mobile, navegação suave, etc.)

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **Live Server (VS Code)** - Servidor local para desenvolvimento

## 📁 Estrutura do Projeto

```
cursinho-site/
├── index.html              # Página principal
├── css/
│   ├── reset.css           # Reset básico de estilos
│   ├── variables.css       # Variáveis CSS (cores, fontes)
│   ├── components.css      # Componentes reutilizáveis
│   └── main.css           # Estilos principais e layouts
├── js/
│   ├── main.js            # Funcionalidades principais
│   └── utils.js           # Funções utilitárias
├── images/
│   ├── logo/              # Logotipos e ícones da marca
│   ├── icons/             # Ícones diversos
│   └── backgrounds/       # Imagens de fundo
├── assets/
│   └── documents/         # PDFs de editais e documentos
├── pages/
│   ├── sobre.html         # Página sobre o cursinho
│   ├── contato.html       # Página de contato
│   └── editais.html       # Página dedicada aos editais
├── README.md              # Este arquivo
└── .gitignore            # Arquivos ignorados pelo Git
```

## 🎨 Design e Cores

### Paleta de Cores
```css
:root {
    --primary-red: #c53030;      /* Vermelho principal */
    --dark-red: #9b2c2c;         /* Vermelho escuro (hover) */
    --light-pink: #fed7d7;       /* Rosa claro (backgrounds) */
    --text-dark: #2d3748;        /* Texto escuro */
    --text-gray: #4a5568;        /* Texto cinza */
    --white: #ffffff;            /* Branco */
    --light-gray: #f7fafc;       /* Cinza claro */
    --border-gray: #e2e8f0;      /* Bordas */
}
```

### Responsividade
- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Menu mobile** colapsável com animações suaves

## ⚡ Funcionalidades

### JavaScript
- ✅ Menu mobile responsivo com hamburger
- ✅ Navegação suave entre seções (smooth scroll)
- ✅ Scroll spy para destacar seção ativa no menu
- ✅ Botão flutuante do WhatsApp
- ✅ Validação de formulários (formulário de contato)
- ✅ Funções utilitárias organizadas

### SEO e Acessibilidade
- ✅ Meta tags otimizadas para SEO
- ✅ Open Graph e Twitter Cards
- ✅ Estrutura semântica HTML5
- ✅ ARIA labels e atributos de acessibilidade
- ✅ Textos alternativos para imagens
- ✅ Navegação por teclado

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno
- Editor de código (recomendado: VS Code)
- Extensão Live Server (para desenvolvimento)

### Instalação
1. **Clone ou baixe o projeto**
   ```bash
   git clone <url-do-repositorio>
   cd cursinho-site
   ```

2. **Abra no VS Code**
   ```bash
   code .
   ```

3. **Execute com Live Server**
   - Clique com botão direito no `index.html`
   - Selecione "Open with Live Server"
   - O site abrirá automaticamente no navegador

### Desenvolvimento Local
- O site funciona diretamente no navegador (arquivos estáticos)
- Todas as dependências estão incluídas (sem npm/yarn necessário)
- Modificações são refletidas automaticamente com Live Server

## 📝 Como Personalizar

### Alterando Cores
Edite o arquivo `css/variables.css` para modificar a paleta de cores:
```css
:root {
    --primary-red: #sua-cor-aqui;
    --dark-red: #sua-cor-aqui;
    /* ... outras variáveis ... */
}
```

### Modificando Conteúdo
- **Textos gerais**: Edite diretamente nos arquivos HTML
- **Informações de contato**: Atualize nos arquivos HTML e no footer
- **Editais**: Modifique `pages/editais.html` e adicione PDFs em `assets/documents/`

### Adicionando Novas Páginas
1. Crie novo arquivo HTML na pasta `pages/`
2. Use a estrutura de uma página existente como base
3. Atualize os links de navegação nos menus
4. Mantenha consistência visual usando as classes CSS existentes

### Substituindo Imagens
1. Adicione suas imagens nas pastas apropriadas em `images/`
2. Atualize as referências nos arquivos HTML
3. Mantenha formatos otimizados (WebP, PNG, JPG)
4. Inclua sempre texto alternativo (alt)

## 🔧 Manutenção

### Atualizando Editais
1. Substitua/adicione PDFs em `assets/documents/`
2. Edite `pages/editais.html` com novas informações
3. Atualize datas e prazos conforme necessário

### Backup e Versionamento
- Use Git para controlar versões
- Faça commits regulares das alterações
- Mantenha backup dos arquivos importantes

### Performance
- Otimize imagens antes de adicionar
- Minimize arquivos CSS/JS se necessário
- Use ferramentas como PageSpeed Insights para análise

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Edge (versões recentes)
- ⚠️ Internet Explorer (suporte limitado)

### Dispositivos
- ✅ Desktop (1024px+)
- ✅ Tablets (768px - 1023px)
- ✅ Smartphones (320px - 767px)

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas sobre o desenvolvimento ou manutenção do site:
- **Email**: contato@cursinhocomunitario.com
- **WhatsApp**: (38) 99999-9999

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para democratizar o acesso ao ensino superior**