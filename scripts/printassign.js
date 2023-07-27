var form = document.getElementById("formData");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const textInput = document.getElementById("course_code").value;
  const assignmentName = document.getElementById("assign_name").value;
  const teacherName = document.getElementById("teacher_name").value;
  const rollNumber = document.getElementById("roll").value;
  const DateOfSubmission = document.getElementById("date_assign").value;

  var formData = new FormData();
  formData.append("courseCode", textInput);
  formData.append("teacherName", teacherName);
  formData.append("assignmentName", assignmentName);
  formData.append("roll", rollNumber);
  formData.append("dateOfSubmission", DateOfSubmission);

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://smartcoverbuilder.000webhostapp.com/AssignmentDB.php",
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      alert(xhr.responseText);
    }
  };
  xhr.send(formData);
});

async function MakeAssignment() {
  const textInput = document.getElementById("course_code").value;
  const assignmentName = document.getElementById("assign_name").value;
  const teacherName = document.getElementById("teacher_name").value;
  const rollNumber = document.getElementById("roll").value;
  const DateOfSubmission = document.getElementById("date_assign").value;

  if (
    textInput.trim() === "" ||
    teacherName.trim() === "" ||
    assignmentName.trim() === "" ||
    rollNumber.trim() === "" ||
    DateOfSubmission.trim() === ""
  ) {
    alert("All fields are required!");
  } else if (
    parseInt(rollNumber) >= 2103001 &&
    parseInt(rollNumber) <= 2103181
  ) {
    const newRollValue = document.getElementById("roll").value;

    localStorage.setItem("roll", newRollValue);

    const button = document.querySelector(".assgnr");
    button.innerText = "Generating...";

    const fileUrl =
      "https://smartcoverbuilder.000webhostapp.com/Assignment.pdf";

    const response = await fetch(fileUrl);
    const pdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    const timesNewRomanFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.TimesRoman
    );

    const page = pdfDoc.getPages()[0];

    const courseName = course_details[textInput].name;
    const courseCode = course_details[textInput].code;
    page.drawText(courseName, {
      x: 210,
      y: 350,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(courseCode, {
      x: 210,
      y: 317,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText(assignmentName, {
      x: 210,
      y: 284,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const studentName = student_data["n" + rollNumber].name;
    const studentSection = student_data["n" + rollNumber].section;
    const studentSeries = student_data["n" + rollNumber].series + "";
    page.drawText(studentName, {
      x: 120,
      y: 185,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(rollNumber, {
      x: 110,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSection, {
      x: 130,
      y: 153,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(studentSeries, {
      x: 130,
      y: 137,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    const teacherNameText = teacher_list[teacherName].name;
    const teacherDesignation = teacher_list[teacherName].designation;
    page.drawText(teacherNameText, {
      x: 320,
      y: 185,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText(teacherDesignation, {
      x: 320,
      y: 170,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });

    page.drawText("Rajshahi University of Engineering and", {
      x: 320,
      y: 155,
      size: 12,
      font: timesNewRomanFont,
      color: PDFLib.rgb(0, 0, 0),
    });
    page.drawText("Technology", {
      x: 320,
      y: 140,
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
    link.download = assignmentName + " Assignment.pdf";
    link.click();

    URL.revokeObjectURL(url);

    button.innerText = "Generate PDF";
  }
}

async function downloadAssignment() {
  const button = document.querySelector(".assdow");
  button.innerText = "Downloading...";

  const fileUrl = "https://smartcoverbuilder.000webhostapp.com/Assignment.pdf";

  const response = await fetch(fileUrl);
  const pdfBlob = await response.blob();
  const url = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Assignment.pdf";
  link.click();

  URL.revokeObjectURL(url);

  button.innerText = "Assignment";
}
