import sqlite3

# Conectar (ou criar) banco de dados
conn = sqlite3.connect('biblioteca.db')
cursor = conn.cursor()

# Criar tabela de livros
cursor.execute('''
CREATE TABLE IF NOT EXISTS livros (
    codigo INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    ano INTEGER,

)
''')
conn.commit()

# Funções principais

def adicionar_livro(titulo, autor, ano, editora):
    cursor.execute('INSERT INTO livros (titulo, autor, ano, editora) VALUES (?, ?, ?, ?)', 
                   (titulo, autor, ano, editora))
    conn.commit()
    print("✅ Livro adicionado com sucesso!")

def listar_livros():
    cursor.execute('SELECT * FROM livros')
    livros = cursor.fetchall()
    for livro in livros:
        print(f"codigo: {livro[0]} | Título: {livro[1]} | Autor: {livro[2]} | Ano: {livro[3]}")

def buscar_livro_por_titulo(titulo):
    cursor.execute('SELECT * FROM livros WHERE titulo LIKE ?', ('%' + titulo + '%',))
    livros = cursor.fetchall()
    for livro in livros:
        print(f"codigo: {livro[0]} | Título: {livro[1]} | Autor: {livro[2]} | Ano: {livro[3]}")

def remover_livro(id):
    cursor.execute('DELETE FROM livros WHERE id = ?', (id,))
    conn.commit()
    print("🗑️ Livro removido.")

# Interface simples (terminal)
def menu():
    while True:
        print("\n📚 Sistema de Biblioteca")
        print("1 - Adicionar livro")
        print("2 - Listar livros")
        print("3 - Buscar livro por título")
        print("4 - Remover livro")
        print("0 - Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == '1':
            titulo = input("Título: ")
            autor = input("Autor: ")
            ano = int(input("Ano: "))
            codigo = input("Código: ")
            adicionar_livro(titulo, autor, ano, codigo)
        elif opcao == '2':
            listar_livros()
        elif opcao == '3':
            busca = input("Digite o título para buscar: ")
            buscar_livro_por_titulo(busca)
        elif opcao == '4':
            id = int(input("codigo do livro para remover: "))
            remover_livro(id)
        elif opcao == '0':
            print("👋 Saindo...")
            break
        else:
            print("Opção inválida, tenta de novo!")

menu()

# Encerrar conexão com banco de dados
conn.close()