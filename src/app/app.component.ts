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

    this.essentialsLog();

    const initialValue = this.grossValue;
      let appliedValue = this.grossValue;
      let grossValue;
      let grossNetValue;
      let taxValue;
      let netValue;
      let netValuePercentage;

    for (let month = 1; month <= this.months; month++) {
      const initialValue = this.grossValue;

      appliedValue += this.grossValue + this.monthlyInvestment;
      grossValue = appliedValue + appliedValue * this.monthlyReturnRate;
      grossNetValue = grossValue - appliedValue;
      taxValue = grossNetValue * this.taxRate;
      netValue = grossNetValue - taxValue;
      netValuePercentage = netValue / appliedValue;

      if (month % 12 === 0 || month === this.months)  {
        this.investmentReturns.push({
          appliedValue: appliedValue,
          grossValue: grossValue,
          taxValue: taxValue,
          netValue: netValue,
          netValuePercentage: netValuePercentage,
        });
      }

      this.grossValue = appliedValue;
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

  essentialsLog() {
    console.log(this.years + ' Years');
    console.log(this.months + ' Months');
    console.log(this.taxRate + ' taxRate');
    console.log(this.monthlyInvestment + ' monthInvest');
    console.log(this.yearlyReturnRate + ' yearReturn');
    console.log(this.grossValue + ' grossValue');
  }
}
