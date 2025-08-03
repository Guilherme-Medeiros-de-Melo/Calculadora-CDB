import { Component, output } from '@angular/core';
import { ResultTableComponent } from '../result-table/result-table.component';
import { FormsModule } from '@angular/forms';
import { InvestimentData } from './user-input.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, ResultTableComponent],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  valorInicial: number = 1000;
  aplicacaoMensal: number = 100;
  tempo: number = 12;
  selic: number = 14.5;
  rendimentoCdi: number = 120;

  calculate = output<InvestimentData>();

  onSubmit() {
    this.calculate.emit({
      valorInicial: this.valorInicial,
      aplicacaoMensal: this.aplicacaoMensal,
      tempo: this.tempo,
      selic: this.selic,
      rendimentoCdi: this.rendimentoCdi,
    });
  }
}
