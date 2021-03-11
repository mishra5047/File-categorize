#!/usr/bin/env node
//Made By Love By Abhishek Mishra

let fs = require("fs");
let args = process.argv.slice(2);

if(args.includes("-h") || args.includes("-help")){
    
    console.log("\n*NOTE* - Make Sure You Don't Enter Any Spaces in Input Directories")

    console.log("\nArgument - \t Functionality\n") 
    console.log("-s \t - \t To Organise The Files In the Given Directory")
    console.log("-o \t - \t To Input The Given Directory")
    console.log("-m \t - \t To Move")
    console.log("-h \t - \t To View command's help")
    console.log("-v \t - \t To View command's version")   
    
    console.log("\nSyntax Format");
    console.log("\n1. To Keep The Initial Files Syntax is->\n\t -s [SOURCE DIRECTORY] -o [OUTPUT DIRECTORY]")
    console.log("\n2. To Remove The Initial Files Syntax is->\n\t -m -s [SOURCE DIRECTORY] -o [OUTPUT DIRECTORY]\n")
    
    process.exit();    
}

if(args.includes("--version") || args.includes("-v")){
    console.log("version 1.0.0");
    process.exit();
}

let dirNames = args.slice(args.indexOf("-s") + 1,args.indexOf("-o"));
let outputdirs = args.slice(args.indexOf("-o") + 1,args.length);

let isToMove = false;

if(args.includes("-m"))
    isToMove = true;
    
for(let idx in dirNames){
    if(!fs.existsSync(dirNames[idx])){
        console.log( " No such directory : "+ dirNames[idx] );
        process.exit();
    }
}

for(let x in dirNames)
    if(!fs.existsSync(outputdirs[x]))
        createDir("./"+outputdirs[x]);

    
for(let idx in dirNames){
    console.log("*********************************************************");
    console.log("Moving Files From : " + dirNames[idx] + " To " + outputdirs[idx]);
    console.log("Move Files : " + (isToMove).toString());
    console.log("*********************************************************");
    getFilesAndFolder(dirNames[idx], outputdirs[idx], isToMove);
    if(isToMove){
        deleteDir(dirNames[idx]);
    }
    // console.log("Source Directory : " + dirNames[idx] + " Done");
    console.log("*********************************************************");
}
    


function getFilesAndFolder(dirName, outputdir,isToMove) {
    let folders = [];
	let files = [];
	
    let dir = fs.readdirSync(dirName);
	dir.forEach((item) => {
		if (item.includes(".")) {
			files.push( item);
		} else {
			folders.push(item);
		}
	});
    
    for( let x in folders){
        getFilesAndFolder(dirName+"/"+folders[x],outputdir,isToMove);
    }
    saveFileToType(dirName,files,outputdir,isToMove);
}


function saveFileToType(root,path,outputdir,isToMove){
    for(let idx in path){
        let ext = path[idx].split(".")[1];
        outputDirPath = outputdir+"/"+ext;
        
        if(!fs.existsSync(outputDirPath))
            createDir(outputDirPath)
    
        fs.copyFileSync(root+"/"+path[idx], outputDirPath+"/"+path[idx],); 
        console.log(path[idx]+ " --------> Done ");

        if(isToMove){
            deletefile(root+"/"+path[idx]);
        }
    }
}


function createDir(path){
    fs.mkdirSync(path,(err)=>{
        if(err) throw err;
        // console.log("Dir created : "+path);
    })
}

function deletefile(path){
    fs.rm(path,(err)=>{
        if(err) throw err;
        // console.log("File deleted : " + path);
    })
}
function deleteDir(path){
    fs.rmdir(path,{recursive:true},(err)=>{
        if(err) throw err;
        // console.log("Dir deleted : " + path);
    })
}