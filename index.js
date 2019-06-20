const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function execCommand(command){
  const { stdout, stderr } = await exec(command);
  return stdout != null ? stdout : stderr != null ? stderr : null;
}

async function init() {
  var command = await execCommand('git status');
  console.log(command);

  if( command.includes('modified') ){
    command = await execCommand('git add .');
    console.log(command);
    command = await execCommand('git commit -m "subida de robot"');
    console.log(command);
    command = await execCommand('git push');
  }
  console.log( 'COMANDO FINAL :: ' +  command );
}



init();