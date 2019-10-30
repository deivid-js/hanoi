const Torre = function() {
    this.time = 1000;
    this.total = 0;
    this.movimentos = null;
    this.discos = null;
    this.stop = false;
    this.cores = [
        'red',
        'green',
        'yellow',
        'pink',
        'blue',
        'gray',
        'orange',
        'purple',
        'blue2',
        'orange2'
    ];

    this.setTime = function(time) {
        if (time > 0) {
            this.time = time;
        }
    }

    this.init = function({num, movimentos}) {
        this.total = movimentos.length;
        this.movimentos = movimentos;

        const t1 = byId('discos-t1');
        
        this.discos = this.generate(num);
        this.discos.forEach((disco, index) => {
            t1.innerHTML = `
                <div
                    class="disco"
                    bg="${disco.cor}"
                    n="${index + 1}"
                    id="${disco.id}"
                >
                    ${disco.num}
                </div>
            ` + t1.innerHTML;
        });
    }

    this.generate = function(n) {
        let arr = [];

        for (let i = n; i >= 1; i--) {
            arr.push({
                num: parseInt(i),
                cor: this.cores[i - 1],
                id: '_' + Math.random().toString(36).substr(2, 9)
            });
        }

        return arr;
    }

    this.start = function() {
        if (this.movimentos) {
            this.renderMove(0, this);
        }
    }

    this.getDisco = function(n) {
        let disco = null;

        this.discos.forEach(d => {
            if (d.num === n) {
                disco = d;
            }
        });

        return disco;
    }

    this.renderMove = function(index, me) {
        if (index >= me.total || me.stop) {
            byId('status').innerHTML = 'SOLUÇÃO PROCESSADA';

            me.stop = false;

            byId('processando').value = 'f';

            return;
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(me.movimentos[index]), me.time);
        }).then(res => {
            window.location.hash = `#mov-${index}`;

            const { id } = me.getDisco(res.disco);
            const disco = byId(id);
            const dest = byId(`discos-t${res.destino + 1}`);

            dest.innerHTML = disco.outerHTML + dest.innerHTML;

            byId('movimento-atual').innerHTML = index + 1;
            byId(`mov-${index}`).classList.add('destacado');

            if (index > 0) {
                byId(`mov-${index - 1}`).classList.remove('destacado');
            }

            disco.remove();

            me.renderMove(index + 1, me);
        });
    }

}
