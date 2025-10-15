# 🎮 AI Dex - Pokédex Gerada por IA

Uma aplicação web moderna que permite aos usuários criar e explorar monstros únicos gerados por Inteligência Artificial. Inspirada no conceito de Pokédex, a plataforma utiliza ChatGPT para gerar descrições, histórias e atributos de criaturas personalizadas.

## ✨ Funcionalidades

### 🔐 Autenticação

- Sistema completo de registro e login
- Gestão de perfil de usuário
- Alteração de senha
- Proteção de rotas autenticadas

### 🎨 Criação de Monstros

- **Geração por IA**: Use o ChatGPT para criar monstros únicos baseados em suas ideias
- **Personalização**: Nome, descrição e até 2 tipos por monstro
- **Loader Dinâmico**: Mensagens animadas durante o processo de criação
- **Sistema de Raridade**: Monstros classificados automaticamente com base em seus atributos

### 🔍 Exploração

- Visualize todos os monstros criados pela comunidade
- Filtre por tipo (Fire, Water, Grass, etc.)
- Sistema de busca por nome
- Paginação eficiente
- Página de detalhes completa com estatísticas

### 🌍 Internacionalização

- Suporte completo a múltiplos idiomas
- Português (pt-BR) e Inglês (en-US)
- Detecção automática do idioma do navegador
- Mensagens de erro internacionalizadas

### 📊 Visualização de Dados

- Sistema de raridade visual (Common, Uncommon, Rare, Epic, Legendary)
- Gráficos de atributos (HP, Attack, Defense, Speed, Special Attack, Special Defense)
- Cards animados com indicadores de raridade
- Interface responsiva e moderna

## 🛠️ Tecnologias Utilizadas

### Core

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite 7** - Build tool moderna e rápida

### Roteamento & Estado

- **TanStack Router** - Roteamento type-safe
- **TanStack Query** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP

### Formulários & Validação

- **React Hook Form** - Gestão de formulários performática
- **Zod** - Validação de schemas TypeScript-first

### Estilização

- **Tailwind CSS 4** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **React Toastify** - Notificações elegantes

### Internacionalização

- **i18next** - Framework de internacionalização
- **react-i18next** - Integração do i18next com React
- **i18next-browser-languagedetector** - Detecção automática de idioma

### Qualidade de Código

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Husky** - Git hooks
- **lint-staged** - Linting em arquivos staged

## 📋 Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd ai-dex
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
# Crie um arquivo .env na raiz do projeto
VITE_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier
- `npm run format:check` - Verifica formatação sem modificar arquivos

## 🏗️ Estrutura do Projeto

```
src/
├── @types/           # Definições de tipos TypeScript
├── api/
│   ├── mutations/   # Mutations do TanStack Query (POST, PUT, DELETE)
│   └── queries/     # Queries do TanStack Query (GET)
├── components/      # Componentes reutilizáveis
│   ├── CardMonster/
│   ├── CreationLoader/
│   ├── Header/
│   ├── LabelType/
│   ├── Pagination/
│   └── RarityIndicator/
├── constants/       # Constantes da aplicação
├── context/         # Contextos React (autenticação, etc)
├── hooks/          # Custom hooks
├── i18n/           # Configuração de internacionalização
│   └── locales/    # Arquivos de tradução (pt-BR, en-US)
├── pages/          # Páginas da aplicação
│   ├── changePassword/
│   ├── createMonster/
│   ├── home/
│   ├── login/
│   ├── monsterDetails/
│   ├── myMonsters/
│   ├── notFound/
│   ├── profile/
│   └── register/
├── routes/         # Configuração de rotas (TanStack Router)
├── services/       # Configuração de serviços (axios)
├── styles/         # Estilos globais
└── utils/          # Funções utilitárias
    ├── errors/     # Tratamento de erros
    └── rarity/     # Sistema de raridade
```

## 🎨 Sistema de Raridade

Os monstros são automaticamente classificados baseado na soma total de seus atributos:

- **Common** (Comum): 0-450 pontos - Cinza
- **Uncommon** (Incomum): 451-550 pontos - Verde
- **Rare** (Raro): 551-650 pontos - Azul
- **Epic** (Épico): 651-750 pontos - Roxo
- **Legendary** (Lendário): 751+ pontos - Dourado

## 🌐 Tipos de Monstros

18 tipos disponíveis, cada um com sua cor característica:

- Normal, Fire, Water, Electric, Grass, Ice
- Fighting, Poison, Ground, Flying, Psychic, Bug
- Rock, Ghost, Dragon, Dark, Steel, Fairy

## 🔒 Segurança

- Tokens JWT para autenticação
- Rotas protegidas no frontend
- Validação de formulários com Zod
- Sanitização de inputs
- Tratamento de erros centralizado

## 🎯 Funcionalidades Futuras

- [ ] Sistema de favoritos
- [ ] Comentários em monstros
- [ ] Sistema de batalhas
- [ ] Compartilhamento social
- [ ] Modo escuro
- [ ] Mais idiomas
- [ ] PWA (Progressive Web App)
- [ ] Upload de imagens customizadas

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React, TypeScript e IA

---

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!
