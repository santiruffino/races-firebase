import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRaceComponent } from "./races/add-race/add-race.component";
import { DashboardComponent } from "./races/dashboard/dashboard.component";
import { EditRaceComponent } from "./races/edit-race/edit-race.component";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'register-race', component: AddRaceComponent },
  { path: 'view-races', component: DashboardComponent },
  { path: 'edit-race/:id', component: EditRaceComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
