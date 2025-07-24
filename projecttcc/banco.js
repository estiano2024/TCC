const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Criação das tabelas, se não existirem
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS autores (
    id_autor INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nacionalidade TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS livros (
    id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    id_autor INTEGER,
    id_categoria INTEGER,
    ano_publicacao INTEGER,
    quantidade_total INTEGER DEFAULT 1,
    quantidade_disponivel INTEGER DEFAULT 1,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    telefone TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS emprestimos (
    id_emprestimo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_livro INTEGER,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    devolvido BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
  )`);
});

module.exports = db;
