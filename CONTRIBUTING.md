# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Projeto Blockchain Jarvis**! 🎉

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Mensagens de Commit](#mensagens-de-commit)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

---

## 📜 Código de Conduta

Este projeto adere ao [Contributor Covenant](https://www.contributor-covenant.org/). Ao participar, você concorda em manter um ambiente respeitoso e acolhedor para todos.

### Nossos Padrões

**Comportamentos Incentivados:**

- ✅ Usar linguagem acolhedora e inclusiva
- ✅ Respeitar diferentes pontos de vista e experiências
- ✅ Aceitar críticas construtivas graciosamente
- ✅ Focar no que é melhor para a comunidade
- ✅ Mostrar empatia com outros membros

**Comportamentos Inaceitáveis:**

- ❌ Uso de linguagem ou imagens sexualizadas
- ❌ Comentários insultuosos/depreciativos (trolling)
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas sem permissão
- ❌ Outras condutas não profissionais

---

## 🚀 Como Posso Contribuir?

### 1. Reportar Bugs 🐛

Encontrou um bug? Ajude-nos a melhorar!

1. **Verifique** se o bug já foi reportado em [Issues](https://github.com/tassiadossantos/projeto-blockchain-jarvis/issues)
2. **Crie uma nova issue** com:
   - Título descritivo
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Ambiente (browser, OS, versão do Node)

**Template:**

```markdown
**Descrição do Bug**
Breve descrição do problema.

**Passos para Reproduzir**

1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**

- Browser: Chrome 120
- OS: Windows 11
- Node: 18.17.0
```

### 2. Sugerir Funcionalidades 💡

Tem uma ideia? Adoraríamos ouvir!

1. **Verifique** se já existe uma issue similar
2. **Crie uma nova issue** com:
   - Descrição clara da funcionalidade
   - Por que seria útil
   - Exemplos de uso
   - Mockups/wireframes (se tiver)

### 3. Contribuir com Código 💻

#### Primeira Vez Contribuindo?

1. **Fork** o repositório
2. **Clone** seu fork:
   ```powershell
   git clone https://github.com/SEU-USUARIO/projeto-blockchain-jarvis.git
   cd projeto-blockchain-jarvis
   ```
3. **Configure** o upstream:
   ```powershell
   git remote add upstream https://github.com/tassiadossantos/projeto-blockchain-jarvis.git
   ```
4. **Instale** as dependências:
   ```powershell
   npm install
   ```

---

## 🔄 Processo de Desenvolvimento

### 1. Crie uma Branch

```powershell
git checkout -b feature/nome-da-funcionalidade
# ou
git checkout -b fix/nome-do-bug
```

**Convenção de Nomes:**

- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `style/` - Formatação, espaços em branco
- `refactor/` - Refatoração de código
- `test/` - Adicionar testes
- `chore/` - Tarefas de manutenção

### 2. Faça Suas Alterações

- ✅ Siga os [Padrões de Código](#padrões-de-código)
- ✅ Escreva testes para novas funcionalidades
- ✅ Atualize a documentação
- ✅ Execute os testes localmente

```powershell
# Executar testes
npm test

# Verificar linting
npm run lint

# Verificar formatação
npm run format:check

# Type checking
npm run typecheck
```

### 3. Commit

Siga as convenções de [Conventional Commits](https://www.conventionalcommits.org/):

```powershell
git add .
git commit -m "feat: adiciona funcionalidade X"
```

### 4. Push

```powershell
git push origin feature/nome-da-funcionalidade
```

### 5. Abra um Pull Request

1. Vá para o [repositório original](https://github.com/tassiadossantos/projeto-blockchain-jarvis)
2. Clique em **New Pull Request**
3. Selecione sua branch
4. Preencha o template do PR

---

## 📏 Padrões de Código

### TypeScript

- ✅ Modo strict habilitado
- ✅ Use tipos explícitos (evite `any`)
- ✅ Prefira interfaces sobre types quando possível
- ✅ Use const para valores que não mudam

**Bom:**

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  // implementação
};
```

**Ruim:**

```typescript
const getUser = async (id: any): Promise<any> => {
  // implementação
};
```

### React

- ✅ Use componentes funcionais
- ✅ Prefira hooks personalizados para lógica reutilizável
- ✅ Componentes devem ter uma responsabilidade única
- ✅ Use TypeScript para props

**Bom:**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

### CSS/Tailwind

- ✅ Use classes do Tailwind quando possível
- ✅ Agrupe classes relacionadas
- ✅ Use variáveis CSS para valores reutilizáveis

### Segurança

- 🔒 NUNCA armazene chaves privadas
- 🔒 Sempre sanitize inputs do usuário
- 🔒 Use HTTPS em produção
- 🔒 Valide dados do backend
- 🔒 Use Content Security Policy

---

## 📝 Mensagens de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Apenas documentação
- `style`: Formatação (não afeta o código)
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Adiciona ou corrige testes
- `chore`: Tarefas de manutenção
- `ci`: Mudanças no CI/CD
- `build`: Mudanças no build

### Exemplos

```
feat(wallet): adiciona suporte a Ledger hardware wallet

fix(swap): corrige cálculo de slippage em trocas grandes

docs(readme): atualiza instruções de instalação

style(button): ajusta espaçamento do componente Button

refactor(api): reorganiza estrutura de pastas da API

test(wallet): adiciona testes para conexão de carteira

chore(deps): atualiza dependências do projeto
```

---

## 🔍 Pull Requests

### Checklist

Antes de abrir um PR, certifique-se:

- [ ] Código compila sem erros
- [ ] Todos os testes passam
- [ ] Lint e formatação estão corretos
- [ ] Testes adicionados para novas funcionalidades
- [ ] Documentação atualizada
- [ ] Commits seguem Conventional Commits
- [ ] Branch está atualizada com `main`

### Template do PR

```markdown
## 📝 Descrição

Breve descrição das mudanças.

## 🎯 Tipo de Mudança

- [ ] 🐛 Bug fix
- [ ] ✨ Nova funcionalidade
- [ ] 💥 Breaking change
- [ ] 📝 Documentação
- [ ] ♻️ Refatoração
- [ ] ⚡ Performance

## 🧪 Como Foi Testado?

Descreva os testes realizados.

## 📸 Screenshots

Se aplicável, adicione screenshots.

## ✅ Checklist

- [ ] Meu código segue os padrões do projeto
- [ ] Realizei self-review
- [ ] Comentei código complexo
- [ ] Atualizei a documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes
- [ ] Todos os testes passam localmente
```

### Revisão de Código

- ✅ PRs serão revisados por mantenedores
- ✅ Feedbacks construtivos são bem-vindos
- ✅ Seja paciente, revisões levam tempo
- ✅ Responda aos comentários prontamente

---

## 🐛 Reportando Bugs

### Informações Essenciais

1. **Versão do projeto**
2. **Browser e versão**
3. **Sistema operacional**
4. **Passos para reproduzir**
5. **Comportamento esperado**
6. **Comportamento atual**
7. **Screenshots/vídeos**
8. **Logs de erro** (console do browser)

### Labels

- `bug` - Algo não está funcionando
- `critical` - Bug crítico, afeta funcionalidade principal
- `security` - Problema de segurança
- `help wanted` - Ajuda externa é bem-vinda

---

## 💡 Sugerindo Melhorias

### Informações Úteis

1. **Problema atual** - O que precisa melhorar?
2. **Solução proposta** - Como resolver?
3. **Alternativas** - Outras formas de resolver?
4. **Benefícios** - Por que isso é importante?
5. **Exemplos** - Mockups, código, links

### Labels

- `enhancement` - Nova funcionalidade ou melhoria
- `good first issue` - Boa para iniciantes
- `documentation` - Melhorias na documentação
- `question` - Mais informações são necessárias

---

## 🏆 Reconhecimento

Todos os contribuidores serão reconhecidos no projeto!

- README.md com lista de contribuidores
- Releases notes mencionando contribuições
- Possível convite para ser mantenedor

---

## 📚 Recursos Adicionais

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Web3 Documentation](https://web3js.readthedocs.io/)

---

## 📞 Precisa de Ajuda?

- **GitHub Discussions:** https://github.com/tassiadossantos/projeto-blockchain-jarvis/discussions
- **Issues:** https://github.com/tassiadossantos/projeto-blockchain-jarvis/issues

---

**Obrigado por contribuir! 🙏**

Desenvolvido com 💜 pela comunidade
