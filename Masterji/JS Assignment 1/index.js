const emoji = {
  happy:"😊",
  sad:"😢",
  neutral:"😐",
  excited:"😄"
}

const saveButton = document.getElementById("saveButton");
const inputDateElement = document.getElementById("inputDate");
const showRecordButton = document.getElementById("showRecord");
const moodElement = document.getElementsByName("mood");
const warningMessage = document.getElementById("warningMessage");

// Load the local storage data if found else intilize with empty array
let totalMood = JSON.parse(localStorage.getItem("Total")) || [];
console.log("totalMood", totalMood);

if(inputDateElement){
  inputDateElement.value = new Date().toISOString().split("T")[0];
}

if (saveButton) {
  saveButton.addEventListener("click", saveData);
}
if (showRecordButton) {
  showRecordButton.addEventListener("click", showRecord);
}

const currentDate = new Date();
function saveData() {
  let moodElemtValue = "";
  const inputDateValue = inputDateElement.value;
  // console.log(inputDateElement.value);

  // check for duplicate value

  const isDuplicate = checkDuplicate(totalMood, inputDateValue);
  if (isDuplicate) {
    console.log("Duplicate Record");
    warningMessage.textContent = "Duplicate Record";
    warningMessage.style.color = "orange";
    return;
  }

  for (i = 0; i < moodElement.length; i++) {
    if (moodElement[i].checked) {
      moodElemtValue = moodElement[i].value;
      console.log(moodElemtValue);
    }
  }

  if (!inputDateElement || !moodElemtValue) {
    console.log("Please Enter all the field");
    warningMessage.textContent = "Please Enter All the Fields";
    warningMessage.style.color = "orange";
    return;
  }

  const moodData = {
    date: inputDateValue,
    value: moodElemtValue,
  };

  totalMood.push(moodData);
  localStorage.setItem("Total", JSON.stringify(totalMood))
  warningMessage.textContent = "Data Saved Successfully";
  warningMessage.style.color = "green";


  // Reloads the page after time out
  setTimeout(function () {
    window.location.reload();
  }, 2000);
}

function showRecord() {
  console.log(totalMood);
  // Similar behavior as clicking on a link
  window.location.href = "./report.html";
}

// Report Page

const headingLabelElement = document.getElementById("headingLabel");

function showReport(reportDataValue) {
  let reportTableBodyElement = document.getElementById("reportTableBody");
  reportTableBodyElement.textContent = "";
  let slNo = 1;
  reportDataValue.forEach((e) => {
    const reportRow = document.createElement("tr");
    let reportSl = document.createElement("td");
    reportSl.textContent = slNo;
    slNo++;
    let reportDate = document.createElement("td");
    reportDate.textContent = e.date;
    let reportValue = document.createElement("td");
    reportValue.textContent = emoji[e.value];

    reportRow.appendChild(reportSl);
    reportRow.appendChild(reportDate);
    reportRow.appendChild(reportValue);
    reportTableBodyElement.appendChild(reportRow);
  });
}

function pastDaysCalculate() {
  // console.log("called");

  const oneDaysAgo = new Date();
  oneDaysAgo.setDate(currentDate.getDate() - 2);

  const last1DaysData = totalMood.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneDaysAgo && itemDate <= currentDate;
  });

  console.log("Last 2 days data : ", last1DaysData);
  showReport(last1DaysData);
  const headingLabel = document.getElementById("headingLabel");
  headingLabel.textContent = "Last 1 ";
}

function sevenDaysCalculate() {
  // Get the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Filter data to get only the entries from the last 7 days
  const last7DaysData = totalMood.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= sevenDaysAgo && itemDate <= currentDate;
  });

  console.log("77777", last7DaysData);

  showReport(sortMoodDataBasedOnDate(last7DaysData));
  const headingLabel = document.getElementById("headingLabel");
  headingLabel.textContent = "Last 7 ";
}

function lastMonthCalculation() {
  // Get 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  let last30DaysData = totalMood.filter((item) => {
    const itemDate = new Date(item.date);

    return itemDate >= thirtyDaysAgo && itemDate <= currentDate;
  });

  console.log("30 Days data : ", last30DaysData);

  const sortedData = sortMoodDataBasedOnDate(last30DaysData);
  console.log("sortedData", sortedData);
  showReport(sortedData);
  const headingLabel = document.getElementById("headingLabel");
  headingLabel.textContent = "Last Month ";
}

function sortMoodDataBasedOnDate(moodData) {
  return moodData.sort((a, b) => new Date(a.date) - new Date(b.date));
}

const last1dayElement = document.getElementById("last1day");
const last7dayElement = document.getElementById("last7day");
const last30dayElement = document.getElementById("last30day");

if (last1dayElement && last7dayElement && last30dayElement) {
  last1dayElement.addEventListener("click", pastDaysCalculate);
  last7dayElement.addEventListener("click", sevenDaysCalculate);
  last30dayElement.addEventListener("click", lastMonthCalculation);
}

function checkDuplicate(inputObject, inputValue) {
  let res = inputObject.filter((ele) => ele.date === inputValue);
  return res.length;
}
