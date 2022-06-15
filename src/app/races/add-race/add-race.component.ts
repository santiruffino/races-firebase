import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CrudService } from "../../services/crud.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Race } from "../../interfaces/race";

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
    public dialogRef: MatDialogRef<AddRaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.editRace(this.data);
    }
  }

  editRace(raceData: Race) {
    this.raceForm.get('name')?.setValue(raceData.name);
    this.raceForm.get('distance')?.setValue(raceData.distance);
    this.raceForm.get('date')?.setValue(new Date(raceData.date));
    this.raceForm.get('time')?.setValue(raceData.time);
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
    this.dialogRef.close({add: true});
  }

  submitEditRaceData() {
    const oldDate = this.raceForm.value.date;
    this.raceForm.controls['date'].setValue(oldDate.toISOString())
    this.crudApi.updateRace(this.raceForm.value);
    this.resetForm();
    this.dialogRef.close({edit: true});
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
