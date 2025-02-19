import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  // Definindo diretamente a URL da API
  private apiUrl = 'http://localhost:5232/api/Departamento';  // URL da sua API

  constructor(private http: HttpClient) { }

  // Método para obter todos os departamentos
  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para adicionar um novo departamento
  addDepartamento(departamento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, departamento);
  }

  // Método para editar um departamento existente
  updateDepartamento(id: number, departamento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, departamento);
  }

  // Método para excluir um departamento
  deleteDepartamento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
