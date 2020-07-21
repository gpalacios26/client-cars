import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title: String;
    public user: User;
    public status: string;
    public token;
    public identity;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
    }

    ngOnInit(){
        this.logout();
    }

    onSubmit(form){
        // Obtener el token
        this._userService.signup(this.user).subscribe(
            response => {
                if(response.status != 'error'){
                    this.status = 'success';
                    this.token = response;
                    localStorage.setItem('token',this.token);
                    // Obtener los datos del usuario identificado
                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            this.identity = response;
                            localStorage.setItem('identity',JSON.stringify(this.identity));
    
                            // Redireccionar a otro componente
                            this._router.navigate(['home']);
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    logout(){
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            
            if(logout == 1){
                // Borrar la sesión del storage
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this.identity = null;
                this.token = null;

                // Redireccionar a otro componente
                this._router.navigate(['home']);
            }
        });
    }
}