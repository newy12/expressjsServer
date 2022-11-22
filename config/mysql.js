var {error} = require("console");
var mysql = require("mysql");
const env = require('dotenv').config();

 const mysqlConnecte = {
    init : function() {
        return mysql.createConnection({
            host : process.env.host,
            port : process.env.port,
            user : process.env.user,
            password : process.env.password,
            database : process.env.database
        });    
    },
    open : function(connection){
        connection.connect(error => {
            if(error) {
                console.log("Data Base 연결에 실패 하였습니다.",error);
            }
                console.log("Data Base 연결에 성공 하였습니다.");
        });
    },
    close : function(connection){
        connection.end(error => {
            if(error) {
                console.log("Data Base를 종료하는데 실패 하였습니다.",error); 
            }
                console.log("Data Base와 연결이 정상적으로 종료 되었습니다.");
        });
    }
} 
module.exports = mysqlConnecte;