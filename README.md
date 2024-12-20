﻿# amigosecreto

# Documentação do Projeto Amigo Secreto

## Visão Geral do Projeto
O **Amigo Secreto 2024** é uma aplicação inovadora que organiza a brincadeira tradicional de amigo oculto com facilidade e praticidade. O sistema oferece uma interface intuitiva para criar eventos, permitir a participação de convidados, realizar o sorteio e enviar os resultados por e-mail. Além disso, integra uma inteligência artificial generativa (ChatGPT) para sugerir presentes personalizados com base nos gostos dos participantes.

### Funcionalidades Principais
1. **Landing Page** para apresentação da aplicação.
2. **Autenticação JWT** para segurança dos dados do usuário.
3. **Criação de Grupos** com informações personalizadas (nome e observações).
4. **Participação de Usuários** em grupos através de links exclusivos.
5. **Sorteio Automático** de participantes com envio de e-mails.
6. **Sugestões de Presentes** usando a API do ChatGPT.
7. **Gerenciamento de Conta** (criação, alteração de senha e exclusão).

## Estrutura do Projeto

### Backend (Node.js + Express)
```
backend/
|-- node_modules/
|-- src/
|   |-- config/
|   |   `-- db.js          # Conexão com MongoDB
|   |-- controllers/
|   |   |-- groupController.js
|   |   |-- userController.js
|   |   `-- iaTips.js      # Lógica de sugestão via IA
|   |-- middlewares/
|   |   `-- authMiddleware.js
|   |-- routes/
|   |   |-- groupRoutes.js
|   |   `-- userRoutes.js
|   `-- app.js             # Configuração geral do backend
|-- .env                   # Variáveis de ambiente (senhas, tokens)
|-- authRoutes.js
|-- package.json
|-- server.js              # Inicialização do servidor
```

### Frontend (React)
```
frontend/
|-- public/
|-- src/
|   |-- components/        # Componentes reutilizáveis
|   |   |-- CriarGrupo.jsx
|   |   |-- AlterarSenha.jsx
|   |   `-- MeusGrupos.jsx
|   |-- layouts/           # Estruturas de layout principais
|   |-- pages/             # Páginas da aplicação
|   |   |-- Home/
|   |   |-- Dashboard/
|   |   `-- Landingpage.jsx
|   |-- routes/
|   |   `-- AppRoutes.jsx  # Configuração das rotas
|   |-- styles/            # Arquivos CSS
|   |-- frontconfig.js     # Configuração de URL do backend
|   `-- App.jsx
|-- package.json
|-- index.html
```

## Endpoints da API
### Autenticação
| Método | Rota                     | Descrição                        |
|---------|--------------------------|----------------------------------|
| POST    | `/users/login`           | **Login de usuário**. Espera receber um objeto JSON: <br> `{ "email": "usuario@email.com", "senha": "suaSenha" }`.<br> Retorna um token JWT: `{ "message": "Login realizado com sucesso", "token": "<token>" }` |
| POST    | `/users`                 | **Criação de conta**. Espera um objeto JSON: <br> `{ "email": "usuario@email.com", "senha": "senha123" }`.<br> Resposta: `{ "menssage": "Cadastro realizado com sucesso" }` ou erro caso o e-mail exista. |
| POST    | `/users/changepass`      | **Alteração de senha (protegido)**. Recebe um token JWT no cabeçalho `Authorization` e JSON: <br> `{ "oldPassword": "senhaAntiga", "newPassword": "novaSenha" }`. <br> Resposta: `{ "message": "Senha atualizada" }`. |
| POST    | `/users/recuperarsenha`  | **Recuperação de senha**. Espera um objeto JSON: <br> `{ "email": "usuario@email.com" }`.<br> Envia a nova senha para o e-mail. Resposta: `{ "message": "Email encontrado" }`. |
| POST    | `/users/excluirconta`    | **Exclusão da conta do usuário**. Requer token JWT no cabeçalho `Authorization`. Resposta: `{ "message": "Excluído" }`. |

### Gerenciamento de Grupos
| Método | Rota                     | Descrição                        |
|---------|--------------------------|----------------------------------|
| POST    | `/groups`                | **Criação de um grupo** (protegido). Recebe um token JWT e JSON: <br> `{ "groupName": "Nome do Grupo", "obs": "Observações" }`. <br> Resposta: `{ "message": "Grupo Criado!" }`. |
| POST    | `/groups/meusgrupos`     | **Listar grupos do usuário**. Requer token JWT. Retorna os grupos criados pelo usuário. |
| POST    | `/groups/participar`     | **Participar de um grupo**. Recebe JSON: <br> `{ "id": "<idGrupo>", "nome": "Seu Nome", "email": "email@email.com", "gostos": "Seus gostos" }`. <br> Resposta: `{ "message": "Cadastro Realizado com Sucesso" }`. |
| POST    | `/groups/checkgroup`     | **Verificar status de um grupo**. Recebe JSON: <br> `{ "id": "<idGrupo>" }`. <br> Resposta: `{ "message": "ok", "open": true, "groupName": "Nome do Grupo" }`. |
| POST    | `/groups/delgroup`       | **Deletar grupo** (protegido). Requer token JWT e JSON: <br> `{ "id": "<idGrupo>" }`. Resposta: `{ "message": "ok" }`. |
| POST    | `/groups/sorteargroup`   | **Realizar sorteio**. Requer token JWT e JSON: <br> `{ "id": "<idGrupo>" }`. Envia e-mails e retorna: `{ "message": "ok" }`. |

### Exemplo de Request - Criação de Grupo
**Endpoint:** `POST /groups`
```json
{
  "groupName": "Amigo Secreto da Familia",
  "obs": "Evento dia 24/12, valor médio do presente R$100."
}
```
**Response:**
```json
{
  "message": "Grupo Criado!"
}
```

## Execução do Projeto
### Backend
1. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend
1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Execute o projeto:
   ```bash
   npm run dev
   ```

## Tecnologias Utilizadas
- **Backend:** Node.js, Express, MongoDB, JWT, Nodemailer
- **Frontend:** React.js, React Router, CSS Modules
- **IA:** OpenAI GPT-3.5 API
