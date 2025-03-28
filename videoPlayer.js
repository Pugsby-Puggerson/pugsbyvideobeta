function getLikes (videoId) {
    
    // Fetch like count from Supabase
    fetch("https://glkvimacflhvfgeopgmf.supabase.co/rest/v1/likes?id=eq." + videoId, {
        method: "GET",
        headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa3ZpbWFjZmxodmZnZW9wZ21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjk4NDQsImV4cCI6MjA1ODcwNTg0NH0.zijrCXZJ8XuIcv5AL9sio59rUb4vyfboeDRWKJnDQPQ",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa3ZpbWFjZmxodmZnZW9wZ21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjk4NDQsImV4cCI6MjA1ODcwNTg0NH0.zijrCXZJ8XuIcv5AL9sio59rUb4vyfboeDRWKJnDQPQ",
            "Content-Type": "application/json"
        }
        })
        .then(response => response.json())
        .then(likeData => {
        if (likeData && likeData.length > 0) {
            var likeCount = likeData[0].likes;
            console.log(likeCount)
            document.getElementById("likeCount").innerHTML = likeCount
            return likeCount;
        } else {
            console.error("No like data found");
        }
        })
        .catch(error => {
        console.error("Error fetching like count:", error);
        })
        .catch(error => {
            console.error("Error fetching like count:", error);
        });
    
}
function setLikes (videoId, setTo) {

// Fetch like count from Supabase
fetch(`https://glkvimacflhvfgeopgmf.supabase.co/rest/v1/likes?id=eq.${videoId}`, {
method: "PATCH",
headers: {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa3ZpbWFjZmxodmZnZW9wZ21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjk4NDQsImV4cCI6MjA1ODcwNTg0NH0.zijrCXZJ8XuIcv5AL9sio59rUb4vyfboeDRWKJnDQPQ",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa3ZpbWFjZmxodmZnZW9wZ21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjk4NDQsImV4cCI6MjA1ODcwNTg0NH0.zijrCXZJ8XuIcv5AL9sio59rUb4vyfboeDRWKJnDQPQ",
    "Content-Type": "application/json"
},
body: JSON.stringify({
    likes: setTo
})
})
.then(response => {
if (!response.ok) {
    throw new Error("Failed to update like count");
}
return response.json();
})
.then(updatedData => {
console.log("Like count updated successfully:", updatedData);
document.getElementById("likeCount").innerHTML = setTo;
})
.catch(error => {
console.error("Error updating like count:", error);
});

}
let videoId = "000000";
var likeCount = 0

document.addEventListener("DOMContentLoaded", () => {
// Default video ID

// Get video ID from URL parameters if available
const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get('id');
if (idFromUrl) {
videoId = idFromUrl;
}

// Fetch video data and update the page
fetch(`videos/${videoId}/data.json`)
.then(response => response.json())
.then(data => {
    if (!data || !data.name) {
        console.error("Invalid video data");
        return;
    }

    // Update the title
    const title = data.name;
    document.getElementById("title").innerHTML = title;

    // Update the video container with the video player
    document.getElementById("videoContainer").innerHTML = `
        <video
            id="video"
            controls
            preload="true"
            width="75%"
            poster="videos/${videoId}/${data.thumbnail}"
            data-setup="{}"
        >
            <source src="${data.video.replace(/PUGSBYVIDEOID/g, videoId)}" type="video/mp4" />
        </video>
    `;



    document.getElementById("creatorIcon").src = data.creator.icon;
    document.getElementById("creatorName").innerHTML = data.creator.name;
    const converter = new showdown.Converter();
    const htmlDescription = converter.makeHtml(data.description);
    document.getElementById("description").innerHTML = htmlDescription;
    likeCount = getLikes(videoId)
})
document.getElementById("likeToggle").innerHTML = 
    document.cookie.split('; ').find(row => row.startsWith(`${videoId}_liked`))?.split('=')[1] === "true" 
    ? "Unlike" 
    : "Like";
});

function toggleLike() {
    const likeCookie = `${videoId}_liked`;
    let liked = document.cookie.split('; ').find(row => row.startsWith(likeCookie))?.split('=')[1];
    getLikes(videoId)
    if (liked === undefined) {
     document.cookie = `${likeCookie}=false; path=/`;
     liked = "false";
    }

    liked = liked === "true" ? "false" : "true";
    document.cookie = `${likeCookie}=${liked}; path=/`;
    if (liked == "true") {
        setLikes(videoId, likeCount + 1);
        getLikes(videoId);
    } else {
        setLikes(videoId, likeCount - 1);
        getLikes(videoId);
    }
    console.log(`Like status for video ${videoId}: ${liked}`);
    document.getElementById("likeToggle").innerHTML = 
        document.cookie.split('; ').find(row => row.startsWith(`${videoId}_liked`))?.split('=')[1] === "true" 
        ? "Unlike" 
        : "Like";
    }