import UI from "./utils/utils.js";
import {Storage} from "./utils/Storage.js";
// import {Api} from "./utils/api.js";
//////////////
import { AuthApi } from "./apis/auth_api.js";
//////////

const api = new AuthApi('https://simple-blog-api-red.vercel.app');

function createContainer(){
    const container = UI.createElement('div', {class : 'container w-100 display-flex jc-space-between fd-column ai-center'}, [
        UI.createElement('header', {class: 'header w-90 h-100px display-flex ai-center js-flex-end'},[
            UI.createElement('a', {href : 'home.html', class: 'header__link td-none transition-5'}, 'Home'),
        ]),
    
        UI.createElement('form', { class: 'form__box w-300px h-300px display-flex fd-column ai-center' }, [
            UI.createElement('input', { type: 'email', placeholder: 'Enter your email', class: 'form__box__email w-200px h-40px' }),
            UI.createElement('input', { type: 'password', placeholder: 'Password', class: 'form__box__password w-200px h-40px ' }),
            UI.createElement('button', { type: 'submit', class: 'form__box__login w-100px h-40px transition-5' }, 'Login')
        ])
        
    ]);


    UI.render(container, 'body');
}
createContainer();





async function handleLogin(event) {
    event.preventDefault(); 
    const inputEmail = document.querySelector(".form__box__email");
    const inputPass = document.querySelector(".form__box__password");
    const email = inputEmail.value.trim();
    const password = inputPass.value.trim();

    const credentials = {
        email, 
        password
      }

    inputEmail.style.borderColor = '';
    inputPass.style.borderColor = '';

    let errorMessage = '';

    if (!email) {
        inputEmail.style.borderColor = 'red';
        errorMessage += 'Please enter a valid username.\n';
    }

    

    if (!password || password.length <= 5) {
        inputPass.style.borderColor = 'red'; 
        errorMessage += 'Your password must be at least 8 characters long.\n';
    }



    if (errorMessage) {
        alert(errorMessage);
    } else {

        const result = await api.login(credentials);

        if (result.accessToken && result.user) {
          Storage.setItem('token', result.accessToken);
          Storage.setItem('user', result.user);
          window.location.assign("home.html");  
        } else {
          alert('Something Wrong')
        }
        
       
    }
}

document.querySelector('.form__box__login').addEventListener('click', handleLogin);




/////////////////////////


// gpt

 // api.login(credentials)
        // .then(data => {
        //     if (data.token) {
                
        //         Storage.setItem('userData', JSON.stringify(credentials));
        //         console.log('userData', JSON.stringify(credentials));
        //         window.location.href = 'home.html';
        //     }
        // })
        // .catch(error => {
        //     console.error('Login failed', error);
        // });


// const api = new Api('https://simple-blog-api-red.vercel.app')
        // .post('/api/auth/login')
        // .then(data => {
        //     if(data.token){
        //         const userData = {
        //             email: inputEmailValue,
        //             password: inputPassValue,
        //             token: data.token  
        //         };

        //         Storage.setItem('userData', JSON.stringify(userData));
        //         console.log('userData', JSON.stringify(userData));

        //         window.location.href = 'home.html';
        //     }
            
        // })
        // .catch(error  =>{
        //     console.log('Error')
            
        // })
        /////////////////


        //lara123 
    //lara@gmail.com


    //anna@gmail.com - anna321
