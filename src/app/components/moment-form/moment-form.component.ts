import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { moment } from '../../moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css',
})
export class MomentFormComponent implements OnInit {
  @Output() onsubmit = new EventEmitter<moment>();
  @Input() btnText!: string;
  @Input() momentdata: moment | null = null;
  momentform!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.momentform = new FormGroup({
      // todos os campos que eu posso e vou ter no formulario
      id: new FormControl(this.momentdata ? this.momentdata.id : ''),
      title: new FormControl(this.momentdata ? this.momentdata.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.momentdata ? this.momentdata.description : '',
        [Validators.required]
      ),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentform.get('title')!;
  }

  get description() {
    return this.momentform.get('description')!;
  }
  // responsavel por jogar a imagem no formulario
  onfileselected(event: any) {
    const file: File = event.target.files[0]; // pega o primeiro arquivo nesse array de arquivos

    this.momentform.patchValue({ image: file }); // inserir algo no formulario que não seja pelo bind do input
  }

  submit() {
    if (this.momentform.invalid) {
      return;
    }
    console.log(this.momentform.value); // valores que eu tenho no formulario
    this.onsubmit.emit(this.momentform.value); //enviando os dados do formulario
  }
}
