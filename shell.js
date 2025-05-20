import { exec } from 'child_process';

const installPackages = () => {
    const command = 'sudo apt update -qq && sudo apt install imagemagick -y && pip install -U yt-dlp';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ Stderr: ${stderr}`);
            return;
        }
        console.log(`✅ Success:\n${stdout}`);
    });
    
};


installPackages();
