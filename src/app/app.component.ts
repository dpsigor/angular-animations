import {
  Component,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)',
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(300px)',
      })),
      // transition('normal => highlighted', animate('1s 200ms')),
      // transition('highlighted => normal', animate('2s 200ms')),
      transition('highlighted <=> normal', animate('1s')),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)',
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(300px) scale(1)',
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)',
      })),
      transition('highlighted => normal', animate(300)),
      transition('normal => highlighted', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange',
        }),
        animate(200, style({
          borderRadius: '50px',
        })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state('in', style({ // "in" é dummy state name, porque partimos de void
        opacity: 1,
        transform: 'translateX(0)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }), // é o estado inicial
        animate(300),
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0,
        })), // após remover do DOM
      ]),
    ]),
    trigger('list2', [
      state('in', style({ // "in" é dummy state name, porque partimos de void
        opacity: 1,
        transform: 'translateX(0)',
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0, // Por padrão, cada keyframe tem a mesma duração. Offset muda isso
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3,
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8,
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1,
          }),
        ]))
      ]),
      transition('* => void', [
        group([
          animate(500, style({
            color: 'red',
          })),
          animate(1000, style({
            transform: 'translateX(100px)',
            opacity: 0,
          })), // após remover do DOM
        ]), // group faz com que os animate acontecam ao mesmo tempo
      ]),
    ]),
  ],
})
export class AppComponent {
  list: string[] = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(idx: number) {
    this.list.splice(idx, 1);
  }

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  // Callbacks das animações
  animationStarted(e: any) {
    console.log(e);
  }

  animationEnded(e: any) {
    console.log(e);
  }

}
