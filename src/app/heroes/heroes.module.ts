import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { HeroesRoutingModule     } from './heroes-routing.module';
import { MaterialModule          } from '../material/material.module';
import { HeroImgPipe             } from './pipes/hero-img.pipe';
import { ReactiveFormsModule     } from '@angular/forms';

import { CardComponent           } from './components/card/card.component';
import { ConfirmDialogComponent  } from './components/confirm-dialog/confirm-dialog.component';
import { HeroPageComponent       } from './pages/hero-page/hero-page.component';
import { ListPageComponent       } from './pages/list-page/list-page.component';
import { SearchPageComponent     } from './pages/search-page/search-page.component';
import { NewHeroPageComponent    } from './pages/new-hero-page/new-hero-page.component';
import { LayoutHeroPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    LayoutHeroPageComponent,
    NewHeroPageComponent,
    SearchPageComponent,
    ListPageComponent,
    HeroPageComponent,
    CardComponent,
    HeroImgPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
