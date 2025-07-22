import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedOptionCounter',
})
/**
 * selectedOptionCounter is used to return first selected option and count of the rest options
 * @param selectedOptions list of selected options
 * @param availableOptions all available options
 * @returns
 */
export class SelectedOptionCounter implements PipeTransform {
  transform(selectedOptions: any[], availableOptions?: any[], allText?: string): string {
  if (
    !Array.isArray(selectedOptions) ||
    !Array.isArray(availableOptions) ||
    availableOptions.length === 0
  ) {
    return '';
  }

  const validSelected = selectedOptions.filter((opt) => opt !== null);
  const selectedCount = validSelected.length;

  if (selectedCount === 0) {
    return '';
  }

  if (selectedCount === availableOptions.length) {
    return allText ? allText : 'All';
  }

  const firstSelectedKey = validSelected[0];
  const firstOption = availableOptions.find(
    (opt) => opt.key === firstSelectedKey
  );
  const firstOptionValue = firstOption ? firstOption.value : '';

  if (selectedCount === 1) {
    return firstOptionValue;
  } else {
    return `${firstOptionValue} + ${selectedCount - 1}`;
  }
}
}
