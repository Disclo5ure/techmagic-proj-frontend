import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
  pure: true,
})
export class SortByDatePipe implements PipeTransform {
  transform<T extends { startDate: string | Date }>(
    array: T[] | null | undefined,
    order: 'asc' | 'desc' = 'asc',
  ): T[] {
    if (!Array.isArray(array)) {
      return [];
    }

    return array.slice().sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
