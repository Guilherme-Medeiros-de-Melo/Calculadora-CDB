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
  monthlyInvestment!: number;
  taxRate!: number;
  totalTax!: number;
  yearlyReturnRate!: number;
  monthlyReturnRate!: number;

  investmentReturns: YearlyInvestmentReturns[] = [];

  onCalculateInvestmentResults(investmentData: InvestimentData) {
    this.taxRate = this.calculateTaxRate(investmentData.tempo);

    this.formatInvestmentData(investmentData);

    let originalAppliedValue = this.grossValue + this.monthlyInvestment;
    let thisMonthTotal = this.grossValue;
    let grossValue = 0;
    let grossNetValue = 0;
    let taxValue = 0;
    let totalTaxValue = 0;
    let netValue = 0;

    for (let month = 1; month <= this.months; month++) {
      if (month != 1) {
        originalAppliedValue += this.monthlyInvestment;
      }

      thisMonthTotal += this.monthlyInvestment;

      grossValue = thisMonthTotal * (1 + this.monthlyReturnRate);
      grossNetValue = grossValue - thisMonthTotal;
      
      taxValue = grossNetValue * this.taxRate;
      totalTaxValue += taxValue;
      netValue = grossNetValue - taxValue;

      thisMonthTotal += netValue;

      if (month % 12 == 0 || month == this.months) {
        this.investmentReturns.push({
          appliedValue: originalAppliedValue,
          grossValue: grossValue,
          taxValue: totalTaxValue,
          netValue: thisMonthTotal - originalAppliedValue,
          netValuePercentage: (thisMonthTotal / originalAppliedValue) * 10,
        });
      }
    }

    console.log(this.investmentReturns);
  }

  private formatInvestmentData(investmentData: InvestimentData) {
    this.monthlyReturnRate =
      (investmentData.selic * (investmentData.rendimentoCdi / 100)) / 100 / 12;
    this.grossValue = investmentData.valorInicial;
    this.monthlyInvestment = investmentData.aplicacaoMensal;
    this.years = Math.floor(investmentData.tempo / 12);
    this.months = investmentData.tempo;
  }

  calculateTaxRate(tempo: number): number {
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
}
