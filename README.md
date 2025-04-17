# Gerenciador de Funcionários - Frontend Angular

![Angular](https://img.shields.io/badge/Angular-17.3.11-red?style=flat&logo=angular)

Este projeto é o frontend Angular para o sistema de gerenciamento de funcionários e departamentos, desenvolvido para integrar com a API .NET Core.

## ✨ Recursos

- **Gerenciamento de Departamentos**
  - Listagem, criação, edição e exclusão
  - Visualização detalhada
- **Gerenciamento de Funcionários**
  - Cadastro com upload de foto
  - Associação a departamentos
  - Filtragem por departamento
- **Interface Responsiva**
  - Adaptável para diferentes tamanhos de tela
- **Integração com API REST**
  - Comunicação com backend .NET Core

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Angular CLI (versão 17.x)
- API backend em execução (confira o repositório da API)

### Instalação

1. Clone o repositório
   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure a API
   - Edite o arquivo `src/environments/environment.ts` para apontar para sua API:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:5001/api' // URL da sua API
   };
   ```

## 🛠 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `ng serve` | Inicia o servidor de desenvolvimento em `http://localhost:4200/` |
| `ng build` | Compila o projeto para produção na pasta `dist/` |
| `ng test` | Executa testes unitários via Karma |
| `ng e2e` | Executa testes end-to-end (requer configuração adicional) |
| `ng generate component nome-do-componente` | Cria um novo componente |

## 🌐 Integração com a API

O frontend consome os seguintes endpoints da API:

- **Departamentos**
  - `GET /api/Departamento`
  - `POST /api/Departamento`
  - `PUT /api/Departamento/{id}`
  - `DELETE /api/Departamento/{id}`

- **Funcionários**
  - `GET /api/Funcionario`
  - `POST /api/Funcionario`
  - `PUT /api/Funcionario/{id}`
  - `DELETE /api/Funcionario/{id}`
  - `POST /api/Funcionario/upload` (upload de fotos)



## 🤝 Contribuição

Contribuições são bem-vindas!Sinta-se à vontade para abrir issues ou pull requests com melhorias ou correções.

------------------------

# Projeto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
