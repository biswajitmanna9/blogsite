import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.scss']
})
export class AdvertiseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdvertiseComponent>,
  ) { }

  ngOnInit() {
  }

  closeAdvertise() {
    this.dialogRef.close(true);
  }

}
