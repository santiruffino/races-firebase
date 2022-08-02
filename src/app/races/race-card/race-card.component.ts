import { Component, Input, OnInit } from '@angular/core';
import { Race } from "../../interfaces/race";
import { CrudService } from "../../services/crud.service";
import { AuthService } from "../../services/auth.service";
import { Login } from "../../interfaces/login";
import { AddRaceComponent } from "../add-race/add-race.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-race-card',
  templateUrl: './race-card.component.html',
  styleUrls: ['./race-card.component.css']
})
export class RaceCardComponent implements OnInit {
  @Input() race: any;

  userData: Login = {uid: '', email: '', emailVerified: false, displayName: '', photoURL: ''};
  allRaces: Race[] = [];
  allRacesByYear: any;
  hideWhenNoRace: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    public crudApi: CrudService,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.setRaceColor(this.race);
  };

  setRaceColor(race: Race) {
    if (race.distance <= 10) {
      race.color = 'blue';
    } else if (race.distance > 10 && race.distance < 21) {
      race.color = 'orange';
    } else if (race.distance >= 21) {
      race.color = 'red';
    } else {
      race.color = 'white'
    }
  };

  openDeleteRaceDialog(raceKey: string) {
    this.crudApi.deleteRace(raceKey);
    this.snackBar.open('Carrera eliminada!!', 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addRaceDialog(action: string) {
    const dialogRef = this.dialog.open(AddRaceComponent, {
      data: {
        action
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.snackBar.open('Carrera creada!!', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    })
  };

  openRaceDialog(action: string, raceKey: string = '') {
    if (raceKey && action === 'edit') {
      this.editRaceDialog(raceKey, action);
      return;
    }
    if (action === 'add') {
      this.addRaceDialog(action);
      return;
    }
  };

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
  };

}
