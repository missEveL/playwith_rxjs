import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Affirmation, AffirmationListResponse } from './affirmation';
import { interval, Observable, pipe, timer } from 'rxjs';

const API_ENDPOINT = 'http://localhost:3000';
const API_ENDPOINT_MINION = 'https://api.funtranslations.com/translate/doge.json';
const CACHE_SIZE = 1;
const RATE_LIMIT = 5;

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  cache$!: {page: number, call:Observable<Affirmation[]>}[];
  totalPages!: number;
  perPage =3;
  counter = 0;
  timer$!: Observable<number>;
  countdown$!: Observable<String>;

  constructor(private http: HttpClient) {
    this.cache$ = [];
   }

  get affirmation() {
    return this.requestAffirmation();
  }

  getAffirmationPage(page:number) {
    let cacheIdx = this.cache$.findIndex(elm => elm.page == page);
    if (cacheIdx == -1) {
      this.cache$.push({
        page: page,
        call: this.requestAffirmations(page, this.perPage).pipe(
          shareReplay(CACHE_SIZE)
        )
      })
    }
    cacheIdx = this.cache$.findIndex(elm => elm.page == page);
    return this.cache$[cacheIdx].call;
  }

  private requestAffirmations(page: Number, perPage: number) {
    let affirmationArr: any[] = [];
    return this.http.get<AffirmationListResponse>(`${API_ENDPOINT}/all?page=${page}&perPage=${perPage}`).pipe(
      map((resp) => {
        this.totalPages = Math.round(resp.total/this.perPage);
        resp.affirmations.forEach((val,index) => {
          affirmationArr[index] = {'affirmation': val}
        });
        return affirmationArr;
      }),
      switchMap(arr => this.http.get<String[]>(`${API_ENDPOINT}/shibes?count=${arr.length}&bustCache=1`).pipe(
        map((arr) => {
          arr.forEach((val,index) => {
            affirmationArr[index].imgSrc = val;
          });
          return affirmationArr;
        }),
        map((arr) => {
          arr.forEach((val,index) => {
            this.getDogeTranslation(val.affirmation).subscribe(
              (translation) => {
                affirmationArr[index].translation = translation;
              })
          });
          return affirmationArr;
        })
      )),
      share()
    );
  }

  private requestAffirmation() {
    let affirmationObj: Affirmation = {
      affirmation: '',
      translation: '',
      imgSrc: ''
    };
    return this.http.get<Affirmation>(API_ENDPOINT).pipe(
      map((resp) => {affirmationObj.affirmation = resp.affirmation}),
      switchMap(() => this.http.get<String[]>(`${API_ENDPOINT}/shibes?count=1`).pipe(
        map((resp) => {
          affirmationObj.imgSrc = resp[0];
        return affirmationObj})
        )
      )
    )
  }

  public getDogeTranslation(text: String): Observable<String> {
    if (this.counter < RATE_LIMIT) {
      return this.http.get(`${API_ENDPOINT}/dogeTranslate?text=${text}`).pipe(
        map((response: any) => response),
        tap(() => this.counter++))
    } else {
      if (!this.countdown$) {
        const startTime = new Date();
        let endTime = new Date();
        endTime.setHours(startTime.getHours() + 1);
        this.timer$ = timer(endTime);
        this.countdown$ = interval(1000).pipe(
          map(seconds => `Doge Translation available in: ${60 * 60 - seconds}`),
          takeUntil(this.timer$),
          share()
        )
      }
      return this.countdown$;
    }
  }

}
