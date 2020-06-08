import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PessoasService } from './services/pessoas.service';
import { GeoService } from './services/geo.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    Geolocation,
    PessoasService,
    GeoService
  ],
  declarations: [Tab1Page, Geolocation],
  providers: [PessoasService, GeoService]
})
export class Tab1PageModule {}
