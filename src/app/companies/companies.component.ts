import { AfterViewInit, Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { CompaniesService } from '../repositories/companies.service';
import { injectDestroy } from '../unsubscribe-utilities';
import { combineLatest, switchMap, takeUntil } from 'rxjs';
import { Company } from '../interfaces/Company';
import { DivisionsService } from '../repositories/divisions.service';
import { PagedResponse } from '../interfaces/paged-results';
import { Division } from '../interfaces/Division';
import { CompanyAddComponent } from '../company-add/company-add.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle, MatPaginator, MatTable, MatProgressSpinner, DatePipe, MatColumnDef, MatSort, MatHeaderCell, MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatCell, MatHeaderRow, MatRow, CompanyAddComponent],
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'divisionId', 'numberOfProperties', 'numberOfNotListedUnits', 'numberOfAvailableUnits', 'numberOfInProgressUnits', 'numberOfActiveUnits', 'createdAt', 'delete'];
  data = signal<Array<Company>>([])
  length = signal<number>(0)
  divisions = signal<Array<Division>>([]);
  divisionsMap = computed(() => new Map(this.divisions().map((division) => [division.id, division])));
  showAddCompanyForm = signal(false);
  paginator = viewChild<MatPaginator>(MatPaginator);
  pageSize = environment.pageSize;
  private companiesRepo = inject(CompaniesService);
  private divisionsRepo = inject(DivisionsService);
  private destroy$ = injectDestroy();

  ngAfterViewInit(): void {
    this.paginator()?.page.pipe(
      switchMap(() => {
        return this.companiesRepo.getAll({ pageSize: this.pageSize, skip: (this.paginator()?.pageIndex || 0) * this.pageSize })
      }),
      takeUntil(this.destroy$),
    ).subscribe({
      next: (data) => {
        this.data.set(data.data)
      },
    })
  }

  ngOnInit(): void {
    combineLatest([this.companiesRepo.getAll({ pageSize: this.pageSize }), this.divisionsRepo.getAll()])
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe({
      next: (data: [PagedResponse<Company>, Division[]]) => {
        const [companiesPagedResponse, divisions] = data;
        this.data.set(companiesPagedResponse.data)
        this.length.set(companiesPagedResponse.meta.totalCount);
        this.divisions.set(divisions);
      },
    });
  }

  delete(id: number) {
    this.companiesRepo.delete(id).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: () => {
        this.data.update((data) => data.filter((element) => element.id !== id));
        this.length.update((totalCount) => totalCount - 1);
      }
    })
  }

  toggle() {
    this.showAddCompanyForm.update((show) => !show)
  }

  addCompany(data: {
    name: string;
    divisionId: number;
    numberOfProperties: number;
    numberOfNotListedUnits: number;
    numberOfAvailableUnits: number;
    numberOfInProgressUnits: number;
    numberOfActiveUnits: number
  }) {
    this.companiesRepo.add({ ...data, createdBy: '' }).pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (companyData: Company) => {
        this.data.update((data) => [...data, companyData]);
        this.length.update((totalCount) => totalCount + 1);
        this.toggle();
      }
    })
  }
}
