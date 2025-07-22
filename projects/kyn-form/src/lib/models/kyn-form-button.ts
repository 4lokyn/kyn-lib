import {MatButtonAppearance} from '@angular/material/button';

export interface KynFormButton {
  label: string;
  action: string;
  color?: 'primary' | 'accent' | 'secondary' | 'danger';
  style?: "" | MatButtonAppearance;
  disabled?: boolean;
}
