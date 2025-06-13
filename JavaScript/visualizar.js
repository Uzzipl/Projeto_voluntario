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
    function exibirNecessidades(necessidadesParaExibir) {
        listaNecessidades.innerHTML = '';
        
        if (necessidadesParaExibir.length === 0) {
            listaNecessidades.innerHTML = '<p>Nenhuma necessidade encontrada.</p>';
            return;
        }
        
        necessidadesParaExibir.forEach(necessidade => {
            const card = document.createElement('div');
            card.className = 'necessidade-card';
            
            card.innerHTML = `
                <h3>${necessidade.tituloNecessidade}</h3>
                <p><strong>Instituição:</strong> ${necessidade.nomeInstituicao}</p>
                <p><strong>Tipo de Ajuda:</strong> ${necessidade.tipoAjuda}</p>
                <p><strong>Descrição:</strong> ${necessidade.descricao}</p>
                <p><strong>Local:</strong> ${necessidade.rua ? necessidade.rua + ', ' : ''}${necessidade.bairro}, ${necessidade.cidade} - ${necessidade.estado}</p>
                <p><strong>Contato:</strong> ${necessidade.contato}</p>
                <p><small>Cadastrado em: ${necessidade.dataCadastro}</small></p>
            `;
            
            listaNecessidades.appendChild(card);
        });
    }
});