import { Component, OnInit } from '@angular/core';
import { moment } from '../../../moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
})
export class EditMomentComponent implements OnInit {
  moment!: moment;
  btntext: string = 'editar';

  constructor(
    private momentservice: MomentService,
    private route: ActivatedRoute,
    private messageservice: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentservice.getmoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }

  async edithandler(momentdata: moment) {
    const id = this.moment.id;

    const formdata = new FormData();

    formdata.append('title', momentdata.title);
    formdata.append('description', momentdata.description);

    if (momentdata.image) {
      formdata.append('image', momentdata.image);
    }

    await this.momentservice.updatemoment(id!, formdata).subscribe();

    this.messageservice.add(`Moment ${id} foi atualizado com sucesso`);
    this.router.navigate(['/']);
  }
}
