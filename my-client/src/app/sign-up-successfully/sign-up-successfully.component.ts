import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-successfully',
  templateUrl: './sign-up-successfully.component.html',
  styleUrls: ['./sign-up-successfully.component.css']
})
export class SignUpSuccessfullyComponent {
  redirectToHome() {
    window.location.href = "app-home";
  }
}
