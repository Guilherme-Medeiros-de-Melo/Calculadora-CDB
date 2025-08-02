import { Component } from '@angular/core';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css',
})
export class ResultTableComponent {
  investmentYears = [1, 2, 3, 4, 5];
  
  onCalculateInvestmentResults(){
    
  }
}
