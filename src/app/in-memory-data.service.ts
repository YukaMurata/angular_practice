import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Fukumura' },
      { id: 2, name: 'Ikuta' },
      { id: 3, name: 'Ishida' },
      { id: 4, name: 'Sato' },
      { id: 5, name: 'Oda' },
      { id: 6, name: 'Nonaka' },
      { id: 7, name: 'Makino' },
      { id: 8, name: 'Haga' },
      { id: 9, name: 'Kaga' },
      { id: 10, name: 'Yokoyama' }
    ];

    return { heroes };
  }

  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}
