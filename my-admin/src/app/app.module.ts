import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessengerComponent } from './admin-messenger/admin-messenger.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminNavigateBarComponent } from './admin-navigate-bar/admin-navigate-bar.component';
import { AdminCaterogyComponent } from './admin-caterogy/admin-caterogy.component';
import { AddCaterogyLevel1Component } from './admin-caterogy/add-caterogy-level-1/add-caterogy-level-1.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryLevel1Component } from './admin-caterogy/edit-category-level-1/edit-category-level-1.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { ProductDetailComponent } from './admin-product/product-detail/product-detail.component';
import { EditProductComponent } from './admin-product/edit-product/edit-product.component';
import { AdminCustomerDetailManagementComponent } from './admin-customer/admin-customer-detail-management/admin-customer-detail-management.component';
import { AdminCustomerManagementComponent } from './admin-customer/admin-customer-management/admin-customer-management.component';
import { AdminIncompleteOrderComponent } from './admin-order/admin-incomplete-order/admin-incomplete-order.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    AdminCustomerComponent,
    AdminLoginComponent,
    AdminMessengerComponent,
    AdminOrderComponent,
    AdminProductComponent,
    AdminNavigateBarComponent,
    AdminCaterogyComponent,
    AddCaterogyLevel1Component,
    EditCategoryLevel1Component,
    AdminHomeComponent,
    AddProductComponent,
    ProductDetailComponent,
    EditProductComponent,
    AdminCustomerDetailManagementComponent,
    AdminCustomerManagementComponent,
    AdminIncompleteOrderComponent,
    AdminOrderDetailComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
