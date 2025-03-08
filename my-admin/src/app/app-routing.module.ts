import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCaterogyComponent } from './admin-caterogy/admin-caterogy.component';
import { AddCaterogyLevel1Component } from './admin-caterogy/add-caterogy-level-1/add-caterogy-level-1.component';
import { EditCategoryLevel1Component } from './admin-caterogy/edit-category-level-1/edit-category-level-1.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { ProductDetailComponent } from './admin-product/product-detail/product-detail.component';
import { AdminCustomerManagementComponent } from './admin-customer/admin-customer-management/admin-customer-management.component';
import { AdminCustomerDetailManagementComponent } from './admin-customer/admin-customer-detail-management/admin-customer-detail-management.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessengerComponent } from './admin-messenger/admin-messenger.component';
import { EditProductComponent } from './admin-product/edit-product/edit-product.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminIncompleteOrderComponent } from './admin-order/admin-incomplete-order/admin-incomplete-order.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import { MatCardModule } from '@angular/material/card'; 
import { NgChartsModule } from 'ng2-charts';
const routes: Routes = [
  { path: "", redirectTo:"admin-login", pathMatch:"full"},
  { path: "admin-login", component: AdminLoginComponent},
  { path: "admin-home", component: AdminHomeComponent },
  { path: "admin-category-management", component: AdminCaterogyComponent},
  { path: "add-category-level-1", component: AddCaterogyLevel1Component },
  { path: "edit-category-level1/:id", component: EditCategoryLevel1Component },
  { path: "product-management", component: AdminProductComponent },
  { path: "admin-customer-management", component: AdminCustomerManagementComponent},
  { path: "admin-customer-detail", component:AdminCustomerDetailManagementComponent},
  { path: "admin-customer-detail-management/:id", component: AdminCustomerDetailManagementComponent},
  { path: "admin-messenger", component: AdminMessengerComponent},
  { path: "add-product", component: AddProductComponent},
  { path: "product-detail/:id", component: ProductDetailComponent},
  { path: "product-detail/edit/:id", component: EditProductComponent},
  { path: "admin-order", component:AdminOrderComponent},
  { path: "admin-incomplete-order", component:AdminIncompleteOrderComponent},
  { path: "admin-order-detail/:id", component:AdminOrderDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule, NgChartsModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }