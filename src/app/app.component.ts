import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ResultTableComponent } from './result-table/result-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserInputComponent, ResultTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
