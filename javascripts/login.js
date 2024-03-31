//hacking type animated words
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

function startLetterHack(element) {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
  const headingElement = document.querySelector(".headingval");
  startLetterHack(headingElement);
});

// login val 
function val_s_mail(){
    const l_email =document.getElementById("l_email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(l_email)) {
      document.getElementById("email_err").textContent =
        "*Enter Valid Email ID";
      document.getElementById("l_email").style.border = "1px solid red";
      return false;
    } else {
      document.getElementById("email_err").textContent = "";
      document.getElementById("l_email").style.border = "1px solid black";
      return true;
    }
  }

//  login blah

let globalToken = "";
document.getElementById("btn_login").addEventListener("click", async(event)=>{
    event.preventDefault();

    const email = document.getElementById("l_email").value;
    const password = document.getElementById("l_password").value;

    // You can add additional client-side validation here if needed

    // Send data to the server using fetch
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        localStorage.setItem("userToken", data.token)
        alert("Login successful");
        window.location.href = "logHome.html";
        // Redirect to the home page or perform other actions
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });

