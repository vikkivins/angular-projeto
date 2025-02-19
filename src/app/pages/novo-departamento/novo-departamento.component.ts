// novo-departamento.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../_services/departamento.service'; // Importando o serviço

@Component({
  selector: 'app-novo-departamento',
  templateUrl: './novo-departamento.component.html',
  styleUrls: ['./novo-departamento.component.css'],
})
export class NovoDepartamentoComponent implements OnInit {
  nome: string = '';
  sigla: string = '';
  id?: number;
  isEditMode: boolean = false;

  constructor(
    private router: Router, // Apenas o Router é necessário aqui
    private departamentoService: DepartamentoService // Injeta o serviço no componente
  ) {}

  ngOnInit(): void {
    // Verifica se há dados passados para edição (via state)
    const departamento = history.state.departamento;
    if (departamento) {
      this.nome = departamento.nome;
      this.sigla = departamento.sigla;
      this.id = departamento.id;
      this.isEditMode = true;
    }
  }

  // Função para salvar ou editar o departamento
  saveDepartamento(event: Event): void {
    event.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (this.nome && this.sigla) {
        const departamento = {
            id: this.id,
            nome: this.nome,
            sigla: this.sigla
        };

        if (this.isEditMode) {
            // Modo de edição
            this.departamentoService.updateDepartamento(this.id!, departamento).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    console.error('Erro ao atualizar departamento', error);
                }
            });
        } else {
            // Modo de criação
            this.departamentoService.addDepartamento(departamento).subscribe({
                next: () => {
                    this.router.navigate(['/']); // Corrigido o path
                },
                error: (error) => {
                    console.error('Erro ao adicionar departamento', error);
                }
            });
        }
    }
}

  // Função de cancelamento, que redireciona para a página de departamentos
  cancelar(): void {
    this.router.navigate(['/']);
  }
}
