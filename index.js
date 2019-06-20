const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function execCommand(command){
  const { stdout, stderr } = await exec(command);
  return stdout != null ? stdout : stderr != null ? stderr : null;
}

async function fastCommitPrueba() {
  var command = await execCommand('git status');
  console.log(command);

  if( command.includes('modified') ){
    command = await execCommand('git add .');
    console.log(command);
    var stdin = process.openStdin();
    var commitMessage;
    stdin.addListener("data", function(d){
      commitMessage = d.toString();
      console.log( "usted ha escito" + commitMessage );
    });
    command = await execCommand('git commit -m "{!commitMessage}"');
    console.log(command);
    command = await execCommand('git push');
  }
  console.log( 'COMANDO FINAL :: ' +  command );
}



fastCommitPrueba();