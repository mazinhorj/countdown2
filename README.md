# 📅 Contador de Eventos - Next.js + TypeScript

Um aplicativo moderno e responsivo para gerenciamento de eventos com contador regressivo, desenvolvido com **Next.js 15**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

## 🌟 **Características Principais**

### ⚡ **Tecnologias Modernas**
- **Next.js 15** com App Router
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes de interface
- **ESLint** para qualidade de código
- **date-fns** para manipulação de datas

### 🔐 **Autenticação**
- Sistema de login simulado (modo demo)
- Proteção de rotas
- Gerenciamento de estado de usuário

### 📅 **Gerenciamento de Eventos**
- ✅ Cadastro de eventos com validação
- ✅ Edição e exclusão de eventos
- ✅ Validação de datas futuras
- ✅ Organização por proximidade
- ✅ Sistema de temas para busca de imagens

### ⏰ **Contador Regressivo**
- ✅ Contador em tempo real (dias, horas, minutos, segundos)
- ✅ Atualização automática a cada segundo
- ✅ Interface imersiva com imagem de fundo
- ✅ Responsivo para desktop e mobile

### 🖼️ **Sistema de Imagens**
- ✅ Busca automática de imagens por tema
- ✅ Integração com sistema de imagens demo
- ✅ Imagens contextuais de alta qualidade

### 📊 **Sistema de Status**
- ✅ Eventos ativos, expirados e concluídos
- ✅ Flags de conclusão: Realizado, Cancelado, Remarcado
- ✅ Interface diferenciada por status
- ✅ Prevenção de visualização de eventos concluídos

### 📱 **Interface Responsiva**
- ✅ Design moderno e intuitivo
- ✅ Componentes acessíveis
- ✅ Totalmente responsivo
- ✅ Animações suaves

## 🚀 **URLs da Aplicação**

### 🌐 **Produção (Next.js + TypeScript)**
**URL:** TBA

## 📁 **Estrutura do Projeto**

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── auth/             # Componentes de autenticação
│   ├── events/           # Componentes de eventos
│   └── layout/           # Componentes de layout
├── contexts/             # Contextos React
│   ├── AuthContext.tsx   # Contexto de autenticação
│   └── EventContext.tsx  # Contexto de eventos
├── services/             # Serviços externos
│   ├── firebase.ts       # Configuração Firebase
│   └── unsplashService.ts # Serviço Unsplash
├── utils/                # Utilitários
│   └── dateUtils.ts      # Funções de data
├── types/                # Definições TypeScript
│   └── event.ts          # Tipos de eventos
└── lib/                  # Bibliotecas
    └── utils.ts          # Utilitários CSS
```

## 🛠️ **Comandos de Desenvolvimento**

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar linting
npm run lint

# Executar em produção
npm start
```

## ✨ **Funcionalidades Implementadas**

### ✅ **Concluídas**
- [x] Projeto Next.js com TypeScript configurado
- [x] Sistema de autenticação (modo demo)
- [ ] CRUD completo de eventos
- [x] Contador regressivo em tempo real
- [x] Sistema de imagens por tema
- [x] Interface responsiva moderna
- [x] Validação de formulários
- [x] Sistema de status de eventos
- [ ] Deploy em produção
- [ ] Documentação completa

### 🎯 **Melhorias Futuras**
- [ ] Integração real com Firebase Auth
- [ ] Integração real com API do Unsplash
- [ ] Sistema de notificações
- [ ] Compartilhamento de eventos
- [ ] Exportação para calendário
- [ ] Modo escuro/claro
- [ ] Internacionalização (i18n)

## 🎨 **Design System**

### **Cores Principais**
- **Primária:** Purple (#8B5CF6)
- **Secundária:** Green (#10B981)
- **Alerta:** Orange (#F59E0B)
- **Erro:** Red (#EF4444)

### **Componentes**
- Baseados no **shadcn/ui**
- Totalmente tipados com **TypeScript**
- Acessíveis e responsivos
- Consistência visual em toda aplicação

## 📈 **Performance**

- ✅ **Build otimizado** com Next.js
- ✅ **Código splitting** automático
- ✅ **Imagens otimizadas**
- ✅ **CSS otimizado** com Tailwind
- ✅ **TypeScript** para detecção precoce de erros
- ✅ **ESLint** para qualidade de código

## 🔒 **Segurança**

- ✅ Validação de entrada em todos os formulários
- ✅ Sanitização de dados
- ✅ Proteção contra XSS
- ✅ Headers de segurança configurados

---

##  **Projeto anida não finalizado!**



**Desenvolvido usando Next.js, TypeScript e as melhores práticas de desenvolvimento web.**

