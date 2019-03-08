
export class User{

    constructor(id, email, firstName, lastName, password){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    setId (id){
        this.id = id;
    }
    getId (){
        return this.id;
    }

    setEmail (email){
        this.email = email;
    }

    getEmail (){
        return this.email;
    }

    setFirstName (firstName){
        this.firstName = firstName;
    }

    getFirstName (){
        return this.firstName;
    }

    setLastName (lastName){
        this.lastName = lastName;
    }

    getLastName (){
        return this.lastName;
    }

    setPassword (password){
        this.password = password;
    }

    getPassword (){
        return this.password;
    }

}

