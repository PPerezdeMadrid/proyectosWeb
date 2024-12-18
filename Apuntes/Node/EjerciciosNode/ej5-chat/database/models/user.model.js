const bcrypt = require('bcrypt');

users = {};

users.data = {};

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function(username, password){
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {username, hash, last_Login: new Date().toISOString, CookiesAceptadas: false};
        //users.data[username].CookiesAceptadas = false; // Falso por defecto
    });
}

users.isLoginRight = async function(username, password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}

users.saveCookie = async function(username){
    if(users.data.hasOwnProperty(username)){
        users.data[username].CookiesAceptadas = true;
        return false;
    }else{
        return "No existe el usuario"
    }
}

users.hasAcceptedCookies = async function(username){
    if(users.data.hasOwnProperty(username)){
        console.log(users.data[username].CookiesAceptadas);
        return users.data[username].CookiesAceptadas
    }else{
        return "No existe el usuario"
    }
}

module.exports = users;