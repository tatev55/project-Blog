import UI from "./utils/utils.js";
import { PostsApi } from "./apis/post_api.js";
import { FileUpload } from "./apis/file_upload_api.js";
import { Storage } from "./utils/Storage.js";
import { baseURL } from "./apis/constant.js";


const postsApi = new PostsApi(baseURL);
const fileUploadApi = new FileUpload(baseURL);

function createBlogPostContainer() {
    const blogPostContainer = UI.createElement('div', { class: 'container__newBlogPost h-600px display-flex jc-space-between fd-column ai-center' }, [
        UI.createElement('header', { class: 'header w-90 h-100px display-flex ai-center js-flex-end' }, [
            UI.createElement('a', { class: 'header__link td-none transition-5', href: 'home.html' }, 'Home')
        ]),
        UI.createElement('form', { class: 'form__box w-400px h-800px display-flex fd-column jc-space-between ai-center', id: 'createPostForm' }, [
            UI.createElement('h2', { class: 'title__newBlogPost' }, 'New Blog Post'),
            UI.createElement('input', { class: 'input__title__newBlogPost w-200px h-40px', placeholder: 'Title', type: 'text' }),
            UI.createElement('textarea', { class: 'textarea__newBlogPost w-200px h-200px ta-center', placeholder: 'Post Story' }),
            UI.createElement('div', {class: 'file__upload__box display-flex fd-column jc-space-between ai-center '}, [
                UI.createElement('input', { type: 'file', class: 'input-url w-200px', id: 'file-upload' })
            ]),
            UI.createElement('input', { class: 'input input-authorName w-200px', placeholder: 'Author Name' }),
            UI.createElement('button', { type: 'submit', class: 'submit-btn submit-createNewPost w-100px h-30px', id: 'createNewPost' }, 'Create Blog')
        ])
    ]);

    UI.render(blogPostContainer, 'body');
}

createBlogPostContainer();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');
const user = Storage.getItem('user');
const token = Storage.getItem('token');

if (!user || !token) {
    window.location.href = 'index.html';
}



async function  handleFileUpload(fileInput) {
    const file = fileInput.files[0];
    if (file && file.type === 'image/webp'){
        alert('Please upload an image in a different format (e.g., .jpg or .png). .webp format is not supported.');
        return null;
    }

    if (file){
        try{
            const uploadedFile =  await fileUploadApi.upload(file);
            return uploadedFile.url;
        } catch(error){
            console.error('error', error) ;
            return null;
            }
    }
    return null;
}

if (postId){
    postsApi.getPostById(postId).then(postData =>  {
        if (postData){
            document.querySelector('.input__title__newBlogPost').value = postData.title;
            document.querySelector('.textarea__newBlogPost').value =  postData.story ;
            document.querySelector('.input-authorName').value =  postData.authorName;
            document.querySelector('.submit-btn').textContent = 'Update Blog';


            const fileUploadBox = document.querySelector('.file__upload__box');
            if(postData.img){
                const img = UI.createElement('img', {src: postData.img, class: 'imgUpdatePost'}, );
                fileUploadBox.appendChild(img);
            }

            const form = document.getElementById('createPostForm') ;
            form.addEventListener('submit', async function (event){
                event.preventDefault();

                const title = document.querySelector('.input__title__newBlogPost').value;
                const story = document.querySelector('.textarea__newBlogPost').value;
                const authorName = document.querySelector('.input-authorName').value;

                const imgInput = document.getElementById('file-upload') ;
                let imgUrl =  postData.img; 

                const newImgUrl =  await handleFileUpload(imgInput);
                if (newImgUrl){
                    imgUrl = newImgUrl ; 
                }

                const updatedPostData ={
                    title,
                    story,
                    img: imgUrl,
                    authorName
                };

                postsApi.updatePost(postId, updatedPostData)
                .then((res) => {
                    clearForm();

                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 1000);
                })
                .catch(error => {
                    console.error(error);
                });
            });
        }
    });
} else{
    const form = document.getElementById('createPostForm');
    form.addEventListener('submit', async function (event) {
        event.preventDefault() ;

        const title =  document.querySelector('.input__title__newBlogPost').value;
        const story = document.querySelector('.textarea__newBlogPost').value  ;
        const authorName = document.querySelector('.input-authorName').value || `${user.firstName} ${user.lastName}`;
        const imgInput = document.getElementById('file-upload');
        let imgUrl = '';

        const newImgUrl = await handleFileUpload(imgInput);
        if (newImgUrl){
            imgUrl =  newImgUrl ; 
        }

        const postData = {
            title,
            story,
            authorName ,
            img: imgUrl
        };

        postsApi.createPost(postData)
        .then(post => {
                window.location.assign('home.html');
    
        })
        .catch(error =>{
            console.error('Error creating post:', error);
        });
    });
}

function clearForm() {
    document.querySelector('.input__title__newBlogPost').value = '';
    document.querySelector('.textarea__newBlogPost').value =  '';
    document.querySelector('.input-url').value = '';
    document.querySelector('.input-authorName').value = '' ;
    document.querySelector('.submit-btn').textContent =  'Create Blog';
}
