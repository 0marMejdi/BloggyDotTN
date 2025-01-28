import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResquestDto } from '../dto/request.dto';
import { API } from '../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  constructor() {}

  getBotResponse(request: ResquestDto): Observable<any> {
    
    return this.http.post(API.chatbot, request);
  }
}