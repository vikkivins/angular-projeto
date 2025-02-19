import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { NovoFuncionarioComponent } from './pages/novo-funcionario/novo-funcionario.component';
import { NovoDepartamentoComponent } from './pages/novo-departamento/novo-departamento.component';

const routes: Routes = [
  { path: '', component: DepartamentosComponent },
  { path: 'funcionarios/:id/:nome', component: FuncionariosComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'novo-funcionario', component: NovoFuncionarioComponent },
  { path: 'novo-departamento', component: NovoDepartamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
