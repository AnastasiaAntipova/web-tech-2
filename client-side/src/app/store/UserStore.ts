import {makeAutoObservable} from "mobx";

export class UserStore{
    userToken: string

    constructor(){
        this.userToken = "";
        makeAutoObservable(this);
    }

    setUserToken(token: string){
        this.userToken = token;
    }

    resetToken(){
        this.userToken = "";
    }

}