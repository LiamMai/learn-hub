import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateInterviewQuestion,
  InterviewQuestion,
} from '../models/interview-question.model';

@Injectable({ providedIn: 'root' })
export class InterviewQuestionsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/interview-questions`;

  getAll(conceptId?: string): Observable<InterviewQuestion[]> {
    const params = conceptId
      ? new HttpParams().set('conceptId', conceptId)
      : undefined;
    return this.http.get<InterviewQuestion[]>(this.baseUrl, { params });
  }

  getOne(id: string): Observable<InterviewQuestion> {
    return this.http.get<InterviewQuestion>(`${this.baseUrl}/${id}`);
  }

  create(question: CreateInterviewQuestion): Observable<InterviewQuestion> {
    return this.http.post<InterviewQuestion>(this.baseUrl, question);
  }

  update(
    id: string,
    question: Partial<CreateInterviewQuestion>,
  ): Observable<InterviewQuestion> {
    return this.http.patch<InterviewQuestion>(`${this.baseUrl}/${id}`, question);
  }

  remove(id: string): Observable<InterviewQuestion> {
    return this.http.delete<InterviewQuestion>(`${this.baseUrl}/${id}`);
  }
}
