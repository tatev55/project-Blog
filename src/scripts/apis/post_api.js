import { Api } from "./api.js";
import { Storage } from '../utils/Storage.js'; 

export class PostsApi extends Api{
    constructor(baseUrl) {
        super(baseUrl);
        this.baseUrl = baseUrl ;
    }

    
    _getPostById(postId){
        const token =  Storage.getItem("token");

       
        if (!token) {
            throw new Error('Token is required for authentication');
        }

        return fetch(this.buildUrl(`/api/posts/${postId}`),{
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to get post: ' + response.statusText);
            }

            return response.json(); 
        })
        .catch(error => {
            console.error( error);
           
        });
    }

    getPostById(postId){
        return this._getPostById(postId);
    }


    getPosts(){
        return this.get('/api/posts') ;
    }

    _createPost(postData){
        const token = Storage.getItem("token") ;

        if(!token){
            throw new Error('Token is required for authentication');
        }
        return fetch(this.buildUrl('/api/posts'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },


            body: JSON.stringify(postData),
        })
        .then(response =>{
            if (!response.ok) {
                throw new Error('Failed to create post: ' + response.statusText);
            }
            

            return response.json(); 
        })
        .catch(error => {
            console.log( error);
            
        });
    }

    createPost(postData) {
      
        return this._createPost(postData) ;
    }

    updatePost(postId, updatedPostData) {
        return this.update(`/api/posts/${postId}`, updatedPostData) ;
    }

    deletePost(postId) {
        return this.delete(`/api/posts/${postId}`);
    }
}








