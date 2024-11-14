let usuarios = [];
let demandas = [];

document.getElementById('btn-cadastrar-usuario').addEventListener('click', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome-usuario').value;
    const email = document.getElementById('email-usuario').value;

    if (nome && email) {
        const usuario = { id: usuarios.length + 1, nome, email };
        usuarios.push(usuario);
        atualizarSelectUsuarios();
        alert('Usuário cadastrado com sucesso!');
        document.getElementById('form-usuario').reset();
    }
});

function atualizarSelectUsuarios() {
    const selectUsuario = document.getElementById('usuario-demanda');
    selectUsuario.innerHTML = '';

    usuarios.forEach((usuario) => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nome;
        selectUsuario.appendChild(option);
    });
}

document.getElementById('btn-cadastrar-demanda').addEventListener('click', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo-demanda').value;
    const descricao = document.getElementById('descricao-demanda').value;
    const usuarioId = document.getElementById('usuario-demanda').value;

    if (titulo && descricao && usuarioId) {
        const demanda = {
            id: demandas.length + 1,
            titulo,
            descricao,
            usuarioId,
            status: 'Aberta'
        };
        demandas.push(demanda);
        atualizarTabelaDemandas();
        alert('Demanda cadastrada com sucesso!');
        document.getElementById('form-demanda').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function atualizarTabelaDemandas() {
    const tbody = document.getElementById('tbody-demandas');
    tbody.innerHTML = '';

    demandas.forEach((demanda) => {
        const usuario = usuarios.find((u) => u.id == demanda.usuarioId);
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${demanda.titulo}</td>
            <td>${usuario ? usuario.nome : 'Usuário não encontrado'}</td>
            <td>${demanda.status}</td>
            <td>
                <button onclick="alterarStatus(${demanda.id})">Alterar Status</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function alterarStatus(demandaId) {
    const demanda = demandas.find((d) => d.id === demandaId);

    if (demanda) {
        demanda.status = demanda.status === 'Aberta' ? 'Em Andamento' : 'Concluída';
        atualizarTabelaDemandas();
        alert(`Status da demanda "${demanda.titulo}" atualizado para: ${demanda.status}`);
    }
}
