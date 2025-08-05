import { Component, input } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css',
})
export class ResultTableComponent {
  constructor(private investmentService: InvestmentService) {}

  get results(){
    return this.investmentService.investmentReturns;
  }
}
