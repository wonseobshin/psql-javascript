const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);
console.log(args);
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("successfully connected");

  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1`, args, (err, res) => {
    if(err) throw err;
    res.rows.forEach((element) => {
      const simpleDOBArr = element.birthdate.toString().split(' ');
      const simpleDOB = `${simpleDOBArr[3]}-${simpleDOBArr[1]}-${simpleDOBArr[2]}`
      console.log(`- ${element.id}: ${element.first_name} ${element.last_name}, born '${simpleDOB}'`);
    })
    client.end();
  })
});