import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-for',
  imports: [],
  templateUrl: './for.html',
  styleUrl: './for.scss',
})
export class For {
  fruits = signal([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
  ]);
}
