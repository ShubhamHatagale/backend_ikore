const mysql=require('mysql');
const connection = mysql.createConnection(
    {
    host:process.env.DB_host,
    user:process.env.DB_user,
    password:process.env.DB_password,
    database:process.env.DB
   
}
);
connection.connect((error,result)=>{
    if(error)
   throw error;
    else 
    console.log('Ikore Backend working,connection created'); 
});

module.exports=connection;
