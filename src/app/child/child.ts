import { Component, inject, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child implements OnInit {

  ngOnInit(): void {


  }

  userService = inject(User)


}
