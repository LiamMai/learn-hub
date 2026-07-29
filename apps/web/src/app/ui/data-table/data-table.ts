import { Component, TemplateRef, contentChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface DataTableColumn {
  label: string;
}

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet],
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-outline-variant">
            @for (col of columns(); track col.label) {
              <th class="py-3 px-4 text-xs font-bold uppercase text-outline">
                {{ col.label }}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr
              class="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors"
            >
              <ng-container
                [ngTemplateOutlet]="rowTemplate() ?? null"
                [ngTemplateOutletContext]="{ $implicit: row, index: $index }"
              />
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class DataTable<T> {
  readonly columns = input.required<DataTableColumn[]>();
  readonly rows = input.required<T[]>();
  readonly rowTemplate = contentChild<TemplateRef<{ $implicit: T; index: number }>>(
    'row',
  );
}
