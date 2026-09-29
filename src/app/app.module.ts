import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductlistComponent } from './products/productlist/productlist.component';
import { ProfileComponent } from './user/profile/profile.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProductManageComponent } from './products/product-manage/product-manage/product-manage.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProductlistComponent,
    ProfileComponent,
    WishlistComponent,
    CreateProductComponent,
    ProductManageComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
