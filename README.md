# MyProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Description of solution

## Tools
- WebStorm
- Angular 18.1.0
- Angular Material
- Tailwind css

## Structure

### components
The solution features two custom standalone components in addition to the standalone root component.

#### companies component
The companies component template includes an Angular Material Table to display the companies, featuring support for 
deletion and pagination. The page size is set as an environment property. Signals manage the table and pagination state.

As a smart component, the companies-component handles state management and interacts with repositories/services, while 
the company-add component is a dumb component that emits events to the companies component.

#### company-add child component to companies
The company-add-component consists of a reactive form, an output field to emit form data, and an input field to accept 
the divisions array from the parent component.

### Repositories / Services
The solution includes two repositories: one for companies and another for divisions.

The frontend repositories connect to the backend API controllers/endpoints.

#### CompaniesService
The companies repository supports CRUD operations and includes a getAll method that handles skipping/offset 
and page size/limit. 

#### DivisionsService
In contrast, the divisions repository only supports fetching all divisions. This implementation 
is designed to meet the requirements.

### routes
Empty path '' matches companies component

### environments
The environments configuration includes two properties: apiUrl and pageSize. These properties are 
included to facilitate building for different environments where their values may vary.

### interfaces
The interfaces are structured to match the backend models, ensuring strongly typed results. However, this 
introduces extra work and necessitates keeping the backend models and frontend interfaces consistent. 
In a purely JavaScript environment, I typically address this issue by using a shared package.

### Tailwind
I was able to install Tailwind CSS via npm, but due to my lack of experience with Tailwind and the  
timeframe of the coding test, I didn’t manage to get it working.
