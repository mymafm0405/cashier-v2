import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './header/menu/menu.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { SubMenuComponent } from './header/sub-menu/sub-menu.component';
import { MainComponent } from './content/main/main.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';

const appRoutes: Routes = [
  {
    path: 'categories',
    component: MainComponent,
    children: [{ path: 'add-category', component: AddCategoryComponent }],
  },
  { path: 'items', component: MainComponent },
  { path: 'reports', component: MainComponent },
  {
    path: 'settings',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    SubMenuComponent,
    MainComponent,
    AddCategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
