import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-view-tool-bar',
  imports: [],
  templateUrl: './view-tool-bar.component.html',
  styleUrl: './view-tool-bar.component.scss'
})
export class ViewToolBarComponent {
 title = input<string>('');
 quantity = input<number>(0);
 layoutList: boolean = true;
  toggleList() {
    this.layoutList = !this.layoutList
  }
}
