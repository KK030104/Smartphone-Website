const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
const reviewText = document.getElementById("review");
const submitBtn = document.getElementById("submit");
const reviewsContainer = document.getElementById("reviews");
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
};

stars.forEach((star) => {
    star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));
        rating.innerText = value;
 
        // Remove all existing classes from stars
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five"));
 
        // Add the appropriate class to 
        // each star based on the selected star's value
        stars.forEach((s, index) => {
            if (index < value) {
                s.classList.add(getStarColorClass(value));
            }
        });
 
        // Remove "selected" class from all stars
        stars.forEach((s) => s.classList.remove("selected"));
        // Add "selected" class to the clicked star
        star.classList.add("selected");
    });
});
 
submitBtn.addEventListener("click", () => {
    const review = reviewText.value;
    const userRating = parseInt(rating.innerText);
 
    if (!userRating || !review) {
        alert(
"Please select a rating and provide a review before submitting."
             );
        return;
    }
 
    if (userRating > 0) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = 
`<p><strong>Rating: ${userRating}/5</strong></p><p>${review}</p>`;
        reviewsContainer.appendChild(reviewElement);
 
        // Reset styles after submitting
        reviewText.value = "";
        rating.innerText = "0";
        stars.forEach((s) => s.classList.remove("one", 
                                                "two", 
                                                "three", 
                                                "four", 
                                                "five", 
                                                "selected"));
    }
});
 
function getStarColorClass(value) {
    switch (value) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        default:
            return "";
    }
};
function myFunction() {
    var searchbtn = document.getElementById('searchbar').value;
    
    if (searchbtn == 'iphone 12') {
        window.open("http://127.0.0.1:5500/iphone12.html")
      }
    if (searchbtn == 'iphone 13') {
      window.open("http://127.0.0.1:5500/iphone13.html")
    }
    if (searchbtn == 'iphone 13 pro') {
      window.open("http://127.0.0.1:5500/iphone13pro.html")
    }
    if (searchbtn == 'iphone 14') {
      window.open("http://127.0.0.1:5500/iphone14.html")
    }
    if (searchbtn == 'iphone 14 plus ') {
      window.open("http://127.0.0.1:5500/iphone14plus.html")
    }
    if (searchbtn == 'iphone 14 pro') {
      window.open("http://127.0.0.1:5500/iphone14pro.html")
    }
    if (searchbtn == 'iphone 14 pro max') {
      window.open("http://127.0.0.1:5500/iphone14promax.html")
    }
    if (searchbtn == 'iphone 15 ') {
      window.open("http://127.0.0.1:5500/iphone15.html")
    }
    if (searchbtn == 'iphone 15 plus') {
      window.open("http://127.0.0.1:5500/iphone15plus.html")
    }
    if (searchbtn == 'iphone 15 pro') {
      window.open("http://127.0.0.1:5500/iphone15pro.html")
    }
    if (searchbtn == 'iphone 15 pro max') {
      window.open("http://127.0.0.1:5500/iphone15promax.html")
    }
    if (searchbtn == 'samsung s22') {
      window.open("http://127.0.0.1:5500/samsungs22.html")
    }
    if (searchbtn == 'samsung s22 plus') {
      window.open("http://127.0.0.1:5500/samsungs22plus.html")
    }
    if (searchbtn == 'samsung s22 ultra') {
      window.open("http://127.0.0.1:5500/samsungs22ultra.html")
    }
    if (searchbtn == 'samsung s23 ') {
      window.open("http://127.0.0.1:5500/samsungs23.html")
    }
    if (searchbtn == 'samsung s23 fe') {
      window.open("http://127.0.0.1:5500/samsungs23fe.html")
    }
    if (searchbtn == 'samsung s23 plus') {
      window.open("http://127.0.0.1:5500/samsungs23plus.html")
    }
    if (searchbtn == 'samsung s23 ultra') {
      window.open("http://127.0.0.1:5500/samsungs23ultra.html")
    }
    if (searchbtn == 'realme 8') {
      window.open("http://127.0.0.1:5500/realme8.html")
    }
    if (searchbtn == 'realme 8 pro') {
      window.open("http://127.0.0.1:5500/realme8pro.html")
    }
    if (searchbtn == 'realme 9 ') {
      window.open("http://127.0.0.1:5500/realme9.html")
    }
    if (searchbtn == 'realme 9 pro ') {
      window.open("http://127.0.0.1:5500/realme9pro.html")
    }
    if (searchbtn == 'realme 11 pro') {
      window.open("http://127.0.0.1:5500/realme11pro.html")
    }
    if (searchbtn == 'realme narzo n55 ') {
      window.open("http://127.0.0.1:5500/realmen60.html")
    }
    else {
      alert("Please enter valid name may be this product is not available")
    };
};
