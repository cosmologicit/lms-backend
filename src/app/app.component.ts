import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      state('icon', style({
        width: '70px'
      })),
      state('full', style({
        width: '230px'
      })),
      transition('icon <=> full', animate('400ms ease-in-out'))
    ]),
    trigger('slideContent', [
      state('icon', style({
        marginLeft: '70px'
      })),
      state('full', style({
        marginLeft: '230px'
      })),
      transition('icon <=> full', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'lms-new';
  
}
