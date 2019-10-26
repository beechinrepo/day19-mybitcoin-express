import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';
import { ListComponent } from './components/list.component';
import { EditComponent } from './components/edit.component';

const ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'form/:orderType', component: FormComponent },
  { path: 'confirm/:orderId', component: ConfirmComponent },
  { path: 'edit/:orderId', component: EditComponent },
  { path: 'List', component: ListComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
