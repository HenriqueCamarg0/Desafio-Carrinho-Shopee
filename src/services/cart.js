// ===============================
// Serviços relacionados ao carrinho
// ===============================

// Funcionalidades do carrinho de compras:
// - Adicionar produtos ao carrinho
// - Atualizar a quantidade de produtos no carrinho
// - Remover produtos do carrinho
// - Calcular o total do carrinho

/**
 * Adiciona um item ao carrinho do usuário.
 * @param {Array} userCart - Carrinho do usuário.
 * @param {Object} item - Item a ser adicionado.
 */
async function addItem(userCart, item) {
    userCart.push(item); 
}
 
/**
 * Calcula o valor total do carrinho.
 * @param {Array} userCart - Carrinho do usuário.
 */
async function calculateTotalCartValue(userCart) {
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
    console.log('Total do carrinho:', result); 
}

/**
 * Atualiza a quantidade de um item no carrinho.
 * @param {Array} userCart - Carrinho do usuário.
 * @param {string} name - Nome do item.
 * @param {number} quantity - Nova quantidade.
 */
async function updateItemQuantity(userCart, name, quantity) {
    const item = userCart.find(i => i.name === name);
    if (item) {
        item.quantity = quantity;
        // Atualiza subtotal se houver método específico
        if (typeof item.updateSubtotal === 'function') {
            item.updateSubtotal();
        }
    }
}

/**
 * Remove um item do carrinho pelo nome.
 * @param {Array} userCart - Carrinho do usuário.
 * @param {string} name - Nome do item a ser removido.
 */
async function deleteItemFromCart(userCart, name) {
    const index = userCart.findIndex(i => i.name === name);
    if (index !== -1) {
        userCart.splice(index, 1);
    }
}

/**
 * Diminui a quantidade de um item no carrinho ou remove se for 1.
 * @param {Array} userCart - Carrinho do usuário.
 * @param {string} name - Nome do item.
 */
async function removeItemFromCart(userCart, name) {
    const item = userCart.find(i => i.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        // Atualiza subtotal se houver método específico
        if (typeof item.updateSubtotal === 'function') {
            item.updateSubtotal();
        }
    } else if (item) {
        // Se a quantidade for 1, remove o item do carrinho
        const index = userCart.indexOf(item);
        userCart.splice(index, 1);
    }
}

export default {
    addItem,
    deleteItemFromCart,
    removeItemFromCart,
    calculateTotalCartValue
};