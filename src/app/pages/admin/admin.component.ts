import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  sideBarMenu = [
    {
      title: 'داشبورد',
      link: '/admin',
    },
    {
      title: 'پرداخت ها',
      link: '/admin/payments',
    },
    {
      title: 'تنظیمات',
      link: '/admin/settings',
    },
  ];
}
