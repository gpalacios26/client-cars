import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    register(user):Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'register', params, {headers:headers});
    }

    signup(user, getToken=null):Observable<any>{
        if(getToken!=null){
            user.getToken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'login', params, {headers:headers});
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }
}