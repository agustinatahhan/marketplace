const fs = require('fs');
const path = require('path');

const User = {
    //fileName: './data/user.json',
    fileName: path.join(__dirname, '../data', 'user.json'),

    getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},


    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function (){
        return this.getData();
    },

    findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},
    
    create: function (userData){
        console.log(userData);
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    }
}
module.exports = User;