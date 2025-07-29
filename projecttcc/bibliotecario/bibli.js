function catalogarLivro() {
    let codigo = document.getElementById('codigo').value;
    let livros = JSON.parse(localStorage.getItem('livros')) || [];
    
    let livro = { codigo, titulo: 'Livro Exemplo', autor: 'Autor Desconhecido' };
    livros.push(livro);
    localStorage.setItem('livros', JSON.stringify(livros));
    alert('Livro catalogado!');
    exibirLivros();
}

function registrarEmprestimo() {
    let nome = document.getElementById('aluno-nome-emprestimo').value;
    let serie = document.getElementById('aluno-serie-emprestimo').value;
    let livro = document.getElementById('livro-emprestado').value;
    let dataEmprestimo = new Date();
    let dataDevolucao = new Date();
    dataDevolucao.setDate(dataEmprestimo.getDate() + 10);
    
    let emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    emprestimos.push({ nome, serie, livro, dataEmprestimo, dataDevolucao });
    localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
    alert('Empréstimo registrado!');
}

console.log()