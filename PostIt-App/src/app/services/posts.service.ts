import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private addAuthorizationHeader(): HttpHeaders {
    const token = this.loginService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllPosts(): Observable<Post[]> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<Post[]>(`${this.baseUrl}/api/Post`, { headers });
  }

  getAllUserPost(userId: string): Observable<Post[]> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<Post[]>(`${this.baseUrl}/api/Post/${userId}`, {
      headers,
    });
  }

  createPost(post: Post): Observable<Post> {
    const headers = this.addAuthorizationHeader();
    return this.http.post<Post>(`${this.baseUrl}/api/Post/`, post, { headers });
  }

  updatePost(post: Post, postId: string): Observable<Post> {
    const headers = this.addAuthorizationHeader();
    return this.http.put<Post>(`${this.baseUrl}/api/Post/${postId}`, post, {
      headers,
    });
  }

  deletePost(id: string): Observable<void> {
    const headers = this.addAuthorizationHeader();
    return this.http.delete<void>(`${this.baseUrl}/api/Post/${id}`, {
      headers,
    });
  }
}
