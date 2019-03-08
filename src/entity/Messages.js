
export class Messages {

    setId (id){
        this.id = id;
    }

    getId (){
        return this.id;
    }

    setCreatedOn (createdOn){
        this.createdOn = createdOn;
    }

    getCreatedOn (){
        return this.createdOn;
    }

    setSubject (subject){
        this.subject = subject;
    }

    getSubject (){
        return this.subject;
    }

    setMessage( message){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }

    setParentMessageId (parentMessageId){
        this.parentMessageId = parentMessageId;
    }

    getParentMessageId (){
        return this.parentMessageId;
    }

    setStatus (status){
        this.status = status;
    }

    getStatus (){
        return this.status;
    }
}