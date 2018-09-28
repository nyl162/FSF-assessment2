import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatRadioModule} from "@angular/material/radio"
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatIconModule } from "@angular/material";
import {MatSliderModule} from '@angular/material/slider';

import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { PlatformModule } from "@angular/cdk/platform";
import { ObserversModule } from "@angular/cdk/observers";
import { FormsModule } from "@angular/forms";
//import { RoutingModule } from "./routing.module";

let MODULES = [
    MatToolbarModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatCardModule,MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,FlexLayoutModule,
    MatIconModule, MatSliderModule,
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    PlatformModule,
    ObserversModule,
    FormsModule,
    CommonModule//,
    //RoutingModule
  ];

@NgModule({
    imports: MODULES,
    exports: MODULES
  })
export class ImportModule { }
