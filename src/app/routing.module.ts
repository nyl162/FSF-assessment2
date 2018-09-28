import { BrowserModule } from "@angular/platform-browser";
import {RouterModule, Routes} from '@angular/router'
import { NgModule } from "@angular/core";
import { SearchLibraryComponent } from "./search-library/search-library.component";
import { SearchLibrarybyIDComponent } from "./search-libraryby-id/search-libraryby-id.component";


const appRoutes :Routes = [

    {path: '' , component: SearchLibraryComponent},
    {path: 'ID/:id' , component: SearchLibrarybyIDComponent},
    {path: 'searchID' , component: SearchLibrarybyIDComponent},
    {path: '**' , redirectTo: '/', pathMatch: 'full'}

];



@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
  })

export class RoutingModule {}