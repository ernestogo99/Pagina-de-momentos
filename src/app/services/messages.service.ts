import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message: string = '';
  constructor() {}

  add(message: string) {
    this.message = message;
    setTimeout(() => {
      this.clear();
    }, 4000);
  } // mostra a mensagem e a esconde após um certo momento

  clear() {
    this.message = '';
  }
}
