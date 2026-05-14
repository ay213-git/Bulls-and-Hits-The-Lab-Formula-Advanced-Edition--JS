function login() {
    const name = document.querySelector(".name").value
    const Password = document.querySelector(".Password").value
    const users=JSON.parse(localStorage.getItem("users"))
    const user=users.find(user=>user.name==name&&user.Password==Password)
    if(!user){
        alert(" יש להרשם ,המשתמש לא קיים")
        document.location.href="register.html"
    }
    else{
    localStorage.setItem("current",JSON.stringify(user))
    document.location.href="games.html"
}
}
