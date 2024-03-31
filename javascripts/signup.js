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

// validation

// function sivalidate(){
//   var name=document.getElementById("s_name").value
//   var mail=document.getElementById("s_email").value
//   var c_num=document.getElementById("s_contact").value
//   var passwd=document.getElementById("s_pass").value
//   var c_passwd=document.getElementById("s_c_pass").value
//   console.log(name,val_name(name))
//   console.log(mail,val_mail())
//   console.log(c_num,!val_num(c_num))
//   console.log(passwd,!val_pass(passwd))
//   console.log(c_passwd,!val_cpass())
//   if(!val_name(name)  && !val_mail() && !val_num(c_num) && val_pass(passwd) && val_cpass())
//   {
//     return false;
//   }
//   return true;
// }

function val_name(input) {
  const name = input.value;
  var allowd = /^[A-Za-z\s]+$/;
  if(name!=undefined){
     if (!allowd.test(name)) {
    document.getElementById("nam_err").textContent =
      "* only letters &spaces allowed";
    document.getElementById("s_name").style.border = "1px solid red";
    return false;
  } else {
    document.getElementById("nam_err").textContent = "";
    document.getElementById("s_name").style.border = "1px solid black";
    return true;
  }
  }
  else{
    return false;
  }
 
}
function val_mail() {
  const email =document.getElementById("s_email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email_err").textContent =
      "*Enter Valid Email ID";
    document.getElementById("s_email").style.border = "1px solid red";
    return false;
  } else {
    document.getElementById("email_err").textContent = "";
    document.getElementById("s_email").style.border = "1px solid black";
    return true;
  }
}
function val_num(numb){
  const conta = numb.value;
  const alnum = /^\d{10}$/;
  if (!alnum.test(conta)) {
    document.getElementById("cont_err").textContent =
      "*Enter a Valid Number";
    document.getElementById("s_contact").style.border = "1px solid red";
    return false;
  } else {
    document.getElementById("cont_err").textContent = "";
    document.getElementById("s_contact").style.border = "1px solid black";
    return true;
  }
}
function val_pass(pass){
  const pswd= pass.value;
  if(pswd != undefined){
    if (pswd.length >6) {
      document.getElementById("pass_err").textContent =
      "";
      document.getElementById("s_pass").style.border = "1px solid black";
      return true;
    } else {
      document.getElementById("pass_err").textContent =
      "*mininum 6 charactor required "; 
      document.getElementById("s_pass").style.border = "1px solid red";
      return false;
    }
  }
  else{
    return false;
  }
  
}
function val_cpass(vpass){
  const passwd =document.getElementById("s_pass").value;
  const cpass =vpass.value;
  if(cpass!= undefined){
   if (passwd == cpass) {
    document.getElementById("vpass_err").textContent =
    "";
    document.getElementById("s_c_pass").style.border = "1px solid black";
    return true;
  } else {
    document.getElementById("vpass_err").textContent =
    "*Password do not match! "; 
    document.getElementById("s_c_pass").style.border = "1px solid red";
    return false;
  } 
  }
  else{
    return false; 
  }
  
}


// try to add data into db

  document.getElementById("signup_btn").addEventListener("click", async(event)=>{
    event.preventDefault();
    var name=document.getElementById("s_name").value
    var mail=document.getElementById("s_email").value
    var c_num=document.getElementById("s_contact").value
    var passwd=document.getElementById("s_pass").value
    var c_passwd=document.getElementById("s_c_pass").value
  
    var data = {
      "name": name,
      "email": mail,
      "contact": c_num,
      "password": passwd,
      "confirmPassword": c_passwd,
    }
    let resData;
    try{
      const response = await fetch("http://localhost:3000/api/v1/user/signup", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      const resData = await response.json();
      console.log(resData);
      if(resData.success==true){
        // navigate to login page
        window.location.href = "http://127.0.0.1:5500/Login.html"
      }
      else{
        document.getElementById("error_msg").textContent= resData.message;

      }
    }catch(err){
      console.log(err);
      
    }
  });
