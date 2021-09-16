import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const onOff = trigger('onOff', [
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-100%)',
    }),
    animate(200),
  ]),
  transition('* => void', [
    animate(200, style({ transform: 'translateX(-100%)' })),
  ]),
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms', style({ opacity: 0 })),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('200ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('0ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);
