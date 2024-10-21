import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'] 
})
export class AsideComponent {

  constructor(private router: Router) { }

  IrAGraficos():void{
    console.log("ir a graficos");
    this.router.navigate(['/graficos']);
   }

}
