import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private keywordSource = new BehaviorSubject<string>('');
  keyword$ = this.keywordSource.asObservable();

  setKeyword(keyword: string) {
    this.keywordSource.next(keyword);
  }
}
