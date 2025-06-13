document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('necessidadeForm');
    const cepInput = document.getElementById('cep');
    const buscarCepBtn = document.getElementById('buscarCep');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    
    // Array para armazenar as necessidades
    let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    // Buscar CEP via API ViaCEP
    buscarCepBtn.addEventListener('click', function() {
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP inválido. Digite 8 números.');
            return;
        }
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado.');
                    return;
                }
                
                ruaInput.value = data.logradouro || '';
                bairroInput.value = data.bairro || '';
                cidadeInput.value = data.localidade || '';
                estadoInput.value = data.uf || '';
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP. Tente novamente.');
            });
    });
        // Validar e enviar formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nomeInstituicao = document.getElementById('nomeInstituicao').value;
        const tipoAjuda = document.getElementById('tipoAjuda').value;
        const tituloNecessidade = document.getElementById('tituloNecessidade').value;
        const descricao = document.getElementById('descricao').value;
        const contato = document.getElementById('contato').value;
        
        if (!nomeInstituicao || !tipoAjuda || !tituloNecessidade || !descricao || !contato) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }
                // Criar objeto de necessidade
        const necessidade = {
            id: Date.now(),
            nomeInstituicao,
            tipoAjuda,
            tituloNecessidade: tituloNecessidade,
            descricao,
            cep: cepInput.value,
            rua: ruaInput.value,
            bairro: bairroInput.value,
            cidade: cidadeInput.value,
            estado: estadoInput.value,
            contato,
            dataCadastro: new Date().toLocaleDateString()
        };
        
        // Adicionar ao array e salvar no localStorage
        necessidades.push(necessidade);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
        
        // Limpar formulário
        form.reset();
        ruaInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        estadoInput.value = '';
        
        alert('Necessidade cadastrada com sucesso!');
    });
});

