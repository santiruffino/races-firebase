import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Race } from "../interfaces/race";

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
    this.racesRef = this.db.list(`${this.userUid}`);
    this.racesRef.push({
      name: race.name,
      date: race.date,
      time: race.time,
      distance: race.distance,
      type: race.type,
      color: race.color
    })
  }

  getRace(id: string) {
    this.raceRef = this.db.object(`${this.userUid}/${id}`);
    return this.raceRef;
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
      distance: race.distance,
      type: race.type,
      color: race.color
    })
  }

  deleteRace(id: string) {
    this.raceRef = this.db.object(`${this.userUid}/${id}`);
    this.raceRef.remove();
  }
}
