import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
