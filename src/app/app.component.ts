import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ResultTableComponent } from './result-table/result-table.component';
import {
  InvestimentData,
  YearlyInvestmentReturns,
} from './user-input/user-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserInputComponent, ResultTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  years!: number;
  months!: number;
  grossValue!: number;
  netValue!: number;
  yearlyInvestment!: number;
  taxRate!: number;
  totalTax!: number;
  yearlyReturnRate!: number;

  investmentReturns!: YearlyInvestmentReturns[];

  onCalculateInvestmentResults(investmentData: InvestimentData) {
    this.essentialsLog();
    
    this.taxRate = this.calculateTaxRate(investmentData.tempo);

    this.yearlyReturnRate = investmentData.selic * (investmentData.rendimentoCdi / 100);
    this.grossValue = investmentData.valorInicial;
    this.yearlyInvestment = investmentData.aplicacaoAnual;
    this.years = Math.floor(investmentData.tempo / 12);
    this.months = investmentData.tempo % 12;

    const appliedValue = this.grossValue + this.yearlyInvestment;
    const grossValue = appliedValue * this.yearlyReturnRate;
    const taxValue = appliedValue * this.taxRate;
    const netValue = grossValue - taxValue;
    const netValuePercentage = (netValue - appliedValue) / appliedValue;

    for (let year = 0; year <= this.years; year++) {
      this.investmentReturns.push({
        appliedValue: appliedValue,
        grossValue: grossValue,
        taxValue: taxValue,
        netValue: netValue,
        netValuePercentage: netValuePercentage,
      });
    }
  }

  calculateTaxRate(tempo: number) {
    if (tempo <= 6) {
      return 0.225;
    } else if (tempo <= 12) {
      return 0.2;
    } else if (tempo <= 24) {
      return 0.175;
    } else {
      return 0.15;
    }
  }

  essentialsLog(){
    console.log(this.years);
    console.log(this.months);
    console.log(this.taxRate);
    console.log(this.yearlyInvestment);
    console.log(this.yearlyReturnRate);
    console.log(this.grossValue);
  }
}
