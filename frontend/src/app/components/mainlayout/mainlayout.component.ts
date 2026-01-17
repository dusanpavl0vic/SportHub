import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import * as AuthSelector from 'src/app/auth/store/auth.selector';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponentComponent } from "../sidebar-component/sidebar-component.component";

@Component({
  selector: 'app-mainlayout',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponentComponent,
    RouterModule
  ],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.scss',
  standalone: true,
})
export class MainlayoutComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(
      AuthSelector.selectIsAuthenticated,
    );
  }

}
