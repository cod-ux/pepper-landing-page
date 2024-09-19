document.getElementById("waitlist-submit").addEventListener('click', function(event){
    event.preventDefault();
    validateInputs();
});

function validateInputs() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    let nameError = "";
    let emailError = "";

    if (name.trim() == "") {
        nameError = "Please enter your name";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError = "Please enter a valid email address";
    }

    document.getElementById("nameError").textContent = nameError;
    document.getElementById("emailError").textContent = emailError;

    if (!nameError && !emailError) {
        alert("Joined waitlist successfully!")
    }

}



