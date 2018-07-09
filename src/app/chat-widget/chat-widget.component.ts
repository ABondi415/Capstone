import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { uuid } from 'uuid/v1';

import { Message, MessageType } from '../model/message';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollBottom') private scrollContainer: ElementRef;

  messages: Message[];
  currentUserId: string;
  messagesSubscription: Subscription;
  newMessageBody: string;
  newMessageReceived: boolean = false;
  messageSending: boolean = false;

  constructor(private httpService: HttpService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated)
      throw new Error("Authentication required to enable chat.");

    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).userId;
    this.httpService.getUserMessages(this.currentUserId).subscribe(messages => this.messages = messages);

    this.messagesSubscription = this.httpService.getMessages().subscribe(message => {
      if (!message || !message.body || message.body.length === 0 || message.userId !== this.currentUserId)
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

  sendMessage() {
    if (this.messageSending) return;

    let message = new Message(uuid(), this.newMessageBody, new Date(), MessageType.OUTGOING, this.currentUserId);

    this.messageSending = true;
    this.httpService.sendUserMessage(message, this.currentUserId)
      .subscribe(m => {
        this.newMessageBody = null;
        this.messageSending = false;
      });
  }

  scrollToBottom() {
    if (!this.newMessageReceived) { return; }

    let element = this.scrollContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
    this.newMessageReceived = false;
  }
}
