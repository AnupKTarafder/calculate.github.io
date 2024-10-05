import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilKeyChanged} from "rxjs";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-table-to-text',
  templateUrl: './table-to-text.component.html',
  styleUrl: './table-to-text.component.css'
})
export class TableToTextComponent {
  @Output() onSubmit = new EventEmitter<[{ item: string, price: string }[], number[], boolean]>();
  form: FormGroup;
  arr = new Array<number | undefined>();

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.form = this.fb.group({
      addTotalLines: false,
      items: this.fb.array([])  // Initialize as an empty FormArray
    });

    // Populate the FormArray with 100 FormGroups
    this.addItems(100);
  }


  // Getter for easy access to the FormArray
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  // Method to add multiple FormGroups to the FormArray
  addItems(count: number) {
    for (let i = 0; i < count; i++) {
      this.items.push(this.createItem(i));
    }
  }

  // Method to create a FormGroup for each item
  createItem(index: number): FormGroup {
    const itemGroup = this.fb.group({
      item: [''],   // FormControl for item name
      price: ['']   // FormControl for item price
    });
    itemGroup.valueChanges.pipe(debounceTime(300), distinctUntilKeyChanged('price')).subscribe((value) => {
      console.log(index,)
      this.arr[index] = (this.commonService.bnToEnNumber(value.price));
    })

    return itemGroup;
  }

  getFormControl(fg: AbstractControl, controlName: string): FormControl {
    return fg.get(controlName) as FormControl;
  }


  submitForm() {
    this.onSubmit.emit([this.form.value['items'], this.arr.filter(Boolean) as number[], this.form.value['addTotalLines']]);
  }

  protected readonly Boolean = Boolean;
}
