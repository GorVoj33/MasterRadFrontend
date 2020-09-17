import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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


// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule, MatDialog } from '@angular/material';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { OrderComponent } from './order/order.component';
import { ApiServiceService } from './services/api-service.service';
import { AuthService } from './services/auth.service';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { OrderManageComponent } from './order/order-manage/order-manage.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { CommentsComponent } from './products/product-detail/comments/comments.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CreateCategoryComponent } from './admin-panel/create-category/create-category.component';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { CategoryListComponent } from './shared/menubar/category-list/category-list.component';

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
    CreateCategoryComponent,
    OrderComponent,
    ProfileListComponent,
    OrderManageComponent,
    CommentsComponent,
    ErrorPageComponent,
    UpdateProductComponent,
    CategoryListComponent

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
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    NgxSliderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule

  ],
  exports: [
    MyDialogComponent
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [ApiServiceService, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass : HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
