import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountcustomerService } from '../SERVICES/accountcustomer.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  phoneNumber: string = "";
  phoneNumbers: any;
  isPhoneNumberValid: boolean = true;
  phoneNumberExist = true;
  phoneData: string = "";
  errorMessage: string = " ";

  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private accountService: AccountcustomerService
  ) { }

  ngOnInit(): void {
  }

  sendCode() {
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại!');
    } else if (this.phoneNumber.trim().length === 0) {
      alert('Vui lòng nhập số điện thoại!');
    } else {
      this.accountService.checkPhoneNumberExist(this.phoneNumber).subscribe({
        next: (data) => {
          this.phoneNumbers = data;
          if (this.phoneNumbers.phonenumber == this.phoneNumber) {
            alert('Gửi mã thành công!');
          } else {
            alert('Số điện thoại không tồn tại!');
          }
        },
        error: (err) => {
          this.errorMessage = err;
          alert('Lỗi trong quá trình gửi mã!');
        }
      });
    }
  }

  resend() {
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại!');
    } else if (this.phoneNumber.trim().length === 0) {
      alert('Vui lòng nhập số điện thoại!');
    } else {
      this.accountService.checkPhoneNumberExist(this.phoneNumber).subscribe({
        next: (data) => {
          this.phoneNumbers = data;
          if (this.phoneNumbers.phonenumber == this.phoneNumber) {
            alert('Đã gửi lại mã xác nhận!');
          } else {
            alert('Số điện thoại không tồn tại!');
          }
        },
        error: (err) => {
          this.errorMessage = err;
          alert('Lỗi trong quá trình gửi mã!');
        }
      });
    }
  }

  checkPhoneNumber(): void {
    const phoneNumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/; // kiểm tra chuỗi đã nhập là số điện thoại hợp lệ không?

    if (this.phoneNumber.trim().length === 0) {
      // Nếu giá trị của phoneNumber là chuỗi rỗng hoặc không chứa ký tự nào thì bỏ qua kiểm tra
      this.isPhoneNumberValid = true;
    } else {
      // Nếu giá trị của phoneNumber chứa ký tự, kiểm tra số điện thoại hợp lệ
      this.isPhoneNumberValid = phoneNumberRegex.test(this.phoneNumber);
    }
  }

  //kiểm tra mã xác nhận
  verificationCode: string = '';
  isVerificationCodeValid: boolean = true;

  checkVerificationCode() {
    if (this.verificationCode.trim().length === 0) {
      this.isVerificationCodeValid = true;
    } else
      if (this.verificationCode === '666666') {
        this.isVerificationCodeValid = true;
      } else {
        this.isVerificationCodeValid = false;
      }
  }

  onComplete(event: Event) {
    event.preventDefault();
    if (!this.isPhoneNumberValid || !this.isVerificationCodeValid) {
      alert('Vui lòng nhập đúng số điện thoại và mã xác nhận!');
      return;
    }
    this.accountService.checkPhoneNumberExist(this.phoneNumber).subscribe({
      next: (data) => {
        this.phoneNumbers = data;
        if (this.phoneNumbers.phonenumber == this.phoneNumber) {
          this.router.navigate(['/app-reset-password']);
        } else {
          alert('Số điện thoại không tồn tại!');
        }
      },
      error: (err) => {
        this.errorMessage = err;
        alert('Lỗi trong quá trình kiểm tra số điện thoại!');
      },
    });
  }
}
