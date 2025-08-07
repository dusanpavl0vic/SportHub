import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WishItem } from 'src/shared/models/wishitems';
import { AppState } from './app.state';
import { FilterService } from './core/services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {


  constructor(private store: Store<AppState>, private filterService: FilterService) { }



  title = 'meda';

  items: WishItem[] = [
    new WishItem("1"),
    new WishItem("2", true),
    new WishItem("3"),
  ]

  newWishText = '';


  addNewWish() {
    this.items.push(new WishItem(this.newWishText));
    this.newWishText = '';
  }

  toogleItem(item: WishItem) {
    item.isComplete = !item.isComplete
    console.log(item)
  }
}
