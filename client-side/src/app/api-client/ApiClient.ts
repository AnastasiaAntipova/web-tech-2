import axios, { Axios } from "axios";

class ApiClient{
    axios: AxiosInstance

    constructor(){
        this.axios = axios.create({baseURL: "/api"})
    }
    async login(email: string, password: string):Promise<{data:any, error: any}>{
        try{
            const data = await this.axios.post("/users/authorize", {email, password})
            return {data, error: null}
        } catch (e){
            console.error(e);
            return {data: null, error: e}
        }
    }
}

const client = new ApiClient();

export {client as ApiClient}