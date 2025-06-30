import { Component } from '@angular/core';
import { WishItem } from 'src/shared/models/wishitems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
