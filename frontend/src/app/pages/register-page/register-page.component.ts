import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/Global';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
  }

  permissionToRegister(){
    return Permissions.hasUserPermission(this.user, "registerAccount");
  }

}
