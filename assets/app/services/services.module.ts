import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { ServicesComponent } from '../services/services.component';
import { FullServiceComponent } from '../services/full-service/full-service.component';
import { ServicesRoutingModule } from './services-routing.module';
import { TermsComponent } from '../terms/terms.component';
import { OilChangeComponent } from '../services/oil-change/oil-change.component';
import { CustomRepairsComponent } from '../services/custom-repairs/custom-repairs.component';
import { ElectricalRepairsComponent } from '../services/electrical-repairs/electrical-repairs.component';
import { HeatingComponent } from '../services/heating/heating.component';
import { BrakesComponent } from '../services/brakes/brakes.component';
import { InspectionsComponent } from '../services/inspections/inspections.component';
import { PinkslipsComponent } from '../services/pinkslips/pinkslips.component';
import { ServiceStartComponent } from '../services/service-start/service-start.component';

@NgModule({
  declarations: [
    ServicesComponent,
    FullServiceComponent,
    OilChangeComponent,
    CustomRepairsComponent,
    ElectricalRepairsComponent,
    HeatingComponent,
    BrakesComponent,
    InspectionsComponent,
    PinkslipsComponent,
    ServiceStartComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ServicesRoutingModule
  ],
  providers: [  ]
})
export class ServicesModule {}
