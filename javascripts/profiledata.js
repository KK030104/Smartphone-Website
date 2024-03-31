
// view for profile info 
document.addEventListener("DOMContentLoaded", async function () {
    
    const token = localStorage.getItem("userToken");
    console.log("Token from login script:", token);
    
    
    if (token) {
      try { 
          const response = await fetch("http://localhost:3000/api/v1/profile/getProfile", {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          });
  
          const data = await response.json();
  
          if (response.ok) {
              // Update the #profile element with the username
              const profileElement = document.getElementById("profile");
              profileElement.textContent = data.name;
              
              // You can also handle other profile data as needed
          } else {
              // Handle error response
              console.error("Error:", data.message);
          }
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }
  });
  
  