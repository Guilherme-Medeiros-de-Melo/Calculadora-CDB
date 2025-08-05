import { Component, output } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { InvestmentService } from './investment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserInputComponent, ResultTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
