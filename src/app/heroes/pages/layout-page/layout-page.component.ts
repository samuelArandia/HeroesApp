import { Component } from '@angular/core';

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

}
