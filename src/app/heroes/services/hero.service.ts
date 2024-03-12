import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {

  constructor(private http: HttpClient) { }

  private baseUrl : string = environments.baseUrl;

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);

  }

  getHeroesById(id: string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError( error => of(undefined))
    );
  }

  getSuggestions(query: string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero(heroe: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,heroe);
  }

  updateHero(heroe:Hero): Observable<Hero>{
    if(!heroe.id) throw Error('El id del heroe es obligatorio')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${heroe.id}`,heroe);
  }

  deleteHeroById(id : string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(err => of(false)),
      map(resp => true)
    );
  }
}
