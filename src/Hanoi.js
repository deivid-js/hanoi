const Hanoi = function(numDiscos) {
    this.movimentos = [];
    this.numDiscos = numDiscos || 3;

    this.makeMove = function(disco, origem, destino, aux) {
        if (disco == 0) return;

        this.makeMove(disco - 1, origem, aux, destino);

        this.addMove({disco, origem, destino});

        this.makeMove(disco - 1, aux, destino, origem);
    }

    this.handle = function() {
        this.makeMove(parseInt(this.numDiscos), 0, 2, 1);
        
        return this.movimentos;
    }

    this.addMove = function(obj) {
        this.movimentos.push(obj);
    }

}
