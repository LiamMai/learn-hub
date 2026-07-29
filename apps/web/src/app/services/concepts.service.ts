import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Concept, CreateConcept } from '../models/concept.model';

@Injectable({ providedIn: 'root' })
export class ConceptsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/concepts`;

  getAll(topicId?: string): Observable<Concept[]> {
    const params = topicId ? new HttpParams().set('topicId', topicId) : undefined;
    return this.http.get<Concept[]>(this.baseUrl, { params });
  }

  getOne(id: string): Observable<Concept> {
    return this.http.get<Concept>(`${this.baseUrl}/${id}`);
  }

  create(concept: CreateConcept): Observable<Concept> {
    return this.http.post<Concept>(this.baseUrl, concept);
  }

  update(id: string, concept: Partial<CreateConcept>): Observable<Concept> {
    return this.http.patch<Concept>(`${this.baseUrl}/${id}`, concept);
  }

  remove(id: string): Observable<Concept> {
    return this.http.delete<Concept>(`${this.baseUrl}/${id}`);
  }
}
