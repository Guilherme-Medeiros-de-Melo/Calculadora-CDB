import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestimentData } from './user-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  valorInicial: number = 1000;
  aplicacaoMensal: number = 100;
  tempo: number = 12;
  selic: number = 14.5;
  rendimentoCdi: number = 120;

  constructor(private investmentService: InvestmentService) {}

  calculate = output<InvestimentData>();

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      valorInicial: this.valorInicial,
      aplicacaoMensal: this.aplicacaoMensal,
      tempo: this.tempo,
      selic: this.selic,
      rendimentoCdi: this.rendimentoCdi,
    });
  }
}
