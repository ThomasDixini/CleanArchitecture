# CleanArchitecture

Este repositório contém um exemplo de arquitetura limpa em TypeScript.

**Pré-requisitos**
- Node.js (versão LTS recomendada)
- npm (incluído com Node.js)

**Instalação**
1. Instale as dependências:

```bash
npm install
```

**Scripts úteis**
- Executar checagem TypeScript e testes (Jest):

```bash
npm test
```

- Compilar/verificar TypeScript (sem emitir arquivos):

```bash
npm run tsc
```

- Executar em modo de desenvolvimento (usa `nodemon`):

```bash
npm run dev
```

**Observações**
- O script `test` executa `npm run tsc -- --noEmit && jest`, portanto o TypeScript é verificado antes dos testes.
- Se precisar executar apenas os testes sem checagem TypeScript, execute `jest` diretamente (ex.: `npx jest`).

Se quiser, eu posso também adicionar instruções para configurar um banco SQLite local ou exemplos de endpoints para testes manuais.
