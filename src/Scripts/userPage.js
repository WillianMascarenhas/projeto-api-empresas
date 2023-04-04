import { informacoesFuncionario, atualizarInfoFFuncinarios } from "./requests.js";

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

function showModal (){
    const btn = document.querySelector(".top__main > img")
    const modal = document.querySelector(".container__modal")
    
    btn.addEventListener("click", ()=>{
        modal.showModal()
    })
    
}
showModal()

function closeTheModal (){
    const btn = document.querySelector(".close__modal")
    const modal = document.querySelector(".container__modal")

    btn.addEventListener("click", ()=>{
        modal.close()
    })
}
closeTheModal()

async function userDados(){
    const info = await informacoesFuncionario()

    const {email, professional_level, username, kind_of_work} = info

    const name = document.querySelector(".container__top > h2")
    const mail = document.querySelector(".user__email")
    const cargo = document.querySelector(".user__cargo")
    const type = document.querySelector(".user__type")

    name.innerText = username
    mail.innerText = `Email: ${email}`
    cargo.innerText = professional_level
    if(kind_of_work = null){
        type.innerText = ""
    }else{
        type.innerText = kind_of_work
    }

    }
userDados()

function atualizandoDados () {

    const obj = {}

    const inputs = document.querySelectorAll(".form__conatiner > input")
    const btn = document.querySelector(".form__conatiner > button")

    btn.addEventListener("click", async (e) =>{
        e.preventDefault()
        inputs.forEach(input =>{
            obj[input.id] = input.value

        })
        await atualizarInfoFFuncinarios(obj)
    })

    
}
atualizandoDados()