import { Component, OnInit } from '@angular/core';
import { MenuItem } from "../../interfaces/menu-item";
import { AddRaceComponent } from "../../races/add-race/add-race.component";
import { CrudService } from "../../services/crud.service";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {
  localstorageJSON = JSON.parse(localStorage.getItem('user') || '{}');
  menuItems: MenuItem[] = [
    {
      label: 'Agregar Carrera',
      icon: 'add',
      clickAction: 'this.addRaceDialog(\'add\')',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Salir',
      icon: 'logout',
      clickAction: 'this.authService.signOut()',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    }
  ];

  constructor(
    public crudApi: CrudService,
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  executeAction(action: string) {
    eval(action);
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
}
