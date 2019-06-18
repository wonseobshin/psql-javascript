const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl,
  },
});

if(args.length === 3){
  knex('famous_people')
    .insert({
      first_name: args[0],
      last_name: args[1],
      birthdate: args[2],
    })
    .then(() => {
      console.log("successful")
    })
    .finally(function() {
      knex.destroy()
    });
}