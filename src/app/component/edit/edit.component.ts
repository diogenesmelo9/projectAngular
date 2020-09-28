import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from './../../service/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  vehicle: Vehicle;
  plate: string;
  imagePathCar = 'assets/img/car.png';
  public vehicleForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public vehicleService: VehicleService,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.plate = this.activatedRoute.snapshot.paramMap.get('plate');
    this.getVehiclePerPlate(this.plate);
  }

  getVehiclePerPlate(plate: string): void {
    this.vehicleService.getVehiclesPerPlate(plate).subscribe((data: Vehicle[]) => {
      this.vehicle = data[0];
      this.vehicleForm = this.fb.group({
        id: [this.vehicle.id, [Validators.required]],
        plate: [this.vehicle.plate, [Validators.required]],
        model: [this.vehicle.model, [Validators.required]],
        manufacturer: [this.vehicle.manufacturer, [Validators.required]],
        color: [this.vehicle.color, [Validators.required]],
        status: [this.vehicle.status, [Validators.required]],
      });
      this.vehicleForm.controls['plate'].disable();
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  updateVehicle(): void{
    this.vehicleService.updateVehicle(this.vehicleForm.value).subscribe((data: Vehicle) => {
      this.vehicle = data;
      this.openSnackBar('Vehicle successfully updated.', 'close');
    }, error => {
      this.openSnackBar('Vehicle has not been updated.', 'close');
    });
  }

}
