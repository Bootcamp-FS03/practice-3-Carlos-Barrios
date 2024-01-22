import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user!: User;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly loginService: LoginService
  ) {
    this.user = loginService.getUser();
  }

  logout(): void {
    this.loginService.clearToken();
    this.router.navigate(['/login']);
  }

  onPostCreate(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500 px',
    });
  }
}
