import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MenubarComponent } from './shared/menubar/menubar.component';
import { CustommaterialModule } from './materials.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule, MatDialog } from '@angular/material';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './admin-panel/sidebar/sidebar.component';
import { CategoryComponent } from './products/category/category.component';
import {MatSelectModule} from '@angular/material/select';
import { OrderComponent } from './order/order.component';
import { ApiServiceService } from './services/api-service.service';
import { AuthService } from './services/auth.service';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { OrderManageComponent } from './order/order-manage/order-manage.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { CommentsComponent } from './products/product-detail/comments/comments.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterLoginComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    MenubarComponent,
    ProductDetailComponent,
    NavbarComponent,
    CreateProductComponent,
    CartDetailsComponent,
    ProfileComponent,
    AdminPanelComponent,
    MyDialogComponent,
    SidebarComponent,
    CategoryComponent,
    OrderComponent,
    ProfileListComponent,
    OrderManageComponent,
    DashboardComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    CustommaterialModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MyDialogComponent
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [ApiServiceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
