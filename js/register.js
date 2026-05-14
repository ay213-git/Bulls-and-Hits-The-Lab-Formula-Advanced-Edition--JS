const registerButton = document.querySelector(".log_in")
registerButton.addEventListener("click", () => {
    
    const name = document.querySelector(".name").value
    const Password = document.querySelector(".Password").value
    const email = document.querySelector(".email").value
    const phone = document.querySelector(".phone").value
    const id = document.querySelector(".id").value

    if(!name||!Password||!id){
        alert("מלא שדות חובה")
        return
    }

    const user = {
        name,
        Password,
        email,
        phone,
        id, 
        wins: 0,
        fails: 0
    }
    const players = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
    players.push(user)
    localStorage.setItem("users",JSON.stringify(players))
    document.location.href="login.html"
})