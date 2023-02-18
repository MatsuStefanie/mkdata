import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-actions-table',
  templateUrl: './actions-table.component.html',
  styleUrls: ['./actions-table.component.scss'],
})
export class ActionsTableComponent {
  constructor(private router: Router) {}
  goToRegister() {
    this.router.navigate(['/new']);
  }
}
