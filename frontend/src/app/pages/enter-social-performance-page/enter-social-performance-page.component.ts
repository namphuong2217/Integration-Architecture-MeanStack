import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {SocialPerformanceService} from '../../services/social-performance.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Salesman} from "../../models/Salesman";

@Component({
  selector: 'app-enter-social-performance-page',
  templateUrl: './enter-social-performance-page.component.html',
  styleUrls: ['./enter-social-performance-page.component.css']
})
export class EnterSocialPerformancePageComponent implements OnInit {

  user: User;
  salesman: Salesman;
  salesmen: Salesman[]
  year: string

  constructor(private userService : UserService, private socialPerformanceService: SocialPerformanceService
    , private salesmanService : SalesmanService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe(user => this.user = user);
    this.salesmanService.getSalesman(this.route.snapshot.paramMap.get('sid')).subscribe(salesman => this.salesman = salesman);
    this.salesmanService.getSalesmen().subscribe(salesmen => this.salesmen = salesmen);
    this.year = this.route.snapshot.paramMap.get('year');
  }




}
