import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message, MessageType } from '../model/message';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollBottom') private scrollContainer: ElementRef;

  messages: Message[] = [];
  currentUser: User;
  messagesSubscription: Subscription;
  newMessageBody: string = "";
  newMessageReceived: boolean = false;
  messageSending: boolean = false;
  chatbotSessionId: string = null;

  constructor(private httpService: HttpService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated)
      throw new Error("Authentication required to enable chat.");

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.messagesSubscription = this.httpService.getMessages().subscribe(message => {
      if (!message || !message.body || message.body.length === 0 || message.userId !== this.currentUser.userId)
        return;
      
      this.messages.push(message);
      this.newMessageReceived = true;
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
  }

  sendMessage(): void {
    if (this.messageSending) return;

    let message = new Message(null, this.newMessageBody, new Date(), MessageType.OUTGOING, this.currentUser.userId);

    this.messageSending = true;
    this.newMessageBody = "";

    this.httpService.sendUserMessage(message, this.currentUser, this.chatbotSessionId)
      .subscribe(chatbotSessionId => {
        this.chatbotSessionId = chatbotSessionId;
        this.messageSending = false;
      });
  }

  scrollToBottom(): void {
    if (!this.newMessageReceived) { return; }

    let element = this.scrollContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
    this.newMessageReceived = false;
  }

  onKey(event: KeyboardEvent): void {
    if (event.key !== "Enter") return;

    if (!this.newMessageBody || this.newMessageBody.length === 0) return;

    this.sendMessage();
  }
}
