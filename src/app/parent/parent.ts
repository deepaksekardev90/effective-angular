import { Component, inject, OnInit } from '@angular/core';
import { For } from '../examples/for/for';
import { Switch } from '../examples/switch/switch';
import { Defer } from '../examples/defer/defer';
import { DirectiveComposition } from '../examples/directive-composition/directive-composition';
import { User } from '../user';


@Component({
  selector: 'app-parent',
  imports: [For, Switch, Defer, DirectiveComposition],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent implements OnInit {

  userService = inject(User)

  ngOnInit(): void {
    this.userService.print()
  }
}
