import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Car } from '../../models/car';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';

@Component({
    selector: 'app-car-new',
    templateUrl: './car-new.component.html',
    styleUrls: ['./car-new.component.css'],
    providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
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
        this.page_title = 'Crear Nuevo Coche';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(){
        // Validar que este autenticado
        if(this.identity == null){
            // Redireccionar a otro componente
            this._router.navigate(['login']);
        } else {
            // Crear objeto coche
            this.car = new Car(1, '', '', null, 'true', null, null);
        }
    }

    onSubmit(form){
        this._carService.create(this.token, this.car).subscribe(
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
