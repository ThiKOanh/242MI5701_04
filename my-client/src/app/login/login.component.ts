import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountcustomerService } from '../SERVICES/accountcustomer.service';
import { AuthService } from '../SERVICES/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phonenumber: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isPhoneNumberValid: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private accountService: AccountcustomerService
  ) {}

  checkPhoneNumber(): void {
    const phonenumberRegex = /^(\+84|0)[1-9][0-9]{7,8}$/; // Kiểm tra số điện thoại có hợp lệ không
    this.isPhoneNumberValid = phonenumberRegex.test(this.phonenumber);
  }

  ngOnInit() {
    // Nếu số điện thoại, mật khẩu đã tồn tại thì sử dụng lại thông tin đăng nhập
    const phonenumber = this.authService.getCookie('phonenumber');
    const password = this.authService.getCookie('password');
    if (phonenumber && password) {
      this.phonenumber = phonenumber;
      this.password = password;
      this.rememberMe = true;
    }
  }

  onSubmit() {
    if (!this.isPhoneNumberValid) {
      alert('Vui lòng nhập đúng số điện thoại');
      return;
    } else {
      this.authService.login(this.phonenumber, this.password).subscribe(
        (user) => {
          // Đăng nhập thành công, chuyển hướng đến trang chính
          this.authService.setCurrentUser(user);

          // Kiểm tra xem người dùng đã đặt mật khẩu mới thành công chưa
          this.accountService.checkPasswordResetSuccess(this.phonenumber).subscribe({
            next: (data) => {
              const passwordResetSuccess = data.success;

              if (passwordResetSuccess) {
                this.authService.setCookie('phonenumber', this.phonenumber, 30);
                this.authService.setCookie('password', this.password, 30);
              }
            }
          });

          // Lưu tên đăng nhập và mật khẩu nếu người dùng chọn "Ghi nhớ mật khẩu"
          if (this.rememberMe) {
            this.authService.setCookie('phonenumber', this.phonenumber, 30);
            this.authService.setCookie('password', this.password, 30);
          } else {
            this.authService.deleteCookie('phonenumber');
            this.authService.deleteCookie('password');
          }

          alert('Đăng nhập thành công!');
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        (error) => {
          // Thông báo lỗi
          alert('Đăng nhập không thành công!');
        }
      );
    }
  }
}
