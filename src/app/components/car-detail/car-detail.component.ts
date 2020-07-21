import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
    selector: 'app-car-detail',
    templateUrl: './car-detail.component.html',
    styleUrls: ['./car-detail.component.css'],
    providers: [UserService, CarService]
})
export class CarDetailComponent implements OnInit {
    public page_title: String;
    public car: Car;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _carService: CarService
    ){
        this.page_title = 'Detalle del Coche';
    }

    ngOnInit(){
        this.getCar();
    }

    getCar(){
        this._route.params.subscribe(params => {
            let id = +params['id'];
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
        });
    }
}
