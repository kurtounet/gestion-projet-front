import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  dialService = inject(DialogService);

  confirm() {
    this.dialService.close('yes');
  }

  cancel() {
    this.dialService.close('no');
  }

  close() {
    this.dialService.close(null);
  }
}
