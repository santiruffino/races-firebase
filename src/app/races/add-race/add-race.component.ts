import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CrudService } from "../../services/crud.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {
  public raceForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    distance: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
  });

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRaceComponent>
  ) {
  }

  ngOnInit(): void {
    this.crudApi.getRacesList();
  }

  close() {
    this.dialogRef.close();
  }

  resetForm() {
    this.raceForm.reset()
  }

  submitRaceData() {
    const oldDate = this.raceForm.value.date;
    this.raceForm.controls['date'].setValue(oldDate.toISOString())
    this.crudApi.addRace(this.raceForm.value);
    this.resetForm();
    this.dialogRef.close();
  }

  get raceName() {
    return this.raceForm.get('name')
  }

  get raceDistance() {
    return this.raceForm.get('distance')
  }

  get raceDate() {
    return this.raceForm.get('date')
  }

  get raceTime() {
    return this.raceForm.get('time')
  }
}
