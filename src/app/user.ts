import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  count = signal(10);
  double = computed(() => this.count() * 2);

  print() {
    console.log('Hello World!')
  }
}
