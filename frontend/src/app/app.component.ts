import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-angular';

  constructor(private router: Router) {}

  // Método para navegação
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}


