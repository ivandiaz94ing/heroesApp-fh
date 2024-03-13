import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroservice: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){}

    ngOnInit(): void {
        if (!this.router.url.includes('edit') )  return;

        this.activatedRoute.params
        .pipe(
          switchMap( ( { id } ) => this.heroservice.getHeroesById(id) ),
        ).subscribe(hero =>{
          if(!hero) return this.router.navigateByUrl('/');

          this.heroForm.reset(hero);
          return;
        });
    }


  public heroForm = new FormGroup({

    id:                        new FormControl<string>(''),
    superhero:           new FormControl<string>('', {nonNullable: true}),
    publisher:             new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:             new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:           new FormControl<string>(''),
    alt_img:                new FormControl<string>(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroservice.updateHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar
        this.showSnackbar(`${this.currentHero.superhero} updated!`);
      });
      return;
    }
    this.heroservice.addHero(this.currentHero)
    .subscribe(hero =>  {
      //TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
      this.router.navigateByUrl('/heroes/list');
      this.showSnackbar(`${hero.superhero} created!`);
    })
    // this.heroservice.updateHero(this.heroForm.value);
  }

  onConfirmDelete():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({result});
    });

  }

  showSnackbar(message: string):void{
    this.router.navigateByUrl('/heroes/list');
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }

}
