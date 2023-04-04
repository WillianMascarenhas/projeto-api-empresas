import {ADMContratarUser ,ADMUserSemDep ,ADMDeletarDepartamento ,ADMCriarDepartamento, getAllCompanies, ADMListarDepartamentosEmpresa, ADMListarTodosDepartamentos,ADMListarUsuariosCadastrados, ADMEditarUsuarios, ADMDeleteUser, ADMEditarDepartamento} from "./requests.js";

function dropDownCadastro (){
    const dropDown = document.querySelector(".drop__down--header")

    const header = document.querySelector("header")
    const divButtonHeader = document.createElement("div")
    const spanLogout = document.createElement("span")

    divButtonHeader.classList = "div__buttons--header"


    spanLogout.classList =    "button--header toggle button--logout"

    spanLogout.innerText = "Logout"

    divButtonHeader.appendChild(spanLogout)
    
    header.appendChild(divButtonHeader)

    dropDown.addEventListener("click", ()=>{
        if(dropDown.innerText == "|||"){
            dropDown.innerText = "X"
            divButtonHeader.classList.toggle("flex")
        }else{
            dropDown.innerText = "|||"
            divButtonHeader.classList.toggle("flex")            
        }
    })
}
dropDownCadastro()

function logoutUser() {
    const btn = document.querySelector(".button--logout")

    btn.addEventListener("click", ()=>{
        localStorage.removeItem("@kenzieEmpresas:User")
        window.location.href = "/index.html"
    })
}
logoutUser() 

function openModal (){
    const btnAbrir = document.querySelectorAll(".open__modal--novaEmpresa")
    const modal = document.querySelector(".container__modal")
    const fristLi = document.querySelector(".frist__li")
    const li = document.createElement("li")
    const ul = document.querySelector(".list__departament")
    li.classList = "sem__empresa"
    const span = document.createElement("span")

    span.innerText = "Empresa não selecionada"

    li.appendChild(span)
    ul.appendChild(li)

    btnAbrir.forEach(btn =>{
        btn.addEventListener("click", () =>{
            if(fristLi.innerText == "Selecionar Empresas"){
                alert("Por favor selecione um empresa antes")

            }else{
                li.remove()
                modal.showModal()
            }
        })
    })
}
openModal()

function closeModal (){
    const closeModal = document.querySelector(".close__modal")
    const modal = document.querySelector(".container__modal")
    
    closeModal.addEventListener("click", ()=>{
        modal.close()
    })
}
closeModal()





async function AbaTodasEmpresas (){
    const   ul = document.querySelector(".container__list--empresas")  
    
    
    const todasEmpresas = await getAllCompanies()

    todasEmpresas.forEach(empresa =>{
        const li = document.createElement("li")
        li.classList = "list__nome--empresas"
        li.innerText = empresa.name
        li.id = empresa.uuid

        ul.append(li)
    })
    selecionarSetoresPeloNome()
}
AbaTodasEmpresas()

function dropDownTodasEmpresas (){
    const btn = document.querySelector(".top__main > img")
    const  ul = document.querySelector(".container__list--empresas")  


    btn.addEventListener("click", ()=>{
        ul.classList.toggle("flex")
    })
}
dropDownTodasEmpresas()



function selecionarSetoresPeloNome () {
    const Empresas = document.querySelectorAll(".list__nome--empresas")
    const fristLi = document.querySelector(".frist__li")
    const  ul = document.querySelector(".container__list--empresas")  
    const ulDepartament = document.querySelector(".list__departament")


    Empresas.forEach(empresa =>{
        empresa.addEventListener("click", () =>{
            const nomeEmpresas = empresa.innerText
            fristLi.innerText = ""
            fristLi.innerText = nomeEmpresas 
            comparandoNomeParaId(empresa.id, nomeEmpresas)
            criarDepartamento(empresa.id,empresa.innerText)
            ulDepartament.innerHTML =""
            
            
            ul.classList.toggle("flex")
        })
    })
    
}


async function comparandoNomeParaId (id, nome){
    const ul = document.querySelector(".list__departament")

    const departeamentoPornome = await ADMListarDepartamentosEmpresa(id)

    departeamentoPornome.forEach(dep =>{
        ul.appendChild(criarCardDepartamento(dep, nome, id))
        visualizarDep(dep)
        editarDep(dep)
    })
    // deleteDep()
    dellDepartamentosList()
}


function criarCardDepartamento ({name, description}, nomeEmpresa, id){
    
    
    const li = document.createElement("li")
    const spanName = document.createElement("span")
    const spanDescription = document.createElement("span")
    const spanNamoEmpresa = document.createElement("span")
    const spanMsgSemEmpresa = document.createElement("span")
    const div = document.createElement("div")
    const imgVer = document.createElement("img")
    const imgEditar = document.createElement("img")
    const imgExcluir = document.createElement("img")
    

    spanName.innerText = name
    spanName.classList = "dep__name"
    spanDescription.innerText =description
    spanDescription.classList = "dep__descri"
    spanNamoEmpresa.innerText = nomeEmpresa || ""
    spanNamoEmpresa.classList = "name__empresa"
    
    li.id = id
    li.classList ="list__departamento"
    div.classList = "container__buttons--departamento"

        
    imgExcluir.src ="../images/delete_FILL0_wght400_GRAD0_opsz48 1.png"
    imgEditar.classList = "btn__editar"
    imgEditar.id = name
    imgExcluir.classList = `btn__excluir`
    imgVer.classList = "btn__ver"
    imgVer.id = name
    imgExcluir.id = id+name
    
    imgEditar.src ="../images/edit_FILL0_wght400_GRAD0_opsz48 (1) 1.png"
    imgVer.src ="../images/Vector (2).png"
    
    div.append(imgEditar, imgExcluir, imgVer)
    li.append(spanName, spanDescription, spanNamoEmpresa, div)

    return li
}



function criarNovaEmpresa (){
    // const novaEmpresaDados = {}
    
    // const inputsModal = document.querySelectorAll(".form__conatiner > input")
    // const btn = document.querySelector(".form__conatiner > button")
    
    // btn.addEventListener("click", async (e)=>{
    //     e.preventDefault()
    //     inputsModal.forEach(inputmodal =>{
    //         novaEmpresaDados[inputmodal.id] = inputmodal.value
    //     })
    //     console.log(novaEmpresaDados)
    //     const request = await ADMCadastrarNovaempresa(novaEmpresaDados)
    // })
}
criarNovaEmpresa()

function criarDepartamento(id){
    const ul = document.querySelector(".list__departament")
    const inputID = document.querySelector(".input__uuid")

    inputID.value = id
    
    const novoDepartamento = {}
    
    const inputsModal = document.querySelectorAll(".form__conatiner > input")
    const inputName = document.querySelector(".form__conatiner > input")
    const btn = document.querySelector(".form__conatiner > button")
    
    btn.addEventListener("click", async (e)=>{
        inputsModal.forEach(inputmodal =>{
            novoDepartamento[inputmodal.id] = inputmodal.value
        })
        
        const newCard = criarCardDepartamento(await ADMCriarDepartamento(novoDepartamento))
        addCard(novoDepartamento)
        ul.appendChild(newCard)
        
    })
}

async function addCard (obj){

}


async function listarUsers (){
    const ul = document.querySelector(".list__users--cadastrados")

    const todosUsers = await ADMListarUsuariosCadastrados()

    todosUsers.forEach(user =>{
        const card = criarCardUser(user)
        ul.appendChild(card)
    })
    openModalDelete()

    openModalDadosUser()
    removerAdm()
}
listarUsers()

function removerAdm(){
    const li = document.querySelector(".list__user--cadastrados")
    li.remove()
}

function criarCardUser ({username, professional_level, uuid, department_uuid, kind_of_work}){

    const li = document.createElement("li")
    const h3 = document.createElement("h3")
    const span1 = document.createElement("span")
    const span2 = document.createElement("span")
    const span3 = document.createElement("span")
    const caneta = document.createElement("img")
    const lixo = document.createElement("img")
    const div = document.createElement("div")
    const divImg = document.createElement("div")


    h3.innerText = username
    span1.innerText = professional_level

    if(department_uuid !== null){
        span2.innerText = ""
    }else{
        // span2.innerText =
        span2.innerText ="fazer ainda"
    }

    span3.innerText = kind_of_work

    li.id = uuid
    li.classList = "list__user--cadastrados"

    caneta.src ="../images/Vector.png"
    caneta.alt ="botão para edição do user"
    caneta.classList = "btn__editar"
    caneta.id = uuid

    lixo.src = "../images/delete_FILL0_wght400_GRAD0_opsz48 1.png"
    lixo.alt ="botão para remover funcinario"
    lixo.classList ="btn__delete"
    lixo.id = uuid

    div.classList = "container__info--user"
    divImg.classList = "container__img"

    divImg.append(caneta, lixo)
    div.append(span1, span2, span3)
    li.append(h3, div,divImg)

    
    return li
}


function openModalDadosUser (){
    const btns = document.querySelectorAll(".btn__editar")  
    const modal = document.querySelector(".container__modal-2")
    
    btns.forEach(btn =>{
        btn.addEventListener("click", () =>{
            modal.showModal() 
            atualizandoUser(btn.id)
            closeModalDadosUser()
        })
    })
}

async function atualizandoUser (id){
    const selectTipo = document.querySelector(".select__tipo")
    const selectNivel = document.querySelector(".select__nivel")
    const btn = document.querySelector(".button__atualizar--user")
    const modal = document.querySelector(".container__modal-2")


    const info = {}
    
    btn.addEventListener("click", async (e) =>{

        if(selectTipo.value !== "" && selectNivel.value !== ""){
            info[selectTipo.name] = selectTipo.value 
            info[selectNivel.name] = selectNivel.value 

            modal.close()

            await ADMEditarUsuarios(id, info)
        }else{
            alert("preencha os campos")
        }
    })
}

function closeModalDadosUser(){
    const btn = document.querySelector(".btn__close--modal")
    const modal = document.querySelector(".container__modal-2")

    btn.addEventListener("click", ()=>{
        modal.close()
    })
}



async function deletarUser(id){
    const modal = document.querySelector(".container__modal-3")

   const btnDelete = document.querySelector(".btn__delete--yes")
   const lis = document.querySelectorAll(".list__users--cadastrados > li")


        btnDelete.addEventListener("click", () =>{
            console.log(btnDelete.id)
            ADMDeleteUser(id)
            lis.forEach(li =>{
                if(li.id == id){
                    li.remove()
                    modal.close()
                }
            })
        })

}



function openModalDelete(){
    const btnsDelete = document.querySelectorAll(".btn__delete")
    const modal = document.querySelector(".container__modal-3")

    btnsDelete.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            modal.showModal()
            deletarUser(btn.id)
        })
    })
    closeModalDelet()
}

function closeModalDelet (){
    const modal = document.querySelector(".container__modal-3")
    const btnsCloseModal = document.querySelectorAll(".btn__close--modal")

    btnsCloseModal.forEach(btn =>{
        btn.addEventListener("click", () =>{
            modal.close()
        })
    })
}

// function deleteDep(){
//     const btnsDellDep = document.querySelectorAll(".btn__excluir")
//     // const spans = document.querySelectorAll(".list__departamento > span")
//     const lis = document.querySelectorAll(".list__departamento")
    
//     btnsDellDep.forEach(btn =>{
//         btn.addEventListener("click", () =>{
//             dellDep(btn.id)
//             lis.forEach(li =>{
//                 li.addEventListener("click", ()=>{
//                     li.remove()
//                 })
//             })
//         })
//     })
// }
// deleteDep()

// async function dellDep(id){
//     console.log(id)
//     // await ADMDeletarDepartamento(id)
// }

async function dellDepartamentosList (){
    const btns = document.querySelectorAll(".btn__excluir")
    const span = document.querySelector(".list__departamento > span")
    const lis = document.querySelectorAll(".list__departamento")


    const deps = await ADMListarTodosDepartamentos()

    btns.forEach(btn =>{
        btn.addEventListener("click",  ()=>{
            deps.forEach(dep =>{
                if(span.innerText == dep.name){
                    dellPegarId(dep.uuid)
                }
            })
            lis.forEach(li =>{
                li.addEventListener("click", () =>{
                    li.remove()
                })
            })
        })
    })
    
}
dellDepartamentosList()

async function dellPegarId(id){
    await ADMDeletarDepartamento(id)
}

function visualizarDep(obj){
    console.log(obj)
    const btnsEdit = document.querySelectorAll(".btn__editar")
    const btns = document.querySelectorAll(".btn__ver")
    const modal = document.querySelector(".container__modal-4")
    const nameCard = document.querySelector(".name__modal")
    const desCard = document.querySelector(".descrição__modal")
    const empresaCard = document.querySelector(".empresa__modal")
    btnsEdit.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            if(btn.id == obj.name){
                btn.classList = obj.uuid
            }
        })
    })
    btns.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            modal.showModal()
            if(btn.id == obj.name){
                nameCard.innerText = "Departamento: " +obj.name
                desCard.innerText = "Descrição: " +obj.description
                empresaCard.innerText = "Empresa: " +obj.companies.name
            }
        })
    })
    funcinariosLivres(obj)
}

async function funcinariosLivres(obj){
    const select = document.querySelector(".user_sem--dep")
    const users = await ADMUserSemDep()
    

    users.forEach(user =>{
        select.appendChild(criarSelect(user))
    })
    
}

function criarSelect(user){

    const options = document.createElement("option")

    options.classList = "op__contratar"
    
    options.value = user.uuid
    options.innerText = user.username

    return options


}

function editarDep(dep){
    const btns = document.querySelectorAll(".btn__editar")
    const modal = document.querySelector(".container__modal-")
    const span = document.querySelector(".dep__name")

            btns.forEach(btn =>{
                btn.addEventListener("click", ()=>{
                    modal.showModal()
                        dadoseDditarDep(btn.classList.value)
        })

    })
}


 function dadoseDditarDep(uuid){
    const input = document.querySelector(".container__modal-5 > input")
    const btn = document.querySelector(".container__modal-5 > button")
    const novaDes = {}

    btn.addEventListener("click", async (e) =>{
        novaDes[input.id]=input.value
        console.log(novaDes)
        await ADMEditarDepartamento(uuid, novaDes)
    })

}
