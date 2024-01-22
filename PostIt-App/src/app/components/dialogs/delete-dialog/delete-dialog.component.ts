import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnDestroy {
  post$!: Observable<void>;
  postSubscription!: Subscription;

  constructor(
    private postService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onDeletePost(): void {
    const postId = this.data?.id;
    if (postId) {
      this.post$ = this.postService.deletePost(postId);
      this.postSubscription = this.post$.subscribe((_) => {
        this.dialogRef.close();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
