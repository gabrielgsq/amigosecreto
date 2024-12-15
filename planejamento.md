# Planejamento Inicial para o Desenvolvimento da Aplicação **Amigo Secreto 2024**

## 1. Definição do Escopo Geral
- O objetivo é desenvolver um sistema que organiza eventos de amigo secreto com:
  - Autenticação de usuários.
  - Criação e gerenciamento de grupos.
  - Sorteio automático de participantes.
  - Envio de e-mails com os resultados.
  - Sugestões de presentes baseadas em gostos pessoais, integradas com uma API de inteligência artificial (ChatGPT).

---

## 2. Planejamento Inicial
### a) Backend
1. **Estruturação da API:**
   - Escolher Node.js com Express para construir as rotas.
   - Banco de dados NoSQL (MongoDB) para armazenar usuários, grupos e participantes.
2. **Principais Rotas a Criar:**
   - **Autenticação:**
     - `POST /users` - Criar conta.
     - `POST /users/login` - Realizar login e obter token JWT.
     - `POST /users/changepass` - Alterar senha do usuário.
   - **Grupos:**
     - `POST /groups` - Criar grupo.
     - `POST /groups/meusgrupos` - Listar grupos do organizador.
     - `POST /groups/participar` - Cadastrar-se em um grupo.
     - `POST /groups/sorteargroup` - Realizar sorteio e enviar e-mails.

3. **Configurações de Segurança:**
   - Implementar autenticação JWT para proteger rotas sensíveis.
   - Armazenar senhas com hash (bcrypt).

4. **Integração com APIs Externas:**
   - Usar a API do ChatGPT para gerar sugestões de presentes.

### b) Frontend
1. **Tecnologias Escolhidas:**
   - React.js para construir uma interface moderna e responsiva.
   - React Router para gerenciamento de rotas.

2. **Estruturação das Páginas:**
   - **Landing Page:** Explica os benefícios da aplicação.
   - **Cadastro/Login:** Telas para criação de conta e autenticação.
   - **Dashboard do Usuário:**
     - Criar grupo.
     - Visualizar grupos criados e participantes.
     - Finalizar o sorteio.
   - **Convite de Participação:** Tela para convidados se cadastrarem no grupo.

3. **Estilização:**
   - Usar CSS Modules para organizar e modularizar os estilos.

---

## 3. Cronograma de Desenvolvimento
1. **Dia 1-2:**
   - Configuração inicial do projeto no backend e frontend.
   - Implementação da autenticação e estrutura do banco de dados.
2. **Dia 3-4:**
   - Implementação das rotas de criação de grupos e participação.
   - Desenvolvimento da interface para criação de grupos no frontend.
3. **Dia 5-6:**
   - Integração com a API do ChatGPT.
   - Implementação do sorteio e envio de e-mails.
4. **Dia 7:**
   - Testes finais e ajustes de bugs.
   - Implantação em ambiente de produção.

---

## 4. Considerações Finais
- Este planejamento serve como guia geral para a construção da aplicação. Detalhes específicos serão definidos à medida que o desenvolvimento progrida.
- O objetivo é entregar um produto funcional, seguro e com uma boa experiência de usuário.
