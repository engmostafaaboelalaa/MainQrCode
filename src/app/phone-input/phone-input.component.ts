import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import intlTelInput from 'intl-tel-input';

// نعرّف النوع (interface) بنفسنا
interface IntlTelInputOptions {
  initialCountry?: string;
  preferredCountries?: string[];
  separateDialCode?: boolean;
}

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css']
})
export class PhoneInputComponent implements OnInit {
  @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;

  iti: any;

  ngOnInit(): void {
    const options: IntlTelInputOptions = {
      initialCountry: 'eg',
      preferredCountries: ['eg', 'sa', 'ae', 'us'],
      separateDialCode: true
    };

    this.iti = intlTelInput(this.phoneInput.nativeElement, options);
  }

  getNumber() {
    console.log(this.iti.getNumber());
  }
}
