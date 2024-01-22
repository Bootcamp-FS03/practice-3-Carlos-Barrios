import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RegisterDialogComponent } from '../../dialogs/register-dialog/register-dialog.component';
import { UserAuth } from 'src/app/models/userAuth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  login$!: Observable<any>;
  loginSubscription!: Subscription;
  userAuth!: UserAuth;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userAuth = this.loginForm.value;
      this.login$ = this.loginService.login(this.userAuth);

      this.loginSubscription = this.login$.subscribe({
        next: (res) => {
          this.loginService.setToken(res.token);
          this.loginService.setUser(res.user);
          this.router.navigate(['posts']);
        },
        error: (error) => {
          alert(error.error.message);
          this.loginForm.get('password')?.reset('');
        },
      });
    }
  }

  onRegister(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['posts']);
    });
  }
}
