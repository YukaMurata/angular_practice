import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  //heroesではなくheroes$なのは、配列ではなく、Observableだよ〜を示すための規則
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  /**
   * 検索語をobservableストリーム(ストリーム:配列みたいなもの)にプッシュする
   * @param term
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //各キーストローク後、検索の前に300ms待つ
      debounceTime(300),
      //直前の検索語と同じ場合は無視
      distinctUntilChanged(),
      //検索語が変わるたびに新しいobservableにスイッチする
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
