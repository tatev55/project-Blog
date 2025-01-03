export class AuthApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    buildUrl(path = ''){
        return `${this.baseUrl}${path}` ;
    }
    

   async login(credentials){
        return  await fetch(this.buildUrl('/api/auth/login'), {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify(credentials),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to log in: '+ response.statusText);
            }
            return response.json() ;
        })

        .catch(error => {
            console.error( error);
           
        });
    }

   async register(user){
        return  await  fetch(this.buildUrl('/api/auth/register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user) ,
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register: ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error( error);
           
        });
    }
}
