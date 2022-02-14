import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import { Permissions } from 'src/app/Global';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  user:User;

  /*
    This array holds the definition of the menu's buttons.
   */
  buttons = [
    //{title: 'Welcome', routerLink: ''}, //the tile is the text on the button, the routerLink specifies, where it will navigate
    //{title: 'Example', routerLink: 'example'},
    {title: 'Dashboard', routerLink: 'dashboard'},
  ];

  /**
   * The following parameters specify objects, which will be provided by dependency injection
   * @param authService
   * @param router
   * @param userService
   */
  constructor(private authService: AuthService, private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe(user => {
      this.user = user
      this.addRegistrationButton(user);
    });
  }

  addRegistrationButton(user: User){
    if(Permissions.hasUserPermission(user, "registerAccount")){
      const button = {title: 'Register', routerLink: 'register'};
      this.buttons.push(button)
      console.log(this.buttons);
    }
  }

  /**
   * function which handles clicking the logout button
   */
  handleLogout(){
    this.authService.logout().subscribe();
    this.router.navigate(['login']); //after logout go back to the login-page
  }
}
