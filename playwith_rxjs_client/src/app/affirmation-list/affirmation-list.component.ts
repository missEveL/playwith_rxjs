import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Affirmation } from '../affirmation';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'app-affirmation-list',
  templateUrl: './affirmation-list.component.html',
  styleUrls: ['./affirmation-list.component.scss']
})
export class AffirmationListComponent implements OnInit {

  affirmations: Affirmation[] = [];
  currPage = 0;
  totalPages = 0;

  constructor(private affirmationService: AffirmationService) {
   }

  ngOnInit(): void {
    this.page();
  }

  addAffirmation(): void {
    this.affirmationService.affirmation.subscribe( val => this.affirmations.push(val));

  }

  translate(affirmation:Affirmation) {
    this.affirmationService.getDogeTranslation(affirmation.affirmation).subscribe(
      translation => affirmation.translation = translation
    )
  }

  page(next = true): void {
    next? this.currPage++ : this.currPage--;
    this.affirmationService.getAffirmationPage(this.currPage).pipe(
      tap(() => this.totalPages = this.affirmationService.totalPages)
    ).subscribe(val =>
      this.affirmations = val
    );
  }

}
