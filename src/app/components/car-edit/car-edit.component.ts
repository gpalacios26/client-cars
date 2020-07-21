import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
    selector: 'app-car-edit',
    templateUrl: './car-edit.component.html',
    styleUrls: ['./car-edit.component.css'],
    providers: [UserService, CarService]
})
export class CarEditComponent implements OnInit {
    public page_title: String;
    public token;
    public identity;
    public car: Car;
    public status_car: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ){
        this.page_title = 'Edición del Coche';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(){
        this._route.params.subscribe(params => {
            let id = +params['id'];
            this.getCar(id);
        });
    }

    getCar(id){
        this._carService.getCar(id).subscribe(
            response => {
                if(response.status == 'success'){
                    this.car = response.car;
                } else {
                    this._router.navigate(['home']);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    onSubmit(form){
        this._carService.update(this.token, this.car, this.car.id).subscribe(
            response => {
                if(response.status == 'success'){
                    this.status_car = response.status;
                    // Vaciar el formulario
                    this.car = new Car(1, '', '', null, 'true', null, null);
                    form.reset();
                    // Redireccionar a otro componente
                    this._router.navigate(['home']);
                } else {
                    this.status_car = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
