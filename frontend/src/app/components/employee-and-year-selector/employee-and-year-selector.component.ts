import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Permissions, years} from "../../Global";
import {Salesman} from "../../models/Salesman";
import {User} from "../../models/User";

@Component({
  selector: 'app-year-selector',
  templateUrl: './employee-and-year-selector.component.html',
  styleUrls: ['./employee-and-year-selector.component.css']
})
export class EmployeeAndYearSelectorComponent {
  years: string[] = years;

  @Input() props : {user : User,
                    page : string,
                    selectedSalesman : Salesman,
                    selectedYear : string,
                    salesmen: Salesman[]};

  @Output() selectedEvent = new EventEmitter<{ sid: string, year: string }>();

  selectYearOrEmployee(sid:string, year:string){
    this.selectedEvent.emit({sid,year});
  }

  permissionToChooseSid() : boolean{
    if(this.props.page == 'bonusCompCollection'){
      if(! Permissions.hasUserPermission(this.props.user, 'allBonusCalc')){
        console.log()
        if(this.props.user.username != this.props.selectedSalesman.sid){ //make sure that redirected
          this.selectYearOrEmployee(this.props.user.username, years[0]);
          return false;
        }
        else return false;
      }
      return true;
    }
    else if(this.props.page == 'socialPerformance'){
      return true
    }
    return false;
  }

}
