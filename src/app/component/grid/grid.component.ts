import { OnInit, Component, ViewChild, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleService } from './../../service/vehicle.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  vehicles: Vehicle[];
  vehicle: Vehicle;
  displayedColumns: string[] = ['plate', 'model', 'manufacturer', 'status', 'action'];
  dataSource: MatTableDataSource<Vehicle>;
  plate: string;

  constructor(
    public vehicleService: VehicleService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    matIconRegistry.addSvgIcon('edit', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/edit-regular.svg'));
    matIconRegistry.addSvgIcon('trash', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/trash-alt-regular.svg'));
    matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/search-solid.svg'));
    matIconRegistry.addSvgIcon('fiber', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icon/fiber_manual.svg'));
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((data: Vehicle[]) => {
      if (data.length < 1){
       this.openSnackBar('There are no registered vehicles..', 'close');
      } else {
        this.vehicles = data;
        this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.openSnackBar('An unexpected server error has occurred.', 'close');
    });
  }

  getVehiclesPerPlate(): void {
    if (this.plate === undefined || this.plate === ''){
      this.openSnackBar('Insert a plate.', 'close');
      this.getVehicles();
    } else {
      this.vehicleService.getVehiclesPerPlate(this.plate).subscribe((data: Vehicle[]) => {
        if (data.length < 1){
          this.openSnackBar('This plate does not exist.', 'close');
        }
        this.vehicles = data;
        this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.openSnackBar('An unexpected server error has occurred.', 'close');
      });
    }
  }

  deleteVehicle(vehicle: Vehicle): void{
    this.vehicleService.deleteVehicle(vehicle).subscribe((data: Vehicle) => {
      this.vehicle = data;
      this.openSnackBar('Vehicle successfully deleted.', 'close');
      this.getVehicles();
    }, error => {
      this.openSnackBar('Could not delete the vehicle.', 'close');
    });
  }

  goToEdit(plate: string): void{
    this.router.navigate(['edit/' + plate]);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  openDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: vehicle
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        this.deleteVehicle(result);
      }
    });
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})

export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
