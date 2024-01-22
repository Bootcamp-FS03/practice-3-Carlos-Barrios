import { Component } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { ComunicationService } from 'src/app/services/comunication.service';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  user!: User;
  myPosts: Post[] = [];
  myPosts$!: Observable<Post[]>;
  myPostSubscription!: Subscription;

  constructor(
    private postService: PostsService,
    private loginService: LoginService,
    private communicationService: ComunicationService
  ) {
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.getPosts();
    this.communicationService.resourceCreated$.subscribe(() => {
      // Lógica para cargar los posts actualizados
      this.getPosts();
    });
  }

  ngOnDestroy(): void {
    if (this.myPostSubscription) {
      this.myPostSubscription.unsubscribe();
    }
  }

  getPosts(): void {
    this.myPosts$ =
      this.user && this.user?.id
        ? this.postService.getAllUserPost(this.user.id)
        : of([]);
    this.myPostSubscription = this.myPosts$.subscribe({
      next: (res) => {
        this.myPosts = res.reverse();
      },
    });
  }
}
