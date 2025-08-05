import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sport } from 'src/interfaces/sport/sport.dto';
import { WishItem } from 'src/shared/models/wishitems';
import { AppState } from './app.state';
import { FilterService } from './core/services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {


  constructor(private store: Store<AppState>, private filterService: FilterService) { }

  sports: Sport[] = [];
  cities: string[] = [];


  ngOnInit(): void {
    this.filterService.getSportsCitys().subscribe(data => {
      this.sports = data.Sports;
      this.cities = data.Citys;
      console.log('Sports:', this.sports);
      console.log('Cities:', this.cities);
    });
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
