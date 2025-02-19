import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../_services/departamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  departamentosFiltrados: any[] = [];
  searchTerm: string = '';

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  // Lógica existente para carregar os departamentos
  loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.departamentosFiltrados = data;
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos', error);
      },
      complete: () => {
        console.log('Requisição concluída');
      },
    });
  }

  filterDepartamentos(): void {
    if (this.searchTerm.length >= 2) {
      this.departamentosFiltrados = this.departamentos.filter(dep =>
        dep.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dep.sigla.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.departamentosFiltrados = this.departamentos;
    }
  }

  // Lógica existente para excluir departamentos
  deleteDepartamento(id: number): void {
    this.departamentoService.deleteDepartamento(id).subscribe({
      next: () => {
        this.departamentos = this.departamentos.filter(
          (dep) => dep.id !== id
        ); // Remover o departamento da lista
      },
      error: (error) => {
        console.error('Erro ao excluir departamento', error);
      },
      complete: () => {
        console.log('Departamento excluído com sucesso');
      },
    });
  }

   // Redireciona para a página de criação ou edição de departamento
   redirectToDepartamentoPage(departamento?: any): void {
    if (departamento) {
        // Envia os dados completos do departamento
        this.router.navigate(['/novo-departamento'], {
            state: { departamento: {
                id: departamento.id,
                nome: departamento.nome,
                sigla: departamento.sigla
            }}
        });
    } else {
        this.router.navigate(['/novo-departamento']);
    }
}

visualizarFuncionarios(departamento: any): void {
  this.router.navigate(['/funcionarios', departamento.id, departamento.nome]);
}

}
