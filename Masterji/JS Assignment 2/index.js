// script.js
const apiUrl = "https://api.freeapi.app/api/v1/public/youtube/videos";

// Declare a variable to store the API response
let videoData = [];

// Function to fetch and store the videos data using async/await
async function fetchVideos() {
  try {
    const response = await fetch(apiUrl);
    // console.log("API called");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    videoData = await response.json();
    // console.log("Fetched Data:", videoData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchVideos();

function showRecords(localVideoData) {
  const videoCard = document.getElementById("videoCard");
  videoCard.textContent = "";
  if (localVideoData.length < 1) {
    videoCard.textContent = "No Video Found";
  }

  localVideoData.forEach((element) => {
    let cardparent = document.createElement("div");
    cardparent.className = "col-sm-3";
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.width = "300px";

    let thumnil = document.createElement("img");
    thumnil.src = element.items.snippet.thumbnails.default.url;
    cardDiv.appendChild(thumnil);

    thumnil.addEventListener("click", function () {
      const url = `https://www.youtube.com/watch?v=${element.items.id}`;
      window.location.href = url;
    });

    let titleDiv = document.createElement("div");
    titleDiv.className = "card-body text-center";

    let title = document.createElement("h5");
    title.className = "card-title";
    // console.log("title is : ",element.items.snippet.localized.title);

    title.textContent = element.items.snippet.localized.title;
    titleDiv.appendChild(title);

    let channelName = document.createElement("p");
    channelName.className = "card-text";
    channelName.textContent = element.items.snippet.channelTitle;

    titleDiv.appendChild(channelName);

    cardDiv.appendChild(titleDiv);

    cardparent.appendChild(cardDiv);
    videoCard.appendChild(cardparent);
  });
}

// Search functionality implementation

const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");

if (searchButton) {
  searchButton.addEventListener("click", function () {
    const userInput = searchBox.value;
    if (!userInput) {
      return;
    }
    const filteredVideoData = searchVideos(videoData, userInput);
    showRecords(filteredVideoData);
  });
}

function searchVideos(localVideoData, userInput) {
//   console.log(userInput);
//   console.log(localVideoData);

  const filteredVideoData = localVideoData.data.data.filter((e) => {
    const apiVideoTitle = e.items.snippet.localized.title.toLowerCase();
    if (apiVideoTitle.includes(userInput.toLowerCase())) {
      return true;
    }
  });

  console.log("filteredVideoData", filteredVideoData);

  return filteredVideoData;
}
