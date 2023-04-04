function getUser(){
    const user = JSON.parse(localStorage.getItem("@kenzieEmpresas:User")) || ""

    if(user){
        return user
    }

}

async function getAllCompanies () {
    const companies = await fetch("http://localhost:6278/companies", {
        method: "GET",
        "Content-Type": "application/json"
    })
    .then(res => {
        return res.json() 
    })
    .catch(err =>{
        console.log(err+"Cannot GET /companies")
    })
    .then(res => {
        return res
    })
    return companies
}

async function allSectors (){
    const sectors = await fetch("http://localhost:6278/sectors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => res)

    return sectors
}

async function getBySector (setor) {
    const bySctor = await fetch(`http://localhost:6278/companies/${setor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    // .then(res => res.json())
    // .then(res => res)

    const bySectorJson = await bySctor.json()

    return bySectorJson 
}

async function createUser (data) {
    const newUser = await fetch("http://localhost:6278/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res =>{
        res.json()
        if(res.ok == true){
            window.location.href = "/src/Pages/login.html"
        }
        return res
    })

    .then(res => {
            alert("cadastro feito com sucesso")
        return res
    })

    return newUser
}

 


async function loginUser (data){
    const login = await fetch("http://localhost:6278/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(!res.ok){
            // error
        }else{
            // tudo certo
        }

        return res.json()
    })
    .then(res => {
        return res
    })

    return login
}

async function verificandoUser(){
    const user = getUser()

    console.log(user)

    const{token} = user

    
    const userType = await fetch("http://localhost:6278/auth/validate_user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    
    .then(res => {
        return res
    })
    return userType
}


async function informacoesFuncionario (){
    const user = getUser()

        const { token } = user

    const info = await fetch("http://localhost:6278/users/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return res
    })

    return info
}

async function atualizarInfoFFuncinarios(data){
    const user = getUser()
    const { token } = user

    const newInfo = await fetch("http://localhost:6278/users", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const newInfoJson = await newInfo.json()
    
    if(newInfo.ok == false){
        console.log(newInfoJson)
    }else{
        console.log("atulização feita")
    }

    return newInfoJson
}

// async function ADMCadastrarNovaempresa (data){
//     const user = getUser()

//     const { token } = user

//     const NovaEmpresa = await fetch("http://localhost:6278/companies", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(data)
//     })
//     const NovaEmpresaJson = await NovaEmpresa.json()

//     return NovaEmpresaJson
// }


async function ADMCriarDepartamento (data){
    const user = getUser()

    const { token } = user

    const novoDeparatamento = await fetch("http://localhost:6278/departments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const novoDeparatamentoJson = await novoDeparatamento.json()
     
    return novoDeparatamento
}


async function ADMListarTodosDepartamentos(){
    const user = getUser()

    const { token } = user

    const allDepartamentos = await fetch("http://localhost:6278/departments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const allDepartamentosJson = allDepartamentos.json()

    return allDepartamentosJson
}


async function ADMListarDepartamentosEmpresa (id){
    const user = getUser()

    const { token } = user

    const departamentos = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const departamentosJson = await departamentos.json()

    return departamentosJson
}


async function ADMListarUsuariosCadastrados(){
    const user = getUser()

    const { token } = user

    const users = await fetch("http://localhost:6278/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const usersJson = await users.json()

    return usersJson
}

async function ADMEditarUsuarios(id, data){
    const user = getUser()
    const { token } = user

    const newInfo = await fetch("http://localhost:6278/admin/update_user/"+ id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const newInfoJson = await newInfo.json()

    return newInfoJson
}

async function ADMDeleteUser (id){

    const user = getUser()
    const { token } = user

    const deleteUser = await fetch("http://localhost:6278/admin/delete_user/"+ id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const deleteUserJson = await deleteUser.json()

    return deleteUserJson
}

async function ADMDeletarDepartamento (id){
    const user = getUser()
    const { token } = user

    const deleteDep = await fetch("http://localhost:6278/departments/"+ id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const deleteDepJson = deleteDep.json()

    return deleteDepJson
}

async function ADMEditarDepartamento(id, data){
    const user = getUser()
    const { token } = user

    const atualizarDep = await fetch("http://localhost:6278/departments/"+id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const atualizarDepJson = await atualizarDep.json()

    return deleteDepJson
}


async function ADMUserSemDep(){
    const user = getUser()

    const{token} = user

    const users = await fetch("http://localhost:6278/admin/out_of_work", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const usersJson = users.json()

    return usersJson
}

async function ADMContratarUser(data){

    const user = getUser()
    const { token } = user

    const contratar = await fetch("http://localhost:6278/departments/hire/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const contratarJson = contratar.json()

    return contratarJson
}

export {
    getAllCompanies,
    getBySector,
    allSectors,
    createUser,
    loginUser, 
    getUser,
    verificandoUser,
    informacoesFuncionario,
    atualizarInfoFFuncinarios,
    ADMCriarDepartamento,
    ADMListarTodosDepartamentos,
    ADMListarDepartamentosEmpresa,
    ADMListarUsuariosCadastrados,
    ADMEditarUsuarios, 
    ADMDeleteUser,  
    ADMDeletarDepartamento,
    ADMEditarDepartamento,
    ADMUserSemDep,
    ADMContratarUser
}

  