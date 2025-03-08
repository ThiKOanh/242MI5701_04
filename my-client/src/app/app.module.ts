import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentBankingComponent } from './payment-banking/payment-banking.component';
import { PaymentMomoComponent } from './payment-momo/payment-momo.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CartComponent } from './cart/cart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavigateBarComponent } from './navigate-bar/navigate-bar.component';
import { ConfirmSignUpComponent } from './confirm-sign-up/confirm-sign-up.component';
import { SignUpSuccessfullyComponent } from './sign-up-successfully/sign-up-successfully.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InforComponent } from './infor/infor.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupOtpComponent } from './sign-up/signup-otp/signup-otp.component';
import { AccountcustomerService } from './SERVICES/accountcustomer.service';
import { DealsComponent } from './deals/deals.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    HomeComponent,
    ForgotPasswordComponent,
    LoginComponent,
    OrderDetailComponent,
    PaymentComponent,
    PaymentBankingComponent,
    PaymentMomoComponent,
    ProductDetailComponent,
    SearchResultComponent,
    CartComponent,
    SignUpComponent,
    NavigateBarComponent,
    ConfirmSignUpComponent,
    SignUpSuccessfullyComponent,
    ResetPasswordComponent,
    InforComponent,
    ProfileComponent,
    SignupOtpComponent,
    DealsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AccountcustomerService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
