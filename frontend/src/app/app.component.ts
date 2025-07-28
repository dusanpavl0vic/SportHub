import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WishItem } from 'src/shared/models/wishitems';
import { AppState } from './app.state';
import { login, logout } from './auth/auth.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  isAuthenticated$!: Observable<boolean>;
  userName$!: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
    this.userName$ = this.store.select(state => state.auth.userName);
  }

  loginUser() {
    const name = prompt("Enter your name:");
    if (name) {
      this.store.dispatch(login({ userName: name }));
    }
  }

  logoutUser() {
    this.store.dispatch(logout());
  }

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
