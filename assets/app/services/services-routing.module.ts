import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from '../services/services.component';
import { FullServiceComponent } from '../services/full-service/full-service.component';
import { TermsComponent } from '../terms/terms.component';
import { OilChangeComponent } from '../services/oil-change/oil-change.component';
import { CustomRepairsComponent } from '../services/custom-repairs/custom-repairs.component';
import { ElectricalRepairsComponent } from '../services/electrical-repairs/electrical-repairs.component';
import { HeatingComponent } from '../services/heating/heating.component';
import { BrakesComponent } from '../services/brakes/brakes.component';
import { InspectionsComponent } from '../services/inspections/inspections.component';
import { PinkslipsComponent } from '../services/pinkslips/pinkslips.component';
import { ServiceStartComponent } from '../services/service-start/service-start.component';

const servicesRoutes: Routes = [
  { path: '', component: ServicesComponent, children:[
    { path: '', component: ServiceStartComponent},
    { path: 'fullservice', component: FullServiceComponent},
    { path: 'oilchange', component: OilChangeComponent},
    { path: 'customrepairs', component: CustomRepairsComponent},
    { path: 'electricalrepairs', component: ElectricalRepairsComponent},
    { path: 'heating', component: HeatingComponent},
    { path: 'brakes', component: BrakesComponent},
    { path: 'inspections', component: InspectionsComponent},
    { path: 'pinkslips', component: PinkslipsComponent},
  ]},

];
@NgModule({
  imports: [
    RouterModule.forChild(servicesRoutes)
  ],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
