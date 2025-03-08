import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent {
  constructor(
    private router: Router
  ) { }

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

  resend() {
    alert('Đã gửi lại mã xác nhận!')
  }

  onComplete() {
    if (this.isVerificationCodeValid === false) {
      alert('Vui lòng nhập đúng mã xác nhận!');
      return false;
    }
    else if (this.verificationCode.trim().length === 0) {
      alert('Vui lòng nhập mã xác nhận!');
      return false;
    }
    else {
      this.router.navigate(['/app-sign-up-successfully']);
      return true
    }
  }
}
