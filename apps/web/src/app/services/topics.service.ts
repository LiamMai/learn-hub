import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTopic, Topic } from '../models/topic.model';

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/topics';

  getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  getOne(id: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.baseUrl}/${id}`);
  }

  create(topic: CreateTopic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl, topic);
  }

  update(id: string, topic: Partial<CreateTopic>): Observable<Topic> {
    return this.http.patch<Topic>(`${this.baseUrl}/${id}`, topic);
  }

  remove(id: string): Observable<Topic> {
    return this.http.delete<Topic>(`${this.baseUrl}/${id}`);
  }
}
