import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../_services/funcionario.service';
import { DepartamentoService } from '../../_services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  funcionarios: any[] = [];
  departamentos: any[] = [];
  funcionariosFiltrados: any[] = [];
  searchTerm: string = '';
  funcionarioSelecionado: any = null;
  departamentoId: number | null = null;
  departamentoNome: string | null = null;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.departamentoId = +params['id'];
        this.departamentoNome = params['nome'];
        this.loadFuncionariosByDepartamento(this.departamentoId);
      } else {
        this.loadFuncionarios();
      }
    });
  }

  loadFuncionariosByDepartamento(departamentoId: number): void {
    this.funcionarioService.getFuncionariosByDepartamento(departamentoId).subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.funcionariosFiltrados = data; // Importante: atualizar também funcionariosFiltrados
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários do departamento', error);
      }
    });
  }

  loadFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.funcionariosFiltrados = data; // Inicializa os funcionários filtrados
      },
      error: (error) => {
        console.error('Erro ao carregar todos os funcionários', error);
      },
    });
  }

  getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos', error);
      },
    });
  }

  filterFuncionarios(): void {
    if (this.searchTerm.length >= 2) {
      this.funcionariosFiltrados = this.funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.funcionariosFiltrados = this.funcionarios;
    }
  }

  // Redireciona para a página de "novo-funcionario" (criação ou edição)
  redirectToFuncionarioPage(funcionario?: any): void {
    if (funcionario) {
      // Redireciona para a página de edição do funcionário
      this.router.navigate(['/novo-funcionario'], { state: { funcionario } });
    } else {
      // Redireciona para a página de criação de um novo funcionário
      this.router.navigate(['/novo-funcionario']);
    }
  }

  // Exclui um funcionário
  deleteFuncionario(id: number): void {
    this.funcionarioService.deleteFuncionario(id).subscribe({
      next: () => {
        if (this.departamentoId) {
          this.loadFuncionariosByDepartamento(this.departamentoId);
        } else {
          this.loadFuncionarios();
        }
      },
      error: (error) => {
        console.error('Erro ao excluir funcionário', error);
      }
    });
  }
}
