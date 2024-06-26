const prompt = require('prompt-sync')()

//Formatar número como moeda BRL
function MoedaBRL(numero) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero)
}

//Armazenar funcionários
let funcionarios = []

//Adicionar funcionário
function adicionarFuncionario() {
    console.log("\nAdicionar Funcionário (ou -1 para sair):")

    let continuar = true
    while (continuar) {
        const nome = prompt("Nome: ")
        if (nome == '-1') return

        const cargo = prompt("Cargo: ")
        if (cargo == '-1') return

        const salarioEntrada = prompt("Salário (Adicione . apenas para separar os centavos): ")
        if (salarioEntrada == '-1') return
        const salario = parseFloat(salarioEntrada)

        if (!nome || !cargo || isNaN(salario) || salario <= 0) {
            console.log("Valor inválido.")
            continue
        }

        const funcionario = {
            nome: nome,
            cargo: cargo,
            salario: salario
        }

        funcionarios.push(funcionario)
        console.log("Funcionário adicionado com sucesso!")

        let opcao = prompt("Deseja adicionar outro funcionário? (s/n): ")
        while (opcao !== 's' && opcao !== 'n') {
            opcao = prompt("Opção inválida. Deseja adicionar outro funcionário? (s/n): ")
        }
        continuar = opcao == 's'
    }
}

//Atualizar funcionário
function atualizarFuncionario() {
    console.log("\nAtualizar Funcionário (ou -1 para sair):")

    listarFuncionarios()

    let continuar = true
    while (continuar) {
        const entrada = prompt("Selecione o número do funcionário para ser atualizado: ")
        if (entrada == '-1') return
        
        const indice = parseInt(entrada)
        if (isNaN(indice) || indice < 0 || indice >= funcionarios.length) {
            console.log("Valor inválido.")
            continue
        }

        let nome = prompt("Novo Nome: ")
        if (nome == '-1') return
        nome = nome || funcionarios[indice].nome

        let cargo = prompt("Novo Cargo: ")
        if (cargo == '-1') return
        cargo = cargo || funcionarios[indice].cargo

        let salarioEntrada = prompt("Novo Salário (Adicione . apenas para separar os centavos): ")
        if (salarioEntrada == '-1') return
        const salario = salarioEntrada ? parseFloat(salarioEntrada) : funcionarios[indice].salario

        if (!nome || !cargo || isNaN(salario) || salario <= 0) {
            console.log("Valor inválido.")
            continue
        }

        funcionarios[indice].nome = nome
        funcionarios[indice].cargo = cargo
        funcionarios[indice].salario = salario

        console.log("Funcionário atualizado com sucesso!")

        let opcao = prompt("Deseja atualizar outro funcionário? (s/n): ")
        while (opcao !== 's' && opcao !== 'n') {
            opcao = prompt("Opção inválida. Deseja atualizar outro funcionário? (s/n): ")
        }
        continuar = opcao == 's'
    }
}

//Excluir funcionário
function excluirFuncionario() {
    console.log("\nExcluir Funcionário (ou -1 para sair):")

    listarFuncionarios()

    const entrada = prompt("Selecione o número do funcionário para ser excluído: ")
    if (entrada == '-1') return
        
    const indice = parseInt(entrada)
    if (isNaN(indice) || indice < 0 || indice >= funcionarios.length) {
        console.log("Valor inválido.")
        return
    }

    const novoArray = []
    for (let i = 0; i < funcionarios.length; i++) {
        if (i !== indice) {
            novoArray.push(funcionarios[i])
        }
    }
    funcionarios = novoArray

    console.log("Funcionário excluído com sucesso!")
}

//Listar funcionários
function listarFuncionarios() {
    console.log("\nLista de Funcionários:")
    if (funcionarios.length == 0) {
        console.log("Nenhum funcionário cadastrado.")
    } else {
        for (let i = 0; i < funcionarios.length; i++) {
            const salarioFormatado = MoedaBRL(funcionarios[i].salario)
            console.log(`${i}. Nome: ${funcionarios[i].nome}, Cargo: ${funcionarios[i].cargo}, Salário: ${salarioFormatado}`)
        }
    }
}

//Custo total
function calcularCustoTotal() {
    console.log("\nCusto Total de Salários:")
    if (funcionarios.length == 0) {
        console.log("Nenhum funcionário cadastrado.")
    } else {
        let custoTotal = 0
        for (let i = 0; i < funcionarios.length; i++) {
            custoTotal += funcionarios[i].salario
        }
        const custoTotalFormatado = MoedaBRL(custoTotal)

        //Média salarial
        const mediaSalarial = custoTotal / funcionarios.length
        const mediaSalarialFormatada = MoedaBRL(mediaSalarial)

        console.log(`O custo total de salários é ${custoTotalFormatado}`)
        console.log(`A média salarial é ${mediaSalarialFormatada} por funcionário.`)
    }
}

//Loop do sistema
let menu = true
while (menu) {
    console.log("\nMenu:")
    console.log("1. Adicionar Funcionário")
    console.log("2. Listar Funcionários")
    console.log("3. Atualizar Funcionário")
    console.log("4. Excluir Funcionário")
    console.log("5. Calcular Custo Total de Salários")
    console.log("6. Sair do Sistema")

    const opcao = prompt("Escolha uma opção: ")

    if (opcao == '1') {
        adicionarFuncionario()
    } else if (opcao == '2') {
        listarFuncionarios()
    } else if (opcao == '3') {
        atualizarFuncionario()
    } else if (opcao == '4') {
        excluirFuncionario()
    } else if (opcao == '5') {
        calcularCustoTotal()
    } else if (opcao == '6') {
        console.log("\nSaindo do sistema...")
        menu = false
    } else {
        console.log("\nOpção inválida.")
    }
}
