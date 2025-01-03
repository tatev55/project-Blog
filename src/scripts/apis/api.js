import { Storage } from "../utils/Storage.js" ;

export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    buildUrl(path = '') {
        return `${this.baseUrl}${path}`;
    }

    async get(path = '') {
        return await fetch(this.buildUrl(path))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Posts not found: ' + response.statusText);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error in GET request for posts:', error);
                throw error;
            });
    }

    async delete(path = ''){
        const token = Storage.getItem("token") ;

        return await fetch(this.buildUrl(path), {
            method: 'DELETE',
            
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response =>{

            if (!response.ok) {
                throw new Error('Failed to delete: ' + response.statusText);
            }
            if (response.status === 204) {
                return;
            }
        })
        .catch(error => {
            console.error('Error in DELETE request:', error);
            throw error;
        });
    }

    async post(path = '', postData) {
        return await fetch(this.buildUrl(path ), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData) ,
        })

        .then(response => {
            if (!response.ok){
                throw new Error('Failed to create post: ' + response.statusText);
            }
            return response.json() ;
        })
        .catch(error =>{
            console.error('Error:', error);
           
        });
    }

    async update(path = '', updatedPost) {
        const token = Storage.getItem("token");

        return await fetch(this.buildUrl(path ), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` ,
            },
            body: JSON.stringify(updatedPost),
        })
        .then(response =>{
            if (!response.ok) {
                throw new Error( 'Failed to update post: ' + response.statusText) ;
            }

            return response.json();
        })

        .catch(error => {
            console.error('Error:', error);
           
        });
    }
}
