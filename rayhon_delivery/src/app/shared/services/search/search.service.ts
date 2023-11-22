import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonUrl } from '../../consts/commonUrl';
import { CommonKey } from '../../consts/commonKey';
import { IMenu } from 'src/app/home/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchWord$ = new Subject<string>();
  public searchWord: string = '';
  public isSearching = false;

  constructor(private http: HttpClient) { }

  public searchByWord(word: string) {
    return this.http.get<IMenu['category_items'][0]['items']>(`${CommonUrl.MAIN_URL}${CommonUrl.SEARCH_URL}/q?search_text=${word}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getRecentSearchWords() {
    return this.http.get<string[]>(`${CommonUrl.MAIN_URL}${CommonUrl.SEARCH_URL}/recently-searched`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
