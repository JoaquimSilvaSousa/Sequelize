# Sequelize

# Node.js + MySQL (CRUD com Express e Handlebars)

Este projeto demonstra como conectar uma aplicação Node.js com MySQL usando `express`, `express-handlebars` e `mysql2`. Inclui operações CRUD básicas (Create, Read, Update, Delete) para uma tabela `books`.

---

## Pré-requisitos

* Node.js (v14+ recomendado)
* MySQL / MySQL Workbench
* npm

---

## Instalação e dependências

No diretório do projeto, rode:

```bash
npm init -y
npm install express express-handlebars mysql2
npm install nodemon --save-dev
```

No `package.json` você pode adicionar o script para desenvolvimento:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## Estrutura de pastas

```
project-root/
├─ public/
│  └─ css/
│     └─ styles.css
├─ views/
│  ├─ layouts/
│  │  └─ main.handlebars
│  ├─ home.handlebars
│  ├─ books.handlebars
│  └─ book.handlebars
│  └─ editbook.handlebars
├─ db/
│  └─ conn.js
└─ index.js
```

---

## Arquivos principais (resumo)

### `views/layouts/main.handlebars`

Template base com o `{{{ body }}}` e link para o CSS.

### `views/home.handlebars`

Formulário para cadastrar livros.

### `views/books.handlebars`

Lista de livros com link para cada detalhe.

### `views/book.handlebars`

Página de um livro específico com botão de editar e remover.

### `views/editbook.handlebars`

Formulário para editar um livro (preenchido com os dados atuais).

### `public/css/styles.css`

Estilos básicos e estilos para layout, navbar e lista de livros.

---

## Banco de dados (MySQL)

No Workbench (ou outro cliente) rode:

```sql
CREATE DATABASE nodemysql;
USE nodemysql;

CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  pageqty INT NULL,
  PRIMARY KEY (id)
);
```

---

## Conexão com MySQL (pool recomendado)

Crie `db/conn.js` com o pool (recomendado):

```js
const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

module.exports = pool;
```

No `index.js` importe o pool:

```js
const pool = require('./db/conn');
```

E troque `conn.query(...)` por `pool.query(...)` (ou continue usando `conn` como alias para o pool).

---

## `index.js` (fluxo básico)

* Configurar `express` e `express-handlebars`.
* Habilitar `express.urlencoded()` e `express.json()` para capturar `req.body`.
* `app.use(express.static('public'))` para servir arquivos estáticos.
* Rotas principais:

  * `GET /` → renderiza `home` (formulário de cadastro)
  * `POST /books/insertbook` → insere um livro no banco
  * `GET /books` → lista todos os livros
  * `GET /books/:id` → exibe os dados de um livro específico
  * `GET /books/edit/:id` → carrega formulário de edição preenchido
  * `POST /books/updatebook` → atualiza o livro
  * `POST /books/remove/:id` → remove o livro

**Observação:** com pool você não precisa chamar `connect()`; apenas rode `app.listen(3000)`.

---

## Protegendo contra SQL Injection

Evite concatenar strings diretamente em queries. Use placeholders (`?`) e `??` do `mysql2`:

```js
// inserir
const query = 'INSERT INTO books (title, pageqty) VALUES (?, ?)';
conn.query(query, [title, pageqty], (err) => { ... });

// selecionar por id
const query = 'SELECT * FROM books WHERE id = ?';
conn.query(query, [id], (err, results) => { ... });

// atualizar
const query = 'UPDATE books SET title = ?, pageqty = ? WHERE id = ?';
conn.query(query, [title, pageqty, id], (err) => { ... });

// remover
const query = 'DELETE FROM books WHERE id = ?';
conn.query(query, [id], (err) => { ... });
```

Usar parâmetros evita injeção e problemas com aspas.

---

## Sugestões de melhorias

* Mover credenciais do banco para variáveis de ambiente (`.env`) usando `dotenv`.
* Adicionar validação no servidor para os campos do formulário.
* Tratar erros com mensagens amigáveis e exibir `flash messages` após operações.
* Paginação e pesquisa na listagem de livros.
* API REST separada (JSON) para consumo por front-ends distintos.

---

## Como rodar

1. Configure o banco de dados e crie a tabela `books` (ver seção SQL acima).
2. Ajuste as credenciais em `db/conn.js` (ou use `.env`).
3. Instale dependências: `npm install`.
4. Rode em desenvolvimento: `npm run dev` (se configurou) ou `npm start`.
5. Abra no navegador: `http://localhost:3000`

---
