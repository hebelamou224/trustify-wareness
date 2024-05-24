import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'tf-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  login() {
    // Vérifiez les informations d'identification, par exemple, à partir d'un service d'authentification
    if (this.password === 'trustifytechnology') {
      // Si les informations d'identification sont correctes, redirigez l'utilisateur vers la page du quiz
      this.loginService.setName(this.username)
      this.router.navigate(['/revision']);
    } else {
      // Sinon, affichez un message d'erreur ou effectuez d'autres actions nécessaires
      alert('Le mot de passe est inccorect veuillez entrer trustifytechnology');
    }
  }

}
