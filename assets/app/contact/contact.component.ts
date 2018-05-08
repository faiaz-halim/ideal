import { Component, HostBinding, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from './contact.service';
import { Message } from './message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [slideInOutAnimation]
})
export class ContactComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  messageForm: FormGroup;
  //---------------------------------------------
  confirmMesage1: string = "";
  confirmMesage2: string = "";
  modalReference: any;
  closeResult: string;

  constructor(public formBuilder: FormBuilder, private modalService: NgbModal,
              private contactService:ContactService) { }

  ngOnInit() {
     this.messageForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: [''],
        body: ['', Validators.required]
     });
  }
  onSubmit(c){
     //console.log(this.messageForm.value);
     let id = "";//Date.now().toString() + "this.messageForm.value.name";
     let value:Message = new Message(id, this.messageForm.value.name,
                        this.messageForm.value.email, this.messageForm.value.subject,
                        this.messageForm.value.body, "unread");
     this.contactService.addMessage(value)
      .subscribe(
          data => {
            this.confirmMesage1 = "Your message was sent successfully.";
            this.confirmMesage2 = "Thank you.";
            this.open(c);
          },
          error => {
            this.confirmMesage1 = "Message cannot be sent now.";
            this.confirmMesage2 = "Please try again later.";
            this.open(c);
          }
      );
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onCloseModal(v){
    this.modalReference.close();
    this.messageForm.reset();
  }
}
