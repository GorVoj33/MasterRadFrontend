import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoryComponent } from './products/category/category.component';
import { OrderComponent } from './order/order.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { OrderManageComponent } from './order/order-manage/order-manage.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {path: 'auth', component: RegisterLoginComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/detail/:id', component: ProductDetailComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'menubar', component: MenubarComponent},
  {path: 'cart', component: CartDetailsComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'order', component: OrderComponent},
  {path: 'manage-orders', component: OrderManageComponent},
  {path: 'profiles', component: ProfileListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
