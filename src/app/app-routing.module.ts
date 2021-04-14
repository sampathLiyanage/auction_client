import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { BiddingComponent } from './bidding/bidding.component';

const routes: Routes = [
  {path: '', component: ItemListComponent},
  {path: 'items/:id', component: BiddingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
