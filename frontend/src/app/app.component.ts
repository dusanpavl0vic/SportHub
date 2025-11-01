import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, startWith, tap } from 'rxjs';
import { WishItem } from 'src/shared/models/wishitems';
import { AppState } from './app.state';
import { AuthService } from './auth/service/auth.service';
import { selectIsAuthenticated } from './auth/store/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


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


  isAuthPage$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => {
      const hiddenRoutes = ['/login', '/register'];
      return hiddenRoutes.includes(this.router.url);
    }),
    tap(x => console.log('isAuthPage', x))
  );


  isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

  showLayout$ = combineLatest([this.isAuthenticated$, this.isAuthPage$]).pipe(
    map(([isAuth, isAuthPage]) => isAuth && !isAuthPage)
  );

}
