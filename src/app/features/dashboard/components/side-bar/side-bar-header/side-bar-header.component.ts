import { Component, computed, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-side-bar-header',
  imports: [],
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.scss'
})
export class SideBarHeaderComponent {
title = input<string>('');
isCollapsed = input<boolean>(false) ;
isMobile = input<boolean>(false) ;
stateSidebar = output<boolean>();

 toggleSidebar() {
   this.stateSidebar.emit(!this.isCollapsed());

 }
}
