import { Storage } from '../utils/Storage.js';  

export class FileUpload {
    constructor(baseUrl) {
        this.baseUrl = baseUrl ;
    };

    async upload(file){
        const formData =  new FormData();
        formData.append('file', file);

        const token = Storage.getItem('token') ;  

       
        return await  fetch(`${this.baseUrl}/api/file-upload/upload`,{
            method: 'POST',

            body: formData ,
            headers:{
                Authorization: `Bearer ${token}`,  
            },
        })

        .then(response =>{
            if (!response.ok) {
                throw new Error('Failed to upload file: ' + response.statusText);  
            }
            return response.json();  
        })

        .catch(error => {
            console.error( error);  
           
        });
    }

}
