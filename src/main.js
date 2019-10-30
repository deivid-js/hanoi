const torre = new Torre;
let iniciado = false;

(function() {
    setTimeout(() => byId('loading').style.display = 'none', 250);

    clear();

    byId('processar')
        .addEventListener('click', () => {
            if (byId('processando').value  === 't') {
                loadAlert('Uma solução já está sendo processada!');

                return;
            }

            const numeroDiscos = byId('numero-discos').value;

            if (numeroDiscos > 2 && numeroDiscos <= 10) {
                iniciado = false;

                byId('status').innerHTML = 'PARADO';

                loading(
                    () => {
                        clear();
                        execute(numeroDiscos);
                    }
                );
            } else {
                loadAlert('Número de discos inválido');
            }
        });

    byId('iniciar')
        .addEventListener('click', () => {
            if (iniciado) {
                loadAlert('A solução já foi iniciada');
                
                return;
            }

            byId('processando').value = 't';
            byId('status').innerHTML = 'PROCESSANDO SOLUÇÃO';

            const time = parseInt(byId('timeout').value);

            if (time > 0) {
                torre.setTime(time);
            }

            torre.start();

            iniciado = true;
        });

    byId('parar')
        .addEventListener('click', () => {
            if (byId('processando').value === 't') {
                torre.stop = true;
            } else {
                loadAlert('Não');
            }
        });
})();

function execute(num) {
    const movimentos = new Hanoi(num).handle();

    torre.init({num, movimentos});
    
    byId('total').innerHTML = movimentos.length;
    byId('minimos').innerHTML = Math.pow(2, num) - 1;

    movimentos.forEach(render);
}

function render(movimento, index) {
    byId('movimentos').innerHTML += `
        <div class="movimento-item" id="mov-${index}">
            <div>${index + 1}</div>
            <div>${movimento.disco}</div>
            <div>${torreFromNumero(movimento.origem)}</div>
            <div>${torreFromNumero(movimento.destino)}</div>
        </div>
    `;
}

function loading(callback) {
    byId('loading').style.display = 'flex';
    
    new Promise((resolve, reject) => {
        setTimeout(
            () => {
                callback();

                resolve('ok');
            }
        , 250);
    }).then(res => {
        byId('loading').style.display = 'none';
    });
}

function torreFromNumero(n) {
    return `T${n + 1}`;
}

function loadAlert(mensagem) {
    alert(mensagem);
}

function clear() {
    byId('total').innerHTML = '0';
    byId('movimento-atual').innerHTML = '0';
    byId('minimos').innerHTML = '0';
    byId('movimentos').innerHTML = null;
    byId('discos-t1').innerHTML = null;
    byId('discos-t2').innerHTML = null;
    byId('discos-t3').innerHTML = null;
}

function byId(id) {
    return document.getElementById(id);
}
