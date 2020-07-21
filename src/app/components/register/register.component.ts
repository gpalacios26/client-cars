import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit{
    public title: String;
    public user: User;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrate';
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
    }

    ngOnInit(){
        console.log('Register component cargado correctamente');
    }

    onSubmit(form){
        this._userService.register(this.user).subscribe(
            response => {
                if(response.status == 'success'){
                    this.status = response.status;
                    // Vaciar el formulario
                    this.user = new User(1, 'ROLE_USER', '', '', '', '');
                    form.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}