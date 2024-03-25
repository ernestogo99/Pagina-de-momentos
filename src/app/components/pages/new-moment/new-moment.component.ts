import { Component, OnInit } from '@angular/core';
import { moment } from '../../../moment';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css',
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(
    private momentservice: MomentService,
    private messageservice: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createhandler(moment: moment) {
    const formdata = new FormData();

    formdata.append('title', moment.title);
    formdata.append('description', moment.description);
    if (moment.image) {
      formdata.append('image', moment.image);
    }

    //to do

    //enviar para o service
    await this.momentservice.createmoment(formdata).subscribe();

    // adicionar mensagem
    this.messageservice.add('Momento adicionado com sucesso');

    //redirect
    this.router.navigate(['/']); // usuario vai para a home após adicionar o serviço
  }
}
