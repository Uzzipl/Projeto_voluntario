document.addEventListener('DOMContentLoaded', function() {
    const listaNecessidades = document.getElementById('listaNecessidades');
    const pesquisaInput = document.getElementById('pesquisa');
    const filtroTipo = document.getElementById('filtroTipo');
    
    // Carregar necessidades do localStorage
    let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    
    // Exibir todas as necessidades inicialmente
    exibirNecessidades(necessidades);