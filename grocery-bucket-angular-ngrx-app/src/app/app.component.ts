import { Component } from '@angular/core';
import { BucketComponent } from './components/bucket/bucket.component';
import { GroceryComponent } from './components/grocery/grocery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BucketComponent,GroceryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project_01';
}
