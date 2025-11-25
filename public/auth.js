//sending data for registration 
function register() {//function to register
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let role = document.querySelector('#role');
    const userData = {
    email:email.value,
    password:password.value,
    permission:role.value

}
fetch('/api/register',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(userData)
}).then(Response => Response.json())
.then(data =>{
    console.log(data); 
    email.value=''
    password.value=''   
}).catch(Error => console.log('error while fetching ' + Error))
}//end to register

function login() {
    let email_input = document.querySelector('#email-input');
    let password_input = document.querySelector('#password-input');
    let remember_me = document.querySelector('#remember-me');
    
}