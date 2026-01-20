import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 1. IMPORTAR AQUI

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout-component.html',
  styleUrls: ['./main-layout-component.css']
})
export class MainLayoutComponent {
}
