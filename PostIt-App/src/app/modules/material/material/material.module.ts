import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [MatIconModule, MatSelectModule, MatToolbarModule, MatInputModule, BrowserAnimationsModule]
})
export class MaterialModule { }
