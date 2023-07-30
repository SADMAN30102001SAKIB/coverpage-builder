var form = document.getElementById("formDataLab");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  var courseCode = document.getElementById("course_code_lab_group").value;
  var teacherName = document.getElementById("teacher_name_lab_group").value;
  var experimentName = document.getElementById("experiment_name_group").value;
  var experimentNumber = document.getElementById("experiment_number_group").value;
  var roll = document.getElementById("roll_lab_group").value;
  var dateOfSubmission = document.getElementById("date_lab_sub").value;
  
  var formData = new FormData();
  formData.append("courseCode", courseCode);
  formData.append("teacherName", teacherName);
  formData.append("experimentName", experimentName);
  formData.append("experimentNumber", experimentNumber);
  formData.append("roll", roll);
  formData.append("dateOfSubmission", dateOfSubmission);

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://smartcoverbuilder.000webhostapp.com/labDB.php",
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      alert(xhr.responseText);
    }
  };
  xhr.send(formData);
});


console.log("Working");
function fillRoll() {
  var roll_lab_group_value = document.getElementById("roll_lab_group").value;
  
  if (roll_lab_group_value.length === 7) {
    var roll_string=""+roll_lab_group_value;
    if(roll_string.slice(6)<6&&roll_string.slice(6)>0)
    {
      var r1=parseInt(roll_string.slice(0,6)+'1');
      var r2=parseInt(roll_string.slice(0,6)+'2');
      var r3=parseInt(roll_string.slice(0,6)+'3');
      var r4=parseInt(roll_string.slice(0,6)+'4');
      var r5=parseInt(roll_string.slice(0,6)+'5');
      var roll_list={r1,r2,r3,r4,r5}
      console.log("Working")
      var roll_array = Object.values(roll_list);
      var index = roll_array.indexOf(parseInt(roll_lab_group_value));
      roll_array.splice(index, 1);
      
      document.getElementById("roll_lab_group2").value=roll_array[0];
      document.getElementById("roll_lab_group3").value=roll_array[1];
      document.getElementById("roll_lab_group4").value=roll_array[2];
      document.getElementById("roll_lab_group5").value=roll_array[3];
      console.log(index);

    }
    else if(roll_string.slice(6)>5)
    {
      var r1=parseInt(roll_string.slice(0,6)+'6');
      var r2=parseInt(roll_string.slice(0,6)+'7');
      var r3=parseInt(roll_string.slice(0,6)+'8');
      var r4=parseInt(roll_string.slice(0,6)+'9');
      var r5=parseInt(roll_string.slice(0,5)+(parseInt(roll_string.slice(5,6))+1)+'0');
      var roll_list={r1,r2,r3,r4,r5}
      console.log("Working")
      var roll_array = Object.values(roll_list);
      var index = roll_array.indexOf(parseInt(roll_lab_group_value));
      roll_array.splice(index, 1);
      
      document.getElementById("roll_lab_group2").value=roll_array[0];
      document.getElementById("roll_lab_group3").value=roll_array[1];
      document.getElementById("roll_lab_group4").value=roll_array[2];
      document.getElementById("roll_lab_group5").value=roll_array[3];
      console.log(index);

    }
    else if(roll_string.slice(6)==0)
    {
      var r1=parseInt(roll_string.slice(0,5)+(parseInt(roll_string.slice(5,6))-1)+'6');
      var r2=parseInt(roll_string.slice(0,5)+(parseInt(roll_string.slice(5,6))-1)+'7');
      var r3=parseInt(roll_string.slice(0,5)+(parseInt(roll_string.slice(5,6))-1)+'8');
      var r4=parseInt(roll_string.slice(0,5)+(parseInt(roll_string.slice(5,6))-1)+'9');
      var r5=parseInt(roll_string.slice(0,6)+'0');
      var roll_list={r1,r2,r3,r4,r5}
      console.log("Working")
      var roll_array = Object.values(roll_list);
      var index = roll_array.indexOf(parseInt(roll_lab_group_value));
      roll_array.splice(index, 1);
      
      document.getElementById("roll_lab_group2").value=roll_array[0];
      document.getElementById("roll_lab_group3").value=roll_array[1];
      document.getElementById("roll_lab_group4").value=roll_array[2];
      document.getElementById("roll_lab_group5").value=roll_array[3];
      console.log(index);

    }
    // Call your desired function here
    saveRoll1();
    saveRoll2();
    saveRoll3();
    saveRoll4();
    saveRoll5();
  }
}


async function MakeLabCoverGroup() {
  const submissionDate = document.getElementById("date_lab_sub").value;
  const experimentDate = document.getElementById("date_lab_exp").value;
  const experimentNumber = document.getElementById("experiment_number_group").value;
  const textInput = document.getElementById("course_code_lab_group").value;
  const rollNumber = document.getElementById("roll_lab_group").value;
  const rollNumber2 = document.getElementById("roll_lab_group2").value;
  const rollNumber3 = document.getElementById("roll_lab_group3").value;
  const rollNumber4 = document.getElementById("roll_lab_group4").value;
  const rollNumber5 = document.getElementById("roll_lab_group5").value;
  const experimentName = document.getElementById("experiment_name_group").value;
  const teacherName = document.getElementById("teacher_name_lab_group").value;

  if (
    textInput.trim() === "" ||
    teacherName.trim() === "" ||
    experimentNumber.trim() === "" ||
    experimentName.trim() === "" ||
    rollNumber.trim() === "" ||
    DateOfSubmission.trim() === ""
  ) {
    alert("All fields are required!");
  } else if (
    parseInt(rollNumber) >= 2103001 &&
    parseInt(rollNumber) <= 2103181
  ) {
    const newRollValue_lab = document.getElementById("roll_lab").value;

    localStorage.setItem("roll_lab", newRollValue_lab);

    const button = document.querySelector(".labgnrgrp");
    button.innerText = "Generating...";

    const fileUrl = "https://corsproxy.io/?https://cse-coverpage.netlify.app/server/LabCover(Group).pdf";

    const response = await fetch(fileUrl);
    const pdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    const timesNewRomanFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.TimesRoman
    );

    const textInputTemp = course_details_lab[textInput].name;
    const courseCode = course_details_lab[textInput].code;

    const page = pdfDoc.getPages()[0];
    page.drawText(textInputTemp, {
      x: 220,
      y: 455,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(courseCode, {
      x: 220,
      y: 489,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(experimentNumber, {
      x: 220,
      y: 423,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(experimentName, {
      x: 220,
      y: 390,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(submissionDate, {
      x: 220,
      y: 341,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(experimentDate, {
      x: 220,
      y: 357,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    
    const studentName = student_data["n" + rollNumber].name;
    const studentSection = student_data["n" + rollNumber].section;
    // const studentSeries = student_data["n" + rollNumber].series + "";
    page.drawText(studentName, {
      x: 74,
      y: 292,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber, {
      x: 63,
      y: 275,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSection, {
      x: 120,
      y: 259,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll2name = student_data["n" + rollNumber2].name;
    const roll2roll = student_data["n" + rollNumber2].section;
    page.drawText(roll2name, {
      x: 74,
      y: 225,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(roll2roll, {
      x: 65,
      y: 209,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll3name = student_data["n" + rollNumber3].name;
    const roll3roll = student_data["n" + rollNumber3].section;
    page.drawText(roll3name, {
      x: 74,
      y: 193,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(roll3roll, {
      x: 65,
      y: 177,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll4name = student_data["n" + rollNumber4].name;
    const roll4roll = student_data["n" + rollNumber4].section;
    page.drawText(roll4name, {
      x: 74,
      y: 160,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(roll4roll, {
      x: 65,
      y: 145,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll5name = student_data["n" + rollNumber5].name;
    const roll5roll = student_data["n" + rollNumber5].section;
    page.drawText(roll5name, {
      x: 74,
      y: 127,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(roll5roll, {
      x: 65,
      y: 120,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });


    const teacherNameText = teacher_list[teacherName].name;
    const teacherDesignation = teacher_list[teacherName].designation;

    page.drawText(teacherNameText, {
      x: 310,
      y: 292,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(teacherDesignation, {
      x: 310,
      y: 277,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Rajshahi University of Engineering and", {
      x: 310,
      y: 262,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Technology", {
      x: 320,
      y: 247,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(DateOfSubmission, {
      x: 210,
      y: 75,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const modifiedPDFBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPDFBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = experimentName + " Lab Cover.pdf";
    link.click();

    URL.revokeObjectURL(url);

    button.innerText = "Generate PDF";
  }
}

async function downloadLabCover() {
  const button = document.querySelector(".labdow");
  button.innerText = "Downloading...";

  const fileUrl = "https://smartcoverbuilder.000webhostapp.com/LabCover.pdf";

  const response = await fetch(fileUrl);
  const pdfBlob = await response.blob();
  const url = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Lab Cover.pdf";
  link.click();

  URL.revokeObjectURL(url);

  button.innerText = "Lab Cover";
}



function saveRoll1(){
  localStorage.setItem("roll1",document.getElementById("roll_lab_group").value);
}

function saveRoll2(){
  localStorage.setItem("roll2",document.getElementById("roll_lab_group2").value);
}

function saveRoll3(){
  localStorage.setItem("roll3",document.getElementById("roll_lab_group3").value);
}

function saveRoll4(){
  localStorage.setItem("roll4",document.getElementById("roll_lab_group4").value);
}

function saveRoll5(){
  localStorage.setItem("roll5",document.getElementById("roll_lab_group5").value);
}
