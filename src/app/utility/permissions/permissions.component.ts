import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  openDiscount: boolean;
  loading = true;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.openDiscount = this.appService.getCurrentOpenDiscount();
    this.appService.openDiscountStatusChanged.subscribe((status: boolean) => {
      this.openDiscount = status;
    });
  }

  onDiscountClicked(openDiscount: boolean) {
    if (openDiscount) {
      this.appService.deleteOpenDiscount();
    } else {
      this.appService.setOpenDiscount({ status: !openDiscount });
    }
  }
}
