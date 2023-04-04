import { createUser } from "./requests.js";

function cadastroForm (){
    const inputs = document.querySelectorAll(".container__form > input")
    const select = document.querySelector(".container__form > select")
    const btnCadastrar = document.querySelector(".button__cadastrar")
    const btnRetornar = document.querySelector(".button__retornar")

    const newUser = {}

    btnCadastrar.addEventListener("click", async (e) =>{
        inputs.forEach(input =>{
            e.preventDefault()
            newUser[input.id] = input.value
        })
        newUser[select.name] = select.value
        const request = await createUser(newUser)
    })

    btnRetornar.addEventListener("click", (e) =>{
        window.location.href = "/index.html"
    })
    
}
cadastroForm()

function dropDownCadastro (){
    const dropDown = document.querySelector(".drop__down--header")

    const header = document.querySelector("header")
    const divButtonHeader = document.createElement("div")
    const spanLogin = document.createElement("span")
    const spanHome = document.createElement("span")

    divButtonHeader.classList = "div__buttons--header"


    spanLogin.classList =    "button--header toggle button--login"
    spanHome.classList = "button--header button--home"

    spanLogin.innerText = "Login"
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
dropDownCadastro()

function btnsHeader (){
    const btnLogin = document.querySelector(".button--login")
    const btnHome = document.querySelector(".button--home")
    

    btnLogin.addEventListener("click", () =>{
        window.location.href = "/src/Pages/login.html"
    }) 

    btnHome.addEventListener("click", () =>{
        window.location.href = "/index.html"
    })
}
btnsHeader()

