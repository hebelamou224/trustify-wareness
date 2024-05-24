import { Injectable } from "@angular/core";

@Injectable()
export class LoginService{
    name: string = ''
    isLogin: boolean = false;

    public setName(name: string){
        this.name = name;
    }
}