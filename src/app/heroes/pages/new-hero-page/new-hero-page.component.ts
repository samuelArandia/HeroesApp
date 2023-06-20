import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent implements OnInit{

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) { }

  public heroForm =   new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true} ),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  })

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id) ),
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigate(['/']);
        this.heroForm.reset( hero );
        return;
      })
  }

  public publishers = [
    {id: 'DC Comics', name: 'DC - Comics'},
    {id: 'Marvel Comics', name: 'Marvel - Comics'}
  ]

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero =>  {
          this.showSnackBar(`${hero.superhero} is updated!`);
        })
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} is created!`);
      }
    )
  }

  onDeleteConfirmHero(): void {
    if ( !this.currentHero.id ) throw Error('No hero to delete');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ),
        filter( (wasDelete: boolean) => wasDelete)
      )
      .subscribe( () => {
        this.showSnackBar(`${this.currentHero.superhero} is deleted!`);
        this.router.navigateByUrl('/heroes/list');
      });


    // dialogRef.afterClosed()
    //   .subscribe(result => {
    //     if ( !result ) return;

    //     this.heroesService.deleteHeroById( this.currentHero.id )
    //     .subscribe( wasDelete=> {
    //       if ( wasDelete ) {
    //         this.showSnackBar(`${this.currentHero.superhero} is deleted!`);
    //         this.router.navigateByUrl('/');
    //       }
    //   });
    // });
  }

  showSnackBar( message: string ) {
    this.snackBar.open( message, 'Ok!', {
      duration: 2500,
    });
  }

}
