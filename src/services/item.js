// ===============================
// Serviços relacionados ao "item"
// ===============================

// Casos de uso do item:
// - Criar um item
// - Obter um item
// - Atualizar um item existente
// - Deletar um item
// - Criar item com subtotal certo

/**
 * Cria um novo item para o carrinho.
 * @param {string} name - Nome do produto.
 * @param {number} price - Preço unitário do produto.
 * @param {number} quantity - Quantidade do produto.
 * @returns {Object} Item criado, com método subtotal().
 */
async function createItem(name, price, quantity) {
    return {
        name, // Nome do produto
        price, // Preço unitário
        quantity, // Quantidade
        // Calcula o subtotal do item (preço * quantidade)
        subtotal: () => price * quantity
    }
}

export default createItem;

