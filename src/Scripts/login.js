import { loginUser, getUser, verificandoUser } from "./requests.js";


function dropDownLogin (){
    const dropDown = document.querySelector(".drop__down--header")

    const header = document.querySelector("header")
    const divButtonHeader = document.createElement("div")
    const spanLogin = document.createElement("span")
    const spanHome = document.createElement("span")

    divButtonHeader.classList = "div__buttons--header"


    spanLogin.classList = "button--header toggle button--login"
    spanHome.classList = "button--header button--home"

    spanLogin.innerText = "Cadastro"
    spanHome.innerText= "Home"

    divButtonHeader.append(spanLogin, spanHome)
    
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
dropDownLogin()

function sendToCadastro (){
    const btnCadastro = document.querySelector(".button--login")
    const btnHome = document.querySelector(".button--home")

    btnCadastro.addEventListener("click", () =>{
        window.location.href = "/src/Pages/cadastro.html"
    })

    btnHome.addEventListener("click",() =>{
        window.location.href = "/index.html"
    })
    
}

sendToCadastro()


function fazerLogin (){
    const btnLogar = document.querySelector(".button__login")
    const inputs = document.querySelectorAll("input")

    const userlogin = {}

    btnLogar.addEventListener("click", async (e) =>{
        e.preventDefault()
        inputs.forEach(input =>{
            userlogin[input.id] = input.value
        })
        
        const requests = await loginUser(userlogin)

        localStorage.setItem("@kenzieEmpresas:User", JSON.stringify(requests))
        goToUserAdmPage()
    })
    
}
fazerLogin()

async function goToUserAdmPage (){
const verificacao = await verificandoUser()
console.log(verificacao.is_admin)


    if(verificacao.is_admin == false){
        window.location.href = "/src/Pages/user.html"
    }else if(verificacao.is_admin == true){
        window.location.href = "/src/Pages/adm.html"
    }else{
        alert(getUser().error)
    }
}

function irParaCadastro (){
    const btn = document.querySelector(".button__retornar")

    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        window.location.href = "/src/Pages/cadastro.html"
    })
}
irParaCadastro()
