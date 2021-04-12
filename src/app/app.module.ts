import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './services/service/service.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { BillsComponent } from './bills/bills.component';
import { BillComponent } from './bills/bill/bill.component';
import { StoreComponent } from './store/store.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddItemComponent } from './items/add-item/add-item.component';
import { WelcomeComponent } from './utility/welcome/welcome.component';
import { AddBillComponent } from './bills/add-bill/add-bill.component';
import { ReportsComponent } from './reports/reports.component';
import { AllBillsComponent } from './reports/all-bills/all-bills.component';
import { ByDateComponent } from './reports/by-date/by-date.component';
import { SearchComponent } from './reports/search/search.component';
import { FinancialsComponent } from './reports/financials/financials.component';
import { PermissionsComponent } from './utility/permissions/permissions.component';
import { SignInFormComponent } from './users/sign-in-form/sign-in-form.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CartCounterComponent } from './cart/cart-counter/cart-counter.component';
import { ShowCartItemsComponent } from './cart/show-cart-items/show-cart-items.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartFormComponent } from './cart/cart-form/cart-form.component';
import { BillRowComponent } from './bills/bill-row/bill-row.component';
import { MenuComponent } from './header/menu/menu.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { SubMenuComponent } from './header/sub-menu/sub-menu.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { MainComponent } from './content/main/main.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'categories',
    component: MainComponent,
    children: [
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'new-sell', component: CategoriesComponent },
      { path: 'category/:id', component: ItemComponent },
    ],
  },
  { path: 'items', component: MainComponent },
  { path: 'reports', component: MainComponent },
  {
    path: 'settings',
    component: MainComponent,
    children: [{ path: 'add-company', component: AddCompanyComponent }],
  },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'new-sell', component: CategoriesComponent },
  { path: 'category/:id', component: ItemsComponent },
  { path: 'category/:catId/sell/:itemId', component: AddBillComponent },
  { path: 'financials', component: FinancialsComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'show-cart', component: ShowCartItemsComponent },
  {
    path: 'mybills',
    component: ReportsComponent,
    children: [
      { path: 'all-bills', component: AllBillsComponent },
      { path: 'by-date', component: ByDateComponent },
      { path: 'search', component: SearchComponent },
      { path: 'bill/:billId', component: BillComponent },
    ],
  },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryComponent,
    ItemsComponent,
    ItemComponent,
    ServicesComponent,
    ServiceComponent,
    ClientsComponent,
    ClientComponent,
    BillsComponent,
    BillComponent,
    StoreComponent,
    AddCategoryComponent,
    AddItemComponent,
    WelcomeComponent,
    AddBillComponent,
    ReportsComponent,
    ByDateComponent,
    SearchComponent,
    AllBillsComponent,
    FinancialsComponent,
    PermissionsComponent,
    SignInFormComponent,
    SignUpComponent,
    AddCompanyComponent,
    CompaniesComponent,
    CartCounterComponent,
    ShowCartItemsComponent,
    CartItemComponent,
    CartFormComponent,
    BillRowComponent,
    MenuComponent,
    MenuItemComponent,
    SubMenuComponent,
    UserInfoComponent,
    MainComponent,
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
