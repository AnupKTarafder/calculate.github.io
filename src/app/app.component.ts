import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CommonService} from "./common.service";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrl: './app.component.css'
})
export class AppComponent {
  textControl = new FormControl('');

  constructor(private readonly commonService: CommonService) {
  }

  onSubmit(values: { item: string; price: string }[], arr: number[], addTotalLines: boolean) {
    let resStr = '';
    for (const value of values) {
      const {item, price} = value;
      if (!item) continue;
      resStr += `${item.trim()} ${price.replace('।', '.')}\n`;
    }
    if (addTotalLines) {
      resStr += `________________\nমোট ` + String(this.commonService.enToBnNumber(arr.reduce((a, b) => a + b, 0).toFixed(2)))
    }
    navigator.clipboard.writeText(resStr).then();
  }

  calculateTotals() {
    const lines = this.textControl.value!.split('\n');
    const prices = lines.map(line => this.commonService.bnToEnNumber(line.split(' ').pop()));
    const total = prices.filter(t => typeof t === "number").reduce((a, b) => a + b, 0)?.toFixed(2);
    navigator.clipboard.writeText(
      `________________\nমোট ${String(this.commonService.enToBnNumber(total))}`
    ).then();
  }
}
