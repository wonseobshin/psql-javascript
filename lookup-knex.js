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

knex.select('*').from('famous_people')
  .where('first_name', 'LIKE', args[0])
  .orWhere('last_name', 'LIKE', args[0])
  .asCallback(function(err,rows){
    if(err) throw err;
    rows.forEach((element) => {
      const simpleDOBArr = element.birthdate.toString().split(' ');
      const simpleDOB = `${simpleDOBArr[3]}-${simpleDOBArr[1]}-${simpleDOBArr[2]}`
      console.log(`- ${element.id}: ${element.first_name} ${element.last_name}, born '${simpleDOB}'`);
    });

  })
  .finally(function() {
    knex.destroy();
  });
