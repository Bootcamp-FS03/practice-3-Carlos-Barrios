import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts/posts.component';
import { MyPostsComponent } from './components/posts/my-posts/my-posts.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { MaterialModule } from './modules/material/material/material.module';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from './components/dialogs/form-dialog/form-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterDialogComponent } from './components/dialogs/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    MyPostsComponent,
    PostCardComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    NavbarComponent,
    RegisterDialogComponent
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
