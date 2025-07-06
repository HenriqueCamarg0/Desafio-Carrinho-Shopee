import createItem from "./services/item.js"
import cartService from "./services/cart.js"
import readline from "readline"

const mycart = []
const myWhishlist  = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function showMenu() {
    console.log("\n=== Menu Carrinho da Shopee ===")
    console.log("1 - Adicionar item")
    console.log("2 - Atualizar quantidade de item")
    console.log("3 - Remover uma unidade de item")
    console.log("4 - Deletar item do carrinho")
    console.log("5 - Ver carrinho")
    console.log("6 - Calcular total do carrinho")
    console.log("sair - Sair")
}

async function handleInput() {
    showMenu()
    rl.question("Escolha uma opção: ", async (answer) => {
        switch (answer.trim()) {
            case "1":
                rl.question("Nome do produto: ", async (name) => {
                    rl.question("Preço: ", async (price) => {
                        rl.question("Quantidade: ", async (quantity) => {
                            const item = await createItem(name, parseFloat(price), parseInt(quantity))
                            await cartService.addItem(mycart, item)
                            console.log("Item adicionado!")
                            handleInput()
                        })
                    })
                })
                break
            case "2":
                rl.question("Nome do produto para atualizar: ", (name) => {
                    rl.question("Nova quantidade: ", async (quantity) => {
                        await cartService.updateItemQuantity(mycart, name, parseInt(quantity))
                        console.log("Quantidade atualizada!")
                        handleInput()
                    })
                })
                break
            case "3":
                rl.question("Nome do produto para remover uma unidade: ", async (name) => {
                    await cartService.removeItemFromCart(mycart, name)
                    console.log("Removido uma unidade (ou item removido)!")
                    handleInput()
                })
                break
            case "4":
                rl.question("Nome do produto para deletar: ", async (name) => {
                    await cartService.deleteItemFromCart(mycart, name)
                    console.log("Item deletado!")
                    handleInput()
                })
                break
            case "5":
                console.log("Carrinho de compras:", mycart)
                handleInput()
                break
            case "6":
                await cartService.calculateTotalCartValue(mycart)
                handleInput()
                break
            case "sair":
                rl.close()
                break
            default:
                console.log("Opção inválida!")
                handleInput()
        }
    })
}

console.log('Bem-vindo ao carrinho interativo!')
handleInput()