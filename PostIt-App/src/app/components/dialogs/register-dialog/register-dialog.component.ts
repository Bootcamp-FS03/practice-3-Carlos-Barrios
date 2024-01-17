import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private userService: UsersService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]],
    });
  }

  matchPasswords(control: any): { [key: string]: boolean } | null {
    const password = this.registerForm?.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { 'mismatch': true };
  }

  onSubmit(event : Event): void {
    event.preventDefault(); 
    if (this.registerForm.valid) {
      const newUser = {
        name: this.registerForm.get('name')?.value,
        lastName: this.registerForm.get('lastname')?.value,
        email: this.registerForm.get('email')?.value,
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        profilePicture: ''
      };
      this.userService.createUser(newUser).subscribe({
        next: (user) => {
          this.dialogRef.close(user);
          this.loginService.login(newUser.username, newUser.password).subscribe({
            next: (res) => {
              this.loginService.setToken(res.token);
              this.loginService.setUser(res.user);
              this.router.navigate(['/posts']);
            },
            error: (error) => {
              console.error('Error: ', error);
            }
          })
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }

  onCancel(event : Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }
}
