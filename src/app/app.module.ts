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
import { AddCompanyComponent } from './companies/add-company/add-company.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { CategoryComponent } from './categories/category/category.component';
import { AllCategoriesComponent } from './categories/all-categories/all-categories.component';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { ItemComponent } from './items/item/item.component';
import { CartCounterComponent } from './cart/cart-counter/cart-counter.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartAllItemsComponent } from './cart/cart-all-items/cart-all-items.component';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';
import { CartFormComponent } from './cart/cart-form/cart-form.component';
import { BillPrintComponent } from './bills/bill-print/bill-print.component';
import { BillRowComponent } from './bills/bill-row/bill-row.component';
import { AllBillsComponent } from './bills/all-bills/all-bills.component';
import { BillsByDateComponent } from './bills/bills-by-date/bills-by-date.component';
import { FindBillComponent } from './bills/find-bill/find-bill.component';
import { BillsHeaderComponent } from './bills/bills-header/bills-header.component';

const appRoutes: Routes = [
  {
    path: 'shopping',
    component: ShoppingCartComponent,
  },
  {
    path: 'print-bill/:billId',
    component: BillPrintComponent,
  },
  {
    path: 'categories',
    component: MainComponent,
    children: [
      { path: 'add-category', component: AddCategoryComponent },
      {
        path: 'new-sell',
        component: AllCategoriesComponent,
        children: [{ path: ':catId', component: AllItemsComponent }],
      },
    ],
  },
  {
    path: 'items',
    component: MainComponent,
    children: [{ path: 'add-items', component: AddItemComponent }],
  },
  { path: 'reports', component: MainComponent, children: [
    {path: 'all-bills', component: AllBillsComponent}
  ] },
  {
    path: 'settings',
    component: MainComponent,
    children: [{ path: 'add-company', component: AddCompanyComponent }],
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
    AddCompanyComponent,
    AddItemComponent,
    CategoryComponent,
    AllCategoriesComponent,
    AllItemsComponent,
    ItemComponent,
    CartCounterComponent,
    CartItemComponent,
    CartAllItemsComponent,
    ShoppingCartComponent,
    CartFormComponent,
    BillPrintComponent,
    BillRowComponent,
    AllBillsComponent,
    BillsByDateComponent,
    FindBillComponent,
    BillsHeaderComponent,
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
