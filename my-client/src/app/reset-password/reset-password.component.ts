import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../SERVICES/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  passwordChanged: boolean = false;
  Form!: FormGroup;
  phonenumber: string = '';

  @ViewChild('passwordInput') passwordInput: any;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.route.queryParams.subscribe(params => {
      this.phonenumber = params['phonenumber'];
    });

    this.password = '';
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('pwd')?.value;
    const confirmPassword = group.get('confirmPwd')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onChecked() {
    const passwordInput = this.passwordInput.nativeElement;
    if (this.password.trim().length === 0) {
      this.passwordInput.value = true;
      return;
    } else if (this.password.length < 6) {
      alert('Mật khẩu phải từ 6 kí tự trở lên');
      this.passwordChanged = false;
      return;
    }
    this.passwordChanged = true;
  }

  checkPasswordsMatch() {
    const passwordInput = this.passwordInput.nativeElement;
    const confirmPasswordInput = this.confirmPasswordInput.nativeElement;

    if (this.confirmPassword.trim().length === 0) {
      this.confirmPasswordInput.value = true;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Mật khẩu không khớp');
      this.passwordChanged = false;
      return;
    }
    this.passwordChanged = true;
  }

  onSubmit() {
    if (!this.Form.valid || !this.passwordChanged) {
      return;
    }
    const newPassword = this.password;
    this.authService
      .changePassword(this.phonenumber, '', newPassword)
      .then((message: any) => {
        this.authService.setCookie('password', newPassword, 30);
        alert(message);
        
        this.router.navigate(['/reset-password-success']);
      })
      .catch((error: any) => {
        console.error(error);
        alert('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.');
      });
      // Kiểm tra xem mật khẩu đã được thay đổi thành công hay chưa
    if (this.passwordChanged) {
      alert('Đổi mật khẩu thành công');
    }
  }
}
