import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = 'http://localhost:5232/api/Funcionario';  // URL da API de funcionários

  constructor(private http: HttpClient) { }

  // Método para obter todos os funcionários
  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFuncionariosByDepartamento(departamentoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departamento/${departamentoId}`);
  }

  // Método para adicionar um novo funcionário
  addFuncionario(funcionario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, funcionario);
  }

  uploadFoto(file: File, nomeFuncionario: string, departamentoSigla: string): Observable<any> {
    const formData = new FormData();
    formData.append('foto', file);
    formData.append('nomeFuncionario', nomeFuncionario);
    formData.append('departamentoSigla', departamentoSigla);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
}


  // Método para editar um funcionário existente
  updateFuncionario(id: number, funcionario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, funcionario);
  }

  // Método para excluir um funcionário
  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
