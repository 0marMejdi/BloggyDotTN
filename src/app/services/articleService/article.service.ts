import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../../../config/api.config';
import {map} from 'rxjs/operators';
import {Article} from '../../shared/models/article.model';
import {newArticle} from '../../shared/dto/new-blog.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(API.getArticleFull);
  }

  upvote(id: string) {
    return this.http.post<any>(`${API.getArticle}/${id}/upvote`, null);
  }


  downvote(id: string) {
    return this.http.post<any>(`${API.getArticle}/${id}/downvote`, null);
  }

  getArticlesByUserId(id : string):Observable<Article[]>{
    return this.http.get<Article[]>(API.getArticleByUserId+id);
  }

  getArticleOfCurrentUser():Observable<Article[]> {
    return this.http.get<Article[]>(API.getArticleProperties);
  }

  createArticle(newBlog: newArticle): Observable<Article> {
    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    if (newBlog.slug) formData.append('slug', newBlog.slug);
    if (newBlog.images) {
      newBlog.images.forEach((image: File) => {
        formData.append('images', image);
      });
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    return this.http.post<Article>(API.createArticle, formData);
  }
  getArticleById(id : string) : Observable<Article> {
    return this.http.get<any>(API.getArticleById+id) ;
  }

  deleteArticle(id: string) :Observable<Article> {
    return this.http.delete<Article>(API.getArticle+'/'+id);
  }
}
