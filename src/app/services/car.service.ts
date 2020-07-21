import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL} from './global';
import { Car } from '../models/car';

@Injectable()
export class CarService{
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    create(token, car: Car):Observable<any>{
        let json = JSON.stringify(car);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url+'cars', params, {headers:headers});
    }

    getCars():Observable<any>{
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'cars', {headers:headers});
    }

    getCar(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'cars/'+id, {headers:headers});
    }

    update(token, car, id):Observable<any>{
        let json = JSON.stringify(car);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url+'cars/'+id, params, {headers:headers});
    }

    delete(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url+'cars/'+id, {headers:headers});
    }
}