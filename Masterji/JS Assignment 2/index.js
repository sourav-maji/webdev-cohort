// script.js
const apiUrl = "https://api.freeapi.app/api/v1/public/youtube/videos";

// Declare a variable to store the API response
let videoData = [];

// Function to fetch and store the videos data using async/await
async function fetchVideos() {
  try {
    const response = await fetch(apiUrl); // Use await here
    console.log("API called");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    videoData = await response.json(); // Use await to parse the response
    console.log("Fetched Data:", videoData); // Log the fetched data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchVideos();

function showRecords(localVideoData) {

  const videoCard = document.getElementById("videoCard")

  localVideoData.data.data.forEach(element => {

    let cardparent = document.createElement("div")
    cardparent.className="col-sm-3" 
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.style.width = "300px"
    

    let thumnil= document.createElement("img")
    thumnil.src = element.items.snippet.thumbnails.default.url
    cardDiv.appendChild(thumnil)

    thumnil.addEventListener("click" , function(){
        const url = `https://www.youtube.com/watch?v=${element.items.id}`
        window.location.href = url
    })

    let titleDiv = document.createElement("div")
    titleDiv.className="card-body text-center"
    
    let title = document.createElement("h5")
    title.className="card-title"
    console.log("title is : ",element.items.snippet.localized.title);
    
    title.textContent =element.items.snippet.localized.title
    titleDiv.appendChild(title)

    let channelName = document.createElement("p")
    channelName.className="card-text"
    channelName.textContent =element.items.snippet.channelTitle
    
    titleDiv.appendChild(channelName)


    cardDiv.appendChild(titleDiv)


    cardparent.appendChild(cardDiv)
    videoCard.appendChild(cardparent)    
  });

}
