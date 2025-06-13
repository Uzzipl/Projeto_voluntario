document.addEventListener('DOMContentLoaded', function() {
    const listaNecessidades = document.getElementById('listaNecessidades');
    const pesquisaInput = document.getElementById('pesquisa');
    const filtroTipo = document.getElementById('filtroTipo');
    
    // Carregar necessidades do localStorage
    let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    
    // Exibir todas as necessidades inicialmente
    exibirNecessidades(necessidades);
        // Filtro por pesquisa
    pesquisaInput.addEventListener('input', function() {
        filtrarNecessidades();
    });
    
    // Filtro por tipo
    filtroTipo.addEventListener('change', function() {
        filtrarNecessidades();
    });
        function filtrarNecessidades() {
        const termoPesquisa = pesquisaInput.value.toLowerCase();
        const tipoSelecionado = filtroTipo.value;
        
        const necessidadesFiltradas = necessidades.filter(necessidade => {
            const correspondePesquisa = 
                necessidade.tituloNecessidade.toLowerCase().includes(termoPesquisa) || 
                necessidade.descricao.toLowerCase().includes(termoPesquisa);
            
            const correspondeTipo = 
                !tipoSelecionado || necessidade.tipoAjuda === tipoSelecionado;
            
            return correspondePesquisa && correspondeTipo;
        });
        
        exibirNecessidades(necessidadesFiltradas);
    }

