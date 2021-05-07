import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  listUsers: any[] = [];
  listMessages: any[] = [];
  userSender: any;
  userReceiver: any;
  userpicture: any;
  suscription$: Subscription;
  openConnectedUser: boolean = false;
  openChatWindow: boolean = false;
  message: string;

  constructor(public socket: SocketioService) {
    this.suscription$ = this.socket.on('returnUserList').subscribe((response: any) => {
      console.log(response);
      this.listUsers = response;

      this.openConnectedUser = true;
    });

    this.suscription$ = this.socket.on('returnChat').subscribe((response: any) => {
      console.log(response);
      this.listMessages = response;
    });
   }

  ngOnInit(): void {

  }

  closeChat(){
    this.openChatWindow = false;
    this.openConnectedUser = false;
  }

  openConnectedUsers(){
    this.socket.emit('getConnectedUsers', {});
  }

  openChat(userReceiver: string,userPicture: any){
    this.userReceiver = userReceiver;
    this.userSender = window.sessionStorage.getItem("fullName");
    this.userpicture = userPicture;

    this.socket.emit('getChatMessages', {
      client: 'Angular', usersender: this.userSender, userreceiver: this.userReceiver
    })

    this.openChatWindow = true;
    this.openConnectedUser = false;
  }

  sendMessage(msg: string) {
    console.log(msg);
    this.socket.emit('message', {
      client: 'Angular', usersender: this.userSender, userreceiver: this.userReceiver, msg
    });

    this.socket.emit('getChatMessages', {
      client: 'Angular', usersender: this.userSender, userreceiver: this.userReceiver
    })
  }

}
