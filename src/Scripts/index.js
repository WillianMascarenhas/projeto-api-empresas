import { getAllCompanies, getBySector, allSectors } from "./requests.js";
// import { } from "./cadastro.js"


function percorrendoAll (arrAllCompanies){
    const ul = document.querySelector(".list__sector--main")
    
    const companie = arrAllCompanies.forEach(element => {
        const cards = criandoCardAllcompanies(element)
        ul.append(cards) 
        
    });
    return companie
}
const allCompanies = await getAllCompanies()
percorrendoAll(allCompanies)

function criandoCardAllcompanies ({name, opening_hours, sectors}) {
    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const span = document.createElement("span")

    li.classList = "card__sector--main"

    h2.innerText = name

    p.innerText = opening_hours+" horas"

    span.innerText = sectors.description

    li.append(h2, p, span)

    return li
}

function dropDonwLoginCadastro (){
    const dropDonw = document.querySelector(".drop__donw--header")

    const header = document.querySelector("header")
    const divButtonHeader = document.createElement("div")
    const spanLogin = document.createElement("span")
    const spanCadastro = document.createElement("span")

    divButtonHeader.classList = "div__buttons--header"


    spanLogin.classList =    "button--header toggle button--login"
    spanCadastro.classList = "button--header button--cadastrar"

    spanLogin.innerText = "Login"
    spanCadastro.innerText= "Cadastrar"

    divButtonHeader.append(spanLogin, spanCadastro)
    
    header.appendChild(divButtonHeader)
    
    
    dropDonw.addEventListener("click", () =>{
        if(dropDonw.innerText == "|||"){
            dropDonw.innerText = "X"
            divButtonHeader.classList.toggle("flex")
        }else{
            dropDonw.innerText ="|||"
            divButtonHeader.classList.toggle("flex")
        }
        
    }) 
}

dropDonwLoginCadastro()

function goToCadastroLogin (){
    const cadastroBtn = document.querySelector(".button--cadastrar")
    cadastroBtn.addEventListener("click", () =>{
        window.location.href = "./src/Pages/cadastro.html"
    })
    
    const loginBtn = document.querySelector(".button--login")
    loginBtn.addEventListener("click", ()=>{
        window.location.href = "./src/Pages/login.html"
    })
}
goToCadastroLogin()

async function criandoUlSectors (){
    const Sectors = await allSectors()
    const divSelectCard = document.querySelector(".select__sector--card")
    const div = document.createElement("div")
    const ulSectors = document.createElement("ul")
    const liAllSectors = document.createElement("li")

    liAllSectors.classList = "all__sectors--list"
    liAllSectors.innerText = "Todos os setores"

    div.classList = "container__sector"

    Sectors.forEach(sector =>{
        const li = crinadoCardUl(sector.description)
        ulSectors.append(li, liAllSectors)
        div.appendChild(ulSectors)
        divSelectCard.appendChild(div)
    })
    
    dropDonwSectors()
    backAllSectors()
}
criandoUlSectors()

function crinadoCardUl(sector){
    const li = document.createElement("li")
    const p = document.createElement("P")
    
    li.classList = "sectors"

    p.innerText = sector
    
    li.append(p)

    filterBySector(li)
    
    return li
}

function dropDonwSectors (){
    const seta = document.querySelector(".arrow__main")
    const div = document.querySelector(".container__sector")


    seta.addEventListener("click", ()=>{
        if(seta.innerText == "-->"){
            seta.innerText = "X"
            div.classList.toggle("flex2")
        }else{
            seta.innerText = "-->"
            div.classList.toggle("flex2")
        }
    })
}

function filterBySector (li){
    const ul = document.querySelector(".list__sector--main")

    li.addEventListener("click", async () =>{

        const filtrados = await getBySector(li.innerText)

        ul.innerHTML =""

        filtrados.forEach(filtrado =>{
            ul.appendChild(criandoCardAllcompanies(filtrado))
        })

    })
}

function backAllSectors(){
    const btnAll = document.querySelector(".all__sectors--list")
    const ul = document.querySelector(".list__sector--main")


    btnAll.addEventListener("click", () =>{
        ul.innerHTML = ""

        percorrendoAll(allCompanies)
    })
}


// description
// : 
// "Podrão de qualidade"
// name
// : 
// "Skina Lanches"
// opening_hours
// : 
// "09:00"
// sectors
// : 
// description
// : 
// "Alimenticio"