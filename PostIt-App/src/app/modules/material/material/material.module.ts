import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class MaterialModule {}
