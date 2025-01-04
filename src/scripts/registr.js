import UI from "./utils/utils.js";
import { AuthApi } from "./apis/auth_api.js"; 
import { FileUpload } from "./apis/file_upload_api.js"; 

const api = new AuthApi('https://simple-blog-api-red.vercel.app') ;
const fileUploadApi = new FileUpload('https://simple-blog-api-red.vercel.app')



function createRegisterContainer() {
    const container = UI.createElement('div', { class: 'container w-100 display-flex jc-space-between  fd-column ai-center' }, [
        UI.createElement('header', { class: 'header w-90 h-100px display-flex  ai-center js-flex-end' }, [
            UI.createElement('a', { class: 'header__link td-none transition-5', href: 'home.html' }, 'Home'),
            UI.createElement('a', { class: 'header__link td-none transition-5', href: 'index.html' }, 'Login')
        ]),
        UI.createElement('form', { class: 'formBox__register w-400px h-1000px display-flex  jc-space-around ai-center fd-column relative', id: 'formBox__register' }, [
            UI.createElement('input', { type: 'text', placeholder: 'Last Name', class: 'formBox__register__input lastName w-300px h-40px' }),
            UI.createElement('input', { type: 'text', placeholder: 'First Name ', class: 'formBox__register__input firstName w-300px h-40px' }),
            UI.createElement('input', { type: 'email', placeholder: 'Email', class: 'formBox__register__input input_email w-300px h-40px' }),
            UI.createElement('input', { type: 'text', placeholder: 'UserName', class: 'formBox__register__input userName  w-300px h-40px' }),
            UI.createElement('input', { type: 'password', placeholder: 'password', class: 'formBox__register__input password w-300px h-40px' }),
            UI.createElement('input', { type: 'file', id: 'file-upload', class: 'file-upload'}),
            UI.createElement('button', { type: 'submit', class: 'submit-btn w-100px h-30px ', id: 'submit-btn'}, 'Submit')
        ])
    ]);

    UI.render(container, 'body');
}
createRegisterContainer();



document.getElementById('formBox__register').addEventListener('submit', async (event)=>{
    event.preventDefault();
    const lastName = document.querySelector('.lastName').value ;
    const firstName = document.querySelector('.firstName').value;
    const email =  document.querySelector('.input_email' ).value;
    const username = document.querySelector('.userName').value ;
    const password =document.querySelector('.password').value;
    const image = document.getElementById('file-upload' );

    const fileUploadedFile = await fileUploadApi.upload(image.files[0])


    const file = image.files[0];
    if (file && file.type === 'image/webp') {
        alert('Please upload an image in a different format (e.g., .jpg or .png). .webp format is not supported.');
        return; 
    }

   
    if (!lastName || !firstName || !email || !username || !password || !image.files.length){
        alert('Please fill out all fields  ') ;
        return;
    }

    const user ={
        lastName,
        firstName ,
        email,
        username ,
        password,
        avatar: fileUploadedFile.url
    }
    
  
    api.register(user )
        .then(blogger => {
            console.log(blogger );
            window.location.assign ('home.html')
        })
        .catch(error =>{
            console.error(error) ;
        })

   
    
})











