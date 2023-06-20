import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutHeroPageComponent {

  public sidebarItems = [
    { label: 'listado', icon: 'label', route: './list'},
    { label: 'Anadir', icon: 'add', route: './new-hero'},
    { label: 'Buscar', icon: 'search', route: './search'},
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get userInfo(): User | undefined{
    return this.authService.currentUser;
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
