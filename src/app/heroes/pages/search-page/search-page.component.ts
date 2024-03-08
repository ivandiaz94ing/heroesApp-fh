import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(
    private heroService: HeroService
  ){}

  public searchInput = new FormControl('');
  public heroes : Hero[] = [];
  public heroSeleccionado? : Hero;

  searchHero():void{
    const value = this.searchInput.value || '';

    this.heroService.getSuggestions(value)
    .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption( event : MatAutocompleteSelectedEvent):void{
    if(!event.option.value){
      this.heroSeleccionado= undefined;
      return;
    }

    const hero:Hero = event.option.value;
    this.heroSeleccionado = hero;
    this.searchInput.setValue(hero.superhero)


  }
}
