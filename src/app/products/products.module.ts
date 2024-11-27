import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list/products-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductsRoutingModule } from './products-routing.module';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    NgxChartsModule ,
    ProductsRoutingModule,
    ChartModule,
    PaginatorModule
  ]
})
export class ProductsModule {}
