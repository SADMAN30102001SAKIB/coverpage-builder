let assignPDF;
let labPDF;
let labgroupPDF;
let fileAssignFetched=false;
let fileLabFetched=false;
let fileLabGroupFetched=false;
const savedAssign=localStorage.getItem("savedAssign");
const savedLab=localStorage.getItem("savedLab");
const savedLabGroup=localStorage.getItem("savedLabGroup");

// function arrayBufferToString(arrayBuffer) {
//     return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer));
//   }

function arrayBufferToString(arrayBuffer) {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(new Uint8Array(arrayBuffer));
}
  
  function stringToArrayBuffer(string) {
    const arrayBuffer = new ArrayBuffer(string.length * 2);
    const bufferView = new Uint16Array(arrayBuffer);
    for (let i = 0, strLen = string.length; i < strLen; i++) {
      bufferView[i] = string.charCodeAt(i);
    }
    return arrayBuffer;
  }

// Assignment Option

async function fetch_assign(){
    if(savedAssign){
        assignPDF=stringToArrayBuffer(savedAssign);
        fileAssignFetched=true;
    }
    else{
        const response = await fetch("https://cse-coverpage.netlify.app/server/Assignment.pdf");
        if (response.ok) {
        assignPDF=await response.arrayBuffer();
        const arrayBufferString = arrayBufferToString(assignPDF);
        localStorage.setItem("savedAssign", arrayBufferString);
        fileAssignFetched=true;
        }
    }
}


function waitForAssignFileFetched() {
    return new Promise(resolve => {
        const checkAssignFileFetched = () => {
            if (fileAssignFetched) {
                resolve();
            } else {
                setTimeout(checkAssignFileFetched, 100);
            }
        };

        checkAssignFileFetched();
    });
};


// Lab Option

async function fetch_lab(){
    if(savedLab){
        labPDF=stringToArrayBuffer(savedLab);
        fileLabFetched=true;
    }
    else{
        const response = await fetch("https://smartcoverbuilder.000webhostapp.com/LabCover.pdf");
        if (response.ok) {
        labPDF=await response.arrayBuffer();
        const arrayBufferString = arrayBufferToString(labPDF);
        localStorage.setItem("savedLab", arrayBufferString);
        fileLabFetched=true;
        }
    }
}


function waitForLabFileFetched() {
    return new Promise(resolve => {
        const checkLabFileFetched = () => {
            if (fileLabFetched) {
                resolve();
            } else {
                setTimeout(checkLabFileFetched, 100);
            }
        };

        checkLabFileFetched();
    });
};



// Lab Group Option

async function fetch_lab_group(){
    if(savedLab){
        labgroupPDF=stringToArrayBuffer(savedLab);
        fileLabGroupFetched=true;
    }
    else{
        const response = await fetch("https://smartcoverbuilder.000webhostapp.com/LabGroupCover.pdf");
        if (response.ok) {
        labgroupPDF=await response.arrayBuffer();
        const arrayBufferString = arrayBufferToString(labgroupPDF);
        localStorage.setItem("savedLabGroup", arrayBufferString);
        fileLabGroupFetched=true;
        }
    }
}


function waitForLabGroupFileFetched() {
    return new Promise(resolve => {
        const checkLabGroupFileFetched = () => {
            if (fileLabGroupFetched) {
                resolve();
            } else {
                setTimeout(checkLabGroupFileFetched, 100);
            }
        };

        checkLabGroupFileFetched();
    });
};
