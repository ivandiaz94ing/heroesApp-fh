import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero? : Hero;

  constructor(
    private heroesService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){ }


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      delay(1000),
      switchMap( ({ id }) => this.heroesService.getHeroesById(id) ),
    ).subscribe(hero => {
      if( !hero ) return this.router.navigate(['/heroes/list' ]);
      this.hero = hero;
      console.log(hero);
      return;
    })
  }

goBack():void{
  this.router.navigateByUrl('heroes/list');
}
}
