import { Component, OnInit } from '@angular/core';
import { Race } from "../../interfaces/race";
import { CrudService } from "../../services/crud.service";
import { AuthService } from "../../services/auth.service";
import { Login } from "../../interfaces/login";
import { AddRaceComponent } from "../add-race/add-race.component";
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
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
        a['color'] = this.setRaceColor(a);
        this.allRaces.push(a as Race);
        this.loading = false;
      })
      this.groupRacesByYear();
    })
  }

  setRaceColor(race: Race) {
    if (race.distance <= 10) {
      return 'blue';
    } else if (race.distance > 10 && race.distance < 21) {
      return 'orange';
    } else if (race.distance >= 21) {
      return 'red';
    } else {
      return 'white'
    }
  }

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
  }

  addRaceDialog(action: string) {
    const dialogRef = this.dialog.open(AddRaceComponent, {
      data: {
        action
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${ result }`);
      if (result) {
        this.snackBar.open('Carrera creada!!', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    })
  }

  openDeleteRaceDialog(raceKey: string) {
    this.crudApi.deleteRace(raceKey);
    this.snackBar.open('Carrera eliminada!!', 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  editRaceDialog(raceKey: string, action: string) {
    this.crudApi.getRace(raceKey).valueChanges().subscribe(data => {
      const dialogRef = this.dialog.open(AddRaceComponent, {
        data: {
          ...data,
          action
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.edit) {
          this.snackBar.open('Carrera editada!!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      });
    })
  }

  openRaceDialog(action: string, raceKey: string = '') {
    if (raceKey && action === 'edit') {
      this.editRaceDialog(raceKey, action);
      return;
    }
    if (action === 'add') {
      this.addRaceDialog(action);
      return;
    }
  }

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
    })
    this.allRacesByYear = groupArrays;
  }
}
