
import { GridColumnConfig, SortConfig, FilterConfig } from '@/types/smartGrid';

export function processGridData(
  gridData: any[],
  globalFilter: string,
  filters: FilterConfig[],
  sort: SortConfig | undefined,
  columns: GridColumnConfig[],
  onDataFetch?: any
) {
  if (onDataFetch) {
    // For lazy loading, return data as-is (sorting/filtering handled server-side)
    return gridData;
  }

  let result = [...gridData];

  // Apply global filter - now searches ALL columns including hidden ones
  if (globalFilter) {
    result = result.filter(row =>
      columns.some(col => {
        let value = row[col.key];
        
        // Handle status fields that are objects with value property
        if (value && typeof value === 'object' && 'value' in value) {
          value = value.value;
        }
        
        return String(value || '').toLowerCase().includes(globalFilter.toLowerCase());
      })
    );
  }

  // Apply column filters
  if (filters.length > 0) {
    result = result.filter(row => {
      return filters.every(filter => {
        let value = row[filter.column];
        
        // Handle status fields that are objects with value property
        if (value && typeof value === 'object' && 'value' in value) {
          value = value.value;
        }
        
        const filterValue = filter.value;
        const operator = filter.operator || 'contains';

        if (value == null) return false;

        const stringValue = String(value).toLowerCase();
        const stringFilter = String(filterValue).toLowerCase();

        switch (operator) {
          case 'equals':
            return stringValue === stringFilter;
          case 'contains':
            return stringValue.includes(stringFilter);
          case 'startsWith':
            return stringValue.startsWith(stringFilter);
          case 'endsWith':
            return stringValue.endsWith(stringFilter);
          case 'gt':
            return Number(value) > Number(filterValue);
          case 'lt':
            return Number(value) < Number(filterValue);
          case 'gte':
            return Number(value) >= Number(filterValue);
          case 'lte':
            return Number(value) <= Number(filterValue);
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sort) {
    result.sort((a, b) => {
      let aValue = a[sort.column];
      let bValue = b[sort.column];
      
      // Handle status fields that are objects with value property
      if (aValue && typeof aValue === 'object' && 'value' in aValue) {
        aValue = aValue.value;
      }
      if (bValue && typeof bValue === 'object' && 'value' in bValue) {
        bValue = bValue.value;
      }
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }

  return result;
}
