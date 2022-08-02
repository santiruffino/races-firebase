import { Component, OnInit } from '@angular/core';
import { Race } from "../../interfaces/race";
import { CrudService } from "../../services/crud.service";
import { AuthService } from "../../services/auth.service";
import { Login } from "../../interfaces/login";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allRaces: Race[] = [];
  hideWhenNoRace: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  userData: Login = {uid: '', email: '', emailVerified: false, displayName: '', photoURL: ''};
  localstorageJSON = JSON.parse(localStorage.getItem('user') || '{}');
  loading: boolean = true;
  allRacesByYear: any;
  panelOpenState = false;
  allComplete: boolean = true;

  constructor(
    public crudApi: CrudService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userData = this.authService.userData;
    this.dataState();
    let s = this.crudApi.getRacesList();
    s.snapshotChanges().subscribe(data => {
      this.allRaces = [];
      data.forEach(item => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        // a['color'] = this.setRaceColor(a);
        this.allRaces.push(a as Race);
      })
      this.groupRacesByYear();
      this.orderRaces();
    })
  };

  dataState() {
    this.crudApi.getRacesList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoRace = false;
        this.noData = true;
      } else {
        this.hideWhenNoRace = true;
        this.noData = false;

      }
    })
  };

  groupRacesByYear() {
    const groups = this.allRaces.reduce((groups: any, race) => {
      const date = new Date(race.date).getFullYear()
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(race);
      return groups;
    }, {});

// Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        races: groups[date]
      };
    });
    groupArrays.sort((a: any, b: any) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
    this.allRacesByYear = groupArrays;
  };

  orderRaces() {
    this.allRacesByYear.forEach((a: any) => {
      a.races.sort((a: any, b: any) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
    });
  }


}
