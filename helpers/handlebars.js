module.exports = {

    formatDate(date) {
        return new Date(date).toLocaleString("pt-BR", {
            dateStyle: 'short',
            timeStyle: 'short'
        })
    },

    eq(a, b) { //Nao entendi isso ainda, mas é pra verificar se é admin dentro de um each 
        return a === b;
    },

     activePage(currentPage, page) {
        return currentPage === page ? "active" : "";
    }


}