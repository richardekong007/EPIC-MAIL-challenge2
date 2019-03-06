export class Inbox{

    setReceiverId (receiverId){
        this.receiverId = receiverId;
    }

    getReceiverId (){
        return receiverId;
    }

    setMessageId (messageId){
        this.messageId = messageId;
    }

    getMessageId (){
        return this.messageId;
    }

    setCreatedOn (createdOn){
        this.createdOn = createdOn;
    }

    getCreatedOn (){
        return this.createdOn;
    }
}