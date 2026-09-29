import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductlistComponent } from './products/productlist/productlist.component';
import { ProfileComponent } from './user/profile/profile.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { roleGuard } from './guards/role.guard';
import { ProductManageComponent } from './products/product-manage/product-manage/product-manage.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';

const routes: Routes = [
  {
path:"login", 
component:LoginComponent,  
  },
  {
path:"register", 
component:RegisterComponent,  
  },
  {
path:"profile", 
component:ProfileComponent,  
  },
  {
path:"wishlist", 
component:WishlistComponent,  
  },
   {
path:"products", 
component:ProductlistComponent,  
  },
  {
path:"create-product", 
component:CreateProductComponent, 
canActivate: [roleGuard] 
  },
   {
path:"products/manage", 
component:ProductManageComponent,  
  },
  {
path:"create-product/:id", 
component:CreateProductComponent, 
canActivate: [roleGuard] 
  },
   {
path:"cart-list", 
component:CartListComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
