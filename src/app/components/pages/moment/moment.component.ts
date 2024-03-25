import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { moment } from '../../../moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../services/messages.service';
import { comment } from '../../../coment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { ComentService } from '../../../services/coment.service';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
})
export class MomentComponent implements OnInit {
  moment?: moment;
  baseapiurl = environment.baseapiurl;
  fatimes = faTimes; // é o icone X
  faedit = faEdit; // é o lapis

  comentform!: FormGroup;

  constructor(
    private momentservice: MomentService,
    private route: ActivatedRoute,
    private messageservice: MessagesService,
    private router: Router,
    private comentservice: ComentService
  ) {}

  ngOnInit(): void {
    // Obter o ID do momento a partir dos parâmetros da rota
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Chamar o serviço para obter os detalhes do momento com o ID especificado
    this.momentservice.getmoment(id).subscribe(
      (response) => {
        // Atribuir os dados do momento ao objeto Moment
        this.moment = response.data;
      },
      (error) => {
        // Lidar com erros de forma apropriada (por exemplo, exibir uma mensagem de erro)
        console.error('Erro ao recuperar os detalhes do momento:', error);
      }
    );

    this.comentform = new FormGroup({
      text: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  get text() {
    return this.comentform.get('text')!;
  }

  get username() {
    return this.comentform.get('username')!;
  }

  // o registro é excluido,aguardamos a api,mostramos uma mensagem e mandamos pra home
  async removehandler(id: number) {
    await this.momentservice.removemoment(id).subscribe(); // irei esperar isso acontecer para fazer outra coisa
    this.messageservice.add('Momento excluido com sucesso');
    this.router.navigate(['/']);
  }

  async onsubmit(formdirective: FormGroupDirective) {
    if (this.comentform.invalid) {
      return;
    }

    const data: comment = this.comentform.value;

    data.momentId = Number(this.moment!.id);
    await this.comentservice
      .createcoment(data)
      .subscribe((coment) => this.moment!.comments?.push(coment.data));

    this.messageservice.add('comentario adicionado');

    //reseto o form
    this.comentform.reset(); // limpa o formulario

    formdirective.resetForm();
  }
}
