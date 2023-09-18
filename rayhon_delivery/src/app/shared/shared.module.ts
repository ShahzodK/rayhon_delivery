import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModalComponent } from './components/shared-modal/shared-modal.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SharedModalComponent,
    BottomNavigationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    CarouselModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    CarouselModule,
    NgxSkeletonLoaderModule,
    SharedModalComponent,
    BottomNavigationComponent,
    SearchComponent
  ]
})
export class SharedModule { }
