import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
  user!: User;
  postForm!: FormGroup;
  post$!: Observable<Post>;
  postSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private postService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private comunicationService: ComunicationService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  initializeForm(): void {
    this.postForm = this.formBuilder.group({
      id: [this.data?.id],
      userId: [this.data?.userId ? this.data.userId : this.user.id],
      content: [
        this.data?.content ? this.data.content : '',
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      if (this.data) {
        this.updatePost(this.postForm.value);
      } else {
        this.createPost(this.postForm.value);
      }
    }
  }

  private createPost(postData: Post): void {
    const newPost = {
      content: postData.content,
      userId: postData.userId,
      images: postData.images,
    };
    this.post$ = this.postService.createPost(newPost);
    this.postSubscription = this.post$.subscribe({
      next: (post) => {
        this.comunicationService.notifyResourceCreated();
        this.dialogRef.close(post);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }

  private updatePost(postData: Post): void {
    const postId = this.data?.id;
    if (postId) {
      this.post$ = this.postService.updatePost(postData, postId);
      this.postSubscription = this.post$.subscribe({
        next: (post) => {
          this.dialogRef.close(post);
        },
        error: (error) => {
          console.error('Error updating post:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
