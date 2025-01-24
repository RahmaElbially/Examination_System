class User{
    constructor(firstName, lastName, email, password, id){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = id;
        this.correctAnswers = 0;  
        this.incorrectAnswers = 0; 
    }
    saveUser() {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(this);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    }
    updateAnswers(correct, incorrect) {
        this.correctAnswers = correct;
        this.incorrectAnswers = incorrect;
    }
}

export default User;