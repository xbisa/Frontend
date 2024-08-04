import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Division } from '../interfaces/Division';

@Component({
  selector: 'app-company-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './company-add.component.html',
})
export class CompanyAddComponent {
  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    divisionId: [0, [Validators.required, Validators.min(1)]],
    numberOfProperties: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    numberOfNotListedUnits: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    numberOfAvailableUnits: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    numberOfInProgressUnits: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    numberOfActiveUnits: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
  });

  divisions = input.required<Array<Division>>();

  submitted = output<{
    name: string,
    divisionId: number,
    numberOfProperties: number,
    numberOfNotListedUnits: number,
    numberOfAvailableUnits: number,
    numberOfInProgressUnits: number,
    numberOfActiveUnits: number
  }>();

  submit() {
      this.submitted.emit(this.form.getRawValue());
      this.form.reset();
  }
}
