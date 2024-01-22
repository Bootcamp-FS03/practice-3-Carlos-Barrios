import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { FormDialogComponent } from '../../dialogs/form-dialog/form-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  user!: User;
  isOwner!: boolean;
  posts: Post[] = [];
  posts$!: Observable<Post[]>;
  postSubscription!: Subscription;

  constructor(
    private postService: PostsService,
    private loginService: LoginService,
    private readonly dialog: MatDialog
  ) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  getPosts(): void {
    this.posts$ = this.postService.getAllPosts();
    this.postSubscription = this.posts$.subscribe({
      next: (res) => {
        this.posts = res.reverse();
      },
    });
  }

  onPostCreate(): void {
    console.log('any');
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500 px',
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getPosts();
   });
  }
}
