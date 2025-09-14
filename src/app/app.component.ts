import { Component } from '@angular/core';
import { ChangeDataComponent } from "./change-data/change-data.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChangeDataComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
