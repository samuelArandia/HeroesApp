import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor( private heroesService: HeroesService ) { }

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public heroSelected?: Hero;

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe( heroes => this.heroes = heroes );

    console.log(this.heroes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    console.log(event.option.value);
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );
    this.heroSelected = hero;
  }

}
