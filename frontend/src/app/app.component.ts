import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { WishItem } from 'src/shared/models/wishitems';
import { AppState } from './app.state';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);


  constructor(private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.authService.checkToken();
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
