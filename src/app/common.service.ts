import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  bnToEnNumber(bnNumber: string | null | undefined): number | undefined  {
    if (!bnNumber) return undefined;
    return parseFloat(String(bnNumber)
      .replace(/[০১২৩৪৫৬৭৮৯]/g, d => '0123456789'[d.charCodeAt(0) - 2534])
      .replace('।', '.'));
  }

  enToBnNumber(enNumber: string | number) {
    return String(enNumber).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d.charCodeAt(0) - 48]);
  }
}

