var form = document.getElementById("formDataLab");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var courseCode = document.getElementById("course_code_lab").value;
  var teacherName = document.getElementById("teacher_name_lab").value;
  var experimentName = document.getElementById("experiment_name").value;
  var experimentNumber = document.getElementById("experiment_number").value;
  var roll = document.getElementById("roll_lab").value;
  var dateOfSubmission = document.getElementById("date_lab").value;

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

async function MakeLabCover() {
  const DateOfSubmission = document.getElementById("date_lab").value;
  const experimentNumber = document.getElementById("experiment_number").value;
  const textInput = document.getElementById("course_code_lab").value;
  const rollNumber = document.getElementById("roll_lab").value;
  const experimentName = document.getElementById("experiment_name").value;
  const teacherName = document.getElementById("teacher_name_lab").value;

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

    const button = document.querySelector(".labgnr");
    button.innerText = "Generating...";

    const fileUrl = "https://smartcoverbuilder.000webhostapp.com/LabCover.pdf";

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
      y: 153,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSection, {
      x: 130,
      y: 135,
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
