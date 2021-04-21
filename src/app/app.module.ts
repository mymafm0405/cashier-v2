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
import { AllClientsComponent } from './clients/all-clients/all-clients.component';
import { ClientRowComponent } from './clients/client-row/client-row.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { ClientOrdersComponent } from './clients/client-orders/client-orders.component';
import { StoreComponent } from './items/store/store.component';
import { StoreItemComponent } from './items/store-item/store-item.component';
import { StoreFormComponent } from './items/store-form/store-form.component';
import { CompanyStoreComponent } from './items/company-store/company-store.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserRowComponent } from './users/user-row/user-row.component';
import { UsersComponent } from './users/users/users.component';
import { PermissionRowComponent } from './permissions/permission-row/permission-row.component';
import { PermissionsComponent } from './permissions/permissions/permissions.component';
import { SignInFormComponent } from './users/sign-in-form/sign-in-form.component';
import { UserDataComponent } from './users/user-data/user-data.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { BillsFooterComponent } from './bills/bills-footer/bills-footer.component';
import { ChangePasswordFormComponent } from './users/change-password-form/change-password-form.component';
import { NOTYF, notyfFactory } from './shared/notyf.token';
import firebase from 'firebase/app';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
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
    children: [
      { path: 'add-items', component: AddItemComponent },
      { path: 'store', component: StoreComponent },
    ],
  },
  {
    path: 'reports',
    component: MainComponent,
    children: [
      { path: 'all-bills', component: AllBillsComponent },
      { path: 'by-date', component: BillsByDateComponent },
      { path: 'find-bill', component: FindBillComponent },
      { path: 'clients', component: AllClientsComponent },
    ],
  },
  {
    path: 'settings',
    component: MainComponent,
    children: [
      { path: 'add-company', component: AddCompanyComponent },
      { path: 'users', component: UsersComponent },
      { path: 'permissions', component: PermissionsComponent },
    ],
  },
];

firebase.initializeApp(environment.firebaseConfig);

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
    AllClientsComponent,
    ClientRowComponent,
    ClientFormComponent,
    ClientOrdersComponent,
    StoreComponent,
    StoreItemComponent,
    StoreFormComponent,
    CompanyStoreComponent,
    UserFormComponent,
    UsersListComponent,
    AddUserComponent,
    UserRowComponent,
    UsersComponent,
    PermissionRowComponent,
    PermissionsComponent,
    SignInFormComponent,
    UserDataComponent,
    WelcomeComponent,
    BillsFooterComponent,
    ChangePasswordFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [{ provide: NOTYF, useFactory: notyfFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}
