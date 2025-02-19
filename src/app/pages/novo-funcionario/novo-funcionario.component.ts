import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../_services/funcionario.service';
import { DepartamentoService } from '../../_services/departamento.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit {
  funcionario: any = {
    nome: '',
    rg: '',
    foto: '',
    departamentoId: null
  };
  departamentos: any[] = [];
  fotoPreview: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    // Carrega a lista de departamentos
    this.loadDepartamentos();

    // Verifica se há dados para edição
    const funcionarioEdit = history.state.funcionario;
    if (funcionarioEdit) {
      this.funcionario = { ...funcionarioEdit };
      this.isEditMode = true;
      if (this.funcionario.foto) {
        this.fotoPreview = 'http://localhost:5232' + this.funcionario.foto;
      }
    }
  }

  loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fotoPreview = URL.createObjectURL(file);

      const nomeFuncionario = this.funcionario.nome.replace(/\s+/g, '').toLowerCase();
      const departamentoSigla = this.departamentos.find(
        depto => depto.id === this.funcionario.departamentoId
      )?.sigla || '';

      this.funcionarioService.uploadFoto(file, nomeFuncionario, departamentoSigla).subscribe({
        next: (response) => {
          this.funcionario.foto = response.caminho || null;
        },
        error: (error) => {
          console.error('Erro ao enviar foto', error);
        }
      });
    } else {
      this.fotoPreview = null;
    }
  }

  saveFuncionario(event: Event): void {
    event.preventDefault();
    if (this.funcionario.nome && this.funcionario.rg && this.funcionario.departamentoId) {
      if (!this.funcionario.foto) {
        this.funcionario.foto = null;
      }

      if (this.isEditMode) {
        this.funcionarioService.updateFuncionario(this.funcionario.id, this.funcionario).subscribe({
          next: () => {
            this.router.navigate(['/funcionarios']);
          },
          error: (error) => {
            console.error('Erro ao atualizar funcionário', error);
          }
        });
      } else {
        this.funcionarioService.addFuncionario(this.funcionario).subscribe({
          next: () => {
            this.router.navigate(['/funcionarios']);
          },
          error: (error) => {
            console.error('Erro ao adicionar funcionário', error);
          }
        });
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/funcionarios']);
  }
}
