import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = util.promisify(exec);

export async function linkPackagesSource(){
    console.log("Unlinking all existing packages.");
    let outputUnlink = {stdout: "", stderr: ""};
    try{
        outputUnlink = await execPromise("yarn run lerna exec --no-bail yarn unlink");
    }
    catch(err){
        console.error(err);
    }

    fs.writeFileSync(`${path.join(__dirname, "../logs/stdoutLinkSource.txt")}`, outputUnlink.stdout);
    fs.writeFileSync(`${path.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputUnlink.stderr);

    console.log("Linking local packages.");
    let outputLink = {stdout: "", stderr: ""};
    try{
        outputLink = await execPromise("yarn run lerna exec --no-bail yarn link");
    }
    catch(err){
    }

    fs.appendFileSync(`${path.join(__dirname, "../logs/stdoutLinkSource.txt")}`, outputLink.stdout);
    fs.appendFileSync(`${path.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputLink.stderr);

    let outputAllPackages = {stdout: "", stderr: ""};
    try{
        outputAllPackages = await execPromise("yarn run lerna ls");
        // Remove first two and last lines as they contain irrelevant output
        const output = outputAllPackages.stdout.split("\n");
        const packages = output.slice(2, output.length - 2);
        outputAllPackages.stdout = packages.join('\n')
    }
    catch(err){
    }

    fs.writeFileSync(`${path.join(__dirname, "../logs/packages.txt")}`, outputAllPackages.stdout);
    fs.appendFileSync(`${path.join(__dirname, "../logs/stderrLinkSource.txt")}`, outputAllPackages.stderr);

    console.log(`Logs saved to ${path.join(__dirname, "..", "logs")}.`);
    console.log(`Saved linked packages to ${path.join(__dirname, "..", "logs", "package.txt")}.`);
    console.log(`Run <lerna-linker linkTarget> in the repository you want to use the linked packages in.`);
}

export async function linkPackagesTarget(){
    const packages = fs.readFileSync(path.join(__dirname, "..", "logs/packages.txt"), 'utf-8').trim().split('\n');
    for (const comunicaPackage of packages){
        try{
            await execPromise(`yarn link ${comunicaPackage}`);
        }
        catch(err){
            console.error(err);
        }
    }
    console.log(`Linked ${packages.length} packages`);
}

export async function unlinkPackagesTarget(){
    const packages = fs.readFileSync(path.join(__dirname, "..", "logs/packages.txt"), 'utf-8').split('\n');
    for (const comunicaPackage of packages){
        try{
            await execPromise(`yarn unlink ${comunicaPackage}`);
        }
        catch(err){
            console.error(err);
        }
    }
    console.log(`Unlinked ${packages.length} packages`);
}