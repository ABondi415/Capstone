class Message {
  constructor(
    public id: string,
    public body: string,
    public createdDateTime: Date,
    public type: MessageType,
    public userId: string
  ) { }
}

enum MessageType {
  INCOMING,
  OUTGOING
}

export { Message, MessageType };