# OxenteFilmes

![Logo OxenteFilmes](./public/logo.png)

## Sobre o projeto

OxeFilmes é uma plataforma de catálogo de filmes.  
O projeto é composto por um frontend moderno em React (com ShadCN e Tailwind) e um backend próprio em Node.js/Express com banco de dados MySQL.  
Permite aos usuários cadastrar, visualizar e explorar filmes com título, descrição, ano, categoria, imagem e trailer.

---

## Tecnologias Utilizadas

- React 18 + TypeScript
- Vite
- Tailwind CSS + ShadCN/UI
- Lucide Icons

---

## Funcionalidades

- Modal para adicionar filmes
- Integração com API RESTful
- Formulário com validação completa (URL, campos obrigatórios)
- Cadastro de título, descrição, ano, imagem, trailer e categoria
- Layout responsivo e estilizado com ShadCN
- Feedback visual de sucesso e erro

---

## Rodando o projeto localmente

### Pré-requisitos

- Node.js (v16 ou superior)
- MySQL rodando localmente (porta padrão: 3306)
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/Scajk/OxenteFilmes-web.git
cd OxenteFilmes-web

# Instale as dependências
npm install
# ou
yarn install

# Rode a aplicação em modo desenvolvimento
npm run dev
# ou
yarn dev
