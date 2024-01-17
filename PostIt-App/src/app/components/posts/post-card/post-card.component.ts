import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { FormDialogComponent } from '../../dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() isOwner: boolean = false;
  @Output() cardUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cardDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog
  ) { }

  onUpdatePost(post: Post): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600 px',
      data: post
    });

    dialogRef.afterClosed().subscribe({
      next: (_) => this.cardUpdated.emit(true)
    });
  }

  onDeletePost(post: Post): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: post
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.cardDeleted.emit(true);
    });
  }
}
