import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) { }

  onSubmit(): void {
    // Kiểm tra tài khoản và mật khẩu nhập vào có đúng hay không
    if (this.username === 'Beaurity Admin' && this.password === '68686868') {
      // Nếu đúng, chuyển hướng đến trang quản trị
      this.router.navigate(['admin-home']);
    } else {
      // Nếu sai, hiển thị thông báo lỗi
      this.error = 'Kiểm tra lại tên đăng nhập hoặc password';
    }
  }
}
