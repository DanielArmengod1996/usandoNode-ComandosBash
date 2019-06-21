const util = require('util');
const exec = util.promisify(require('child_process').exec);

const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

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
    
    readLine.question(`escriba el mensaje del commit :: `, (commit) =>{
      commitMessage = commit;
      readLine.close();
    });


    command = await execCommand(`git commit -m "{!commitMessage}"`);
    console.log(command);
    command = await execCommand('git push');
    console.log( 'COMANDO FINAL :: ' +  command );

  }
}



fastCommitPrueba();