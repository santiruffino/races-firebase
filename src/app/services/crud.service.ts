import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Race } from "../interfaces/race";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  racesRef: AngularFireList<any> = this.db.list('races-list');
  raceRef: AngularFireObject<any> = this.db.object('races-list');
  localstorageJSON = JSON.parse(localStorage.getItem('user') ||   '{}');
  userUid: string | null = this.localstorageJSON.uid;


  constructor(private db: AngularFireDatabase) {
  }

  addRace(race: Race) {
    console.log(this.userUid);
    this.racesRef = this.db.list(`${this.userUid}`);
    this.racesRef.push({
      name: race.name,
      date: race.date,
      time: race.time,
      distance: race.distance
    })
  }

  getRace(id: string) {
    this.raceRef = this.db.object('races-list/' + id);
  }

  getRacesList() {
    this.racesRef = this.db.list(`${this.userUid}`);
    return this.racesRef;
  }

  updateRace(race: Race) {
    this.raceRef.update({
      name: race.name,
      date: race.date,
      time: race.time,
      distance: race.distance
    })
  }

  deleteRace(id: string) {
    this.raceRef = this.db.object('races-list/' + id)
    this.racesRef.remove();
  }
}
