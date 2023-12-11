var form = document.getElementById("formDataLabGroup");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var courseCode = document.getElementById("course_code_lab_group").value;
  var teacherName = document.getElementById("teacher_name_lab_group").value;
  var experimentName = document.getElementById("experiment_name_group").value;
  var experimentNumber = document.getElementById(
    "experiment_number_group"
  ).value;
  var roll = document.getElementById("roll_lab_group").value;
  var dateOfSubmission = document.getElementById("date_lab_group").value;
  var dateOfExperiment = document.getElementById("date_lab_group_exp").value;

  var formData = new FormData();
  formData.append("courseCode", courseCode);
  formData.append("teacherName", teacherName);
  formData.append("experimentName", experimentName);
  formData.append("experimentNumber", experimentNumber);
  formData.append("roll", roll);
  formData.append("dateOfSubmission", dateOfSubmission);
  formData.append("dateOfExperiment", dateOfExperiment);
  formData.append("Individual_Group_Flag", 0);

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

function fillRoll() {
  var roll_lab_group_value = document.getElementById("roll_lab_group").value;

  if (
    roll_lab_group_value.length === 7 &&
    roll_lab_group_value >= 2103001 &&
    roll_lab_group_value <= 2103181
  ) {
    var team_member_last_roll =
      Math.ceil(parseInt(roll_lab_group_value.slice(4, 7)) / 5) * 5 + 2103000;
    var roll_list = [];

    for (var i = 4; i >= 0; i--) {
      var roll_number = team_member_last_roll - i;

      if (roll_lab_group_value == roll_number) {
        continue;
      }

      roll_list.push(roll_number);
    }

    document.getElementById("roll_lab_group2").value = roll_list[0];
    document.getElementById("roll_lab_group3").value = roll_list[1];
    document.getElementById("roll_lab_group4").value = roll_list[2];
    document.getElementById("roll_lab_group5").value = roll_list[3];
  }
}

async function MakeLabCoverGroup() {
  const DateOfSubmission = document.getElementById("date_lab_group").value;
  const DateOfExperiment = document.getElementById("date_lab_group_exp").value;
  const experimentNumber = document.getElementById(
    "experiment_number_group"
  ).value;
  const textInput = document.getElementById("course_code_lab_group").value;
  const rollNumber = document.getElementById("roll_lab_group").value;
  const experimentName = document.getElementById("experiment_name_group").value;
  const teacherName = document.getElementById("teacher_name_lab_group").value;

  const rollNumber2 = document.getElementById("roll_lab_group2").value;
  const rollNumber3 = document.getElementById("roll_lab_group3").value;
  const rollNumber4 = document.getElementById("roll_lab_group4").value;
  const rollNumber5 = document.getElementById("roll_lab_group5").value;

  if (
    textInput.trim() === "" ||
    teacherName.trim() === "" ||
    experimentNumber.trim() === "" ||
    experimentName.trim() === "" ||
    rollNumber.trim() === ""
  ) {
    alert("All fields are required!");
  } else if (
    parseInt(rollNumber) >= 2103001 &&
    parseInt(rollNumber) <= 2103181 &&
    parseInt(rollNumber2) >= 2103001 &&
    parseInt(rollNumber2) <= 2103181 &&
    parseInt(rollNumber3) >= 2103001 &&
    parseInt(rollNumber3) <= 2103181 &&
    parseInt(rollNumber4) >= 2103001 &&
    parseInt(rollNumber4) <= 2103181 &&
    parseInt(rollNumber5) >= 2103001 &&
    parseInt(rollNumber5) <= 2103181
  ) {
    saveRolls();

    const button = document.querySelector(".labgnrgrp");
    button.innerText = "Generating...";

    // const fileUrl =
    //   "https://smartcoverbuilder.000webhostapp.com/LabGroupCover.pdf";

    // const response = await fetch(fileUrl);
    // const pdfBytes = await response.arrayBuffer();

    await waitForLabGroupFileFetched();

    const pdfBytes=labgroupPDF;

    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    const timesNewRomanFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.TimesRoman
    );

    const textInputTemp = course_details_lab[textInput].name;
    const courseCode = course_details_lab[textInput].code;

    const page = pdfDoc.getPages()[0];
    page.drawText(textInputTemp, {
      x: 210,
      y: 317,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(courseCode, {
      x: 210,
      y: 350,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(experimentNumber, {
      x: 210,
      y: 284,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(experimentName, {
      x: 210,
      y: 251,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const studentName = student_data["n" + rollNumber].name;
    const studentSection = student_data["n" + rollNumber].section;
    const studentSeries = student_data["n" + rollNumber].series + "";

    page.drawText(studentName, {
      x: 120,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber, {
      x: 110,
      y: 152.5,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSection, {
      x: 130,
      y: 136,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSeries, {
      x: 130,
      y: 120,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const roll2name = student_data["n" + rollNumber2].name;
    page.drawText(roll2name, {
      x: 114,
      y: 51,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber2, {
      x: 114,
      y: 37,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const roll3name = student_data["n" + rollNumber3].name;
    page.drawText(roll3name, {
      x: 114,
      y: 21,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber3, {
      x: 114,
      y: 7,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll4name = student_data["n" + rollNumber4].name;
    page.drawText(roll4name, {
      x: 355,
      y: 51.5,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber4, {
      x: 355,
      y: 37,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    const roll5name = student_data["n" + rollNumber5].name;

    page.drawText(roll5name, {
      x: 355,
      y: 21.5,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber5, {
      x: 355,
      y: 7,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const teacherNameText = teacher_list[teacherName].name;
    const teacherDesignation = teacher_list[teacherName].designation;

    page.drawText(teacherNameText, {
      x: 320,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(teacherDesignation, {
      x: 320,
      y: 155,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Rajshahi University of Engineering and", {
      x: 320,
      y: 140,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Technology", {
      x: 320,
      y: 125,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(DateOfExperiment, {
      x: 205,
      y: 86.3,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(DateOfSubmission, {
      x: 442,
      y: 86.5,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const modifiedPDFBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPDFBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = experimentName + " Lab Cover(Group).pdf";
    link.click();

    URL.revokeObjectURL(url);

    button.innerText = "Generate PDF";
  }
}

async function downloadLabCoverGroup() {
  const button = document.querySelector(".labdowgroup");
  button.innerText = "Downloading...";

  const fileUrl =
    "https://cse-coverpage.netlify.app/server/LabGroupCover.pdf";

  const response = await fetch(fileUrl);
  const pdfBlob = await response.blob();
  const url = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Lab Cover(Group).pdf";
  link.click();

  URL.revokeObjectURL(url);

  button.innerText = "Lab Cover(Group)";
}

function saveRolls() {
  localStorage.setItem(
    "roll1",
    document.getElementById("roll_lab_group").value
  );
  localStorage.setItem(
    "roll2",
    document.getElementById("roll_lab_group2").value
  );
  localStorage.setItem(
    "roll3",
    document.getElementById("roll_lab_group3").value
  );
  localStorage.setItem(
    "roll4",
    document.getElementById("roll_lab_group4").value
  );
  localStorage.setItem(
    "roll5",
    document.getElementById("roll_lab_group5").value
  );
}
