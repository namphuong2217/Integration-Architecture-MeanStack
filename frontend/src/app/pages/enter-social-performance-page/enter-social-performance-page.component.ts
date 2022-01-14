import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {SocialPerformanceService} from '../../services/social-performance.service';
import { ActivatedRoute} from '@angular/router';
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
  currentSalesman: Salesman;
  currentYear: string;
  salesmen: Salesman[];

  constructor(private userService : UserService, private socialPerformanceService: SocialPerformanceService
    , private salesmanService : SalesmanService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.userService.getOwnUser().subscribe(user => this.user = user);
    this.salesmanService.getSalesmen().subscribe( salesmen => this.salesmen = salesmen);
    this.salesmanService.getSalesman(this.route.snapshot.paramMap.get('sid')).subscribe( salesman => this.currentSalesman = salesman);
  }

  selectYearAndEmployee(data){
    this.currentYear = data.year;
    this.salesmanService.getSalesman(data.sid).subscribe( salesman => this.currentSalesman = salesman);
  }

  createPropsYearSalesman(){
    return{
      user : this.user,
      page : 'socialPerformance',
      selectedSalesman : this.currentSalesman,
      selectedYear : this.currentYear,
      salesmen : this.salesmen
    }
  }

  saveForm(socialPerformanceForm){
    console.log(socialPerformanceForm);
  }




}
