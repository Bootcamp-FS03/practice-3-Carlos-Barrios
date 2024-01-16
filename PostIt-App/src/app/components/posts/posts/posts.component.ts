import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
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
    private communicationService: ComunicationService) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.getPosts();

    this.communicationService.resourceCreated$.subscribe(() => {
      this.getPosts();
    });
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
        this.posts = res;
      }
    });
  }

}
