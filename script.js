import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let d_url = "https://uvujiwiwwoqcfympcfbb.supabase.co";
let d_solution = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dWppd2l3d29xY2Z5bXBjZmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mzk4OTUsImV4cCI6MjA0MjMxNTg5NX0.6EkZzAL3iV5nbhzStlBH3gjCUjILk97SUag7yJZhjMk";

const supabase = createClient(d_url, d_solution);

document.getElementById("waitlist-submit").addEventListener('click', function(event){
    event.preventDefault();
    addToWaitlist();
});

async function addToWaitlist() {
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

    let dbError = "";

    if (!nameError && !emailError) {
        try {
            const { data, error: dbError} = await supabase
            .from('waitlist')
            .insert([
                {"name":name, "email":email}
            ]);

            if (dbError) {
                console.log("Error: ", dbError);
                console.log(dbError.code)
                if (dbError.code == '23505') {
                    alert("This email address has already been registered. I know, we're very excited too!")
                }
            } else {
                console.log("Successfully added to db.");
            alert("Thank you for joining the Pepper waitlist! We'll send you an email with details on how to access Pepper soon. Have a great day! 😊");
            }
            
        }
         
        catch (err) {
            if (err) {
                console.error("Error Message: ", err);
            }
        }
        
    }

}

// Database entries


// Create a single supabase client for interacting with your database




/*
const { error } = await supabase
  .from('Waitlist')
  .insert({ id: 1, name: 'Denmark', email:"suryaganesan925@gmail.com" })

if (error) {
    console.error(error);
}

const user = {
    "name":"test-name",
    "email":"test-email"
};

const url = "https://tkevmcwtqxcbhbmxydlr.supabase.co/rest/v1/Waitlist";

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZXZtY3d0cXhjYmhibXh5ZGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MDU4MjIsImV4cCI6MjA0MjA4MTgyMn0.CDbRtooFoA5kj7GMGJUgoWlqtSggo4moGt3msVIDcAU',
    },
    body: JSON.stringify(user)
})
.then(response => response.json())
.then(user => console.log("Success: ", user))
.catch(error => console.error("Error: ", error));
*/
