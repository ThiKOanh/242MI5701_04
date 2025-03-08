import { Component, ViewChild } from '@angular/core';
import { AccountCustomer } from '../Interfaces/AccountCustomer';
import { Customers, Delivery } from '../Interfaces/Customer';
import { AccountcustomerService } from '../SERVICES/accountcustomer.service';
import { CustomersService } from '../SERVICES/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  account: AccountCustomer = new AccountCustomer();
  customer: Customers = new Customers();
  delivery: Delivery = new Delivery();
  errMessage: string = '';
  isPhoneNumberValid: boolean = true;
  isValidEmail: boolean = true;
  confirmPassword: string = '';

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: any;

  constructor(
    private _service: AccountcustomerService,
    private router: Router,
    private _customerService: CustomersService,
    private accountService: AccountcustomerService
  ) {}

  checkPhoneNumber(): void {
    const phoneNumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/;
    if (this.account.phonenumber.trim().length === 0) {
      this.isPhoneNumberValid = true;
    } else {
      this.isPhoneNumberValid = phoneNumberRegex.test(this.account.phonenumber);
    }
  }

  checkMail() {
    const mailRegex = /\S+@\S+\.\S+/;
    if (this.account.Mail.trim().length === 0) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = mailRegex.test(this.account.Mail);
    }
  }

  postAccount(): void {
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại!');
      return;
    } else if (!this.isValidEmail) {
      alert('Vui lòng nhập đúng email!');
      return;
    } else if (
      this.account.phonenumber.trim().length === 0 ||
      this.account.Name.trim().length === 0 ||
      this.account.password.trim().length === 0 ||
      this.confirmPassword.trim().length === 0 ||
      this.account.Mail.trim().length === 0 ||
      this.account.Address.trim().length === 0 ||
      !this.account.agreement 
    ) {
      alert('Vui lòng nhập đủ thông tin bắt buộc');
      return;
    } else if (this.account.password !== this.confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    } else {
      this._service.postAccount(this.account).subscribe({
        next: (data) => {
          this.account = data;
          alert('Đăng ký thành công');
          this.router.navigate(['/app-login']);
        },
        error: (err) => {
          alert('Đã xảy ra lỗi');
        }
      });
    }
  }

  postCustomer(): void {
    this.customer.CustomerName = this.account.Name;
    this.customer.Phone = this.account.phonenumber;
    this.customer.Mail = this.account.Mail;

    if (!this.isPhoneNumberValid) {
      return;
    } else if (!this.isValidEmail) {
      return;
    } else if (
      this.account.phonenumber.trim().length === 0 ||
      this.account.Name.trim().length === 0 ||
      this.account.password.trim().length === 0 ||
      this.confirmPassword.trim().length === 0 ||
      this.account.Mail.trim().length === 0 

    ) {
      return;
    } else if (this.account.password !== this.confirmPassword) {
      return;
    } else {
      this._customerService.postCustomer(this.customer).subscribe({
        next: (data) => {
          this.customer = data;
          alert('Đăng ký thành công');
        },
        error: (err) => {
          this.errMessage = err;
          alert('Đăng ký không thành công');
        }
      });
    }
  }

  postDelivery(): void {
    this.delivery.Phone = this.account.phonenumber;
    this.delivery.Address = this.account.Address;
    this._customerService.postDelivery(this.delivery).subscribe({
      next: (data) => {
        this.delivery = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }

  onChecked(): void {
    const passwordInput = this.passwordInput.nativeElement;

    if (this.account.password.trim().length === 0) {
      this.passwordInput.value = true;
      return;
    } else {
      if (passwordInput.value.length < 6) {
        alert('Mật khẩu phải từ 6 kí tự trở lên');
      }
    }
  }

  checkPasswordsMatch() {
    if (this.confirmPassword.trim().length === 0) {
      this.confirmPasswordInput = true;
    } else {
      if (this.account.password !== this.confirmPassword) {
        alert('Mật khẩu không khớp');
        return;
      }
    }
  }
}
