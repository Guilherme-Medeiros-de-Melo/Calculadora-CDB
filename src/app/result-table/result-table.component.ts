import { Component, input } from '@angular/core';
import { YearlyInvestmentReturns } from '../user-input/user-input.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css',
})
export class ResultTableComponent {
  investmentReturns = input.required<YearlyInvestmentReturns[]>();
  
  onBuildTable(investmentReturns: YearlyInvestmentReturns[]){
    console.log("Table built");
  }
}
