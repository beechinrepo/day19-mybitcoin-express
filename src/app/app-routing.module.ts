import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';

const ROUTES: Routes = [
  { path: '', component: FormComponent },
  { path: 'home', component: FormComponent },
  { path: 'transact', component: FormComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],   
  exports: [RouterModule]
})
export class AppRoutingModule { }

// 