import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let supabase_url = "https://uvujiwiwwoqcfympcfbb.supabase.co"; 
let supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dWppd2l3d29xY2Z5bXBjZmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mzk4OTUsImV4cCI6MjA0MjMxNTg5NX0.6EkZzAL3iV5nbhzStlBH3gjCUjILk97SUag7yJZhjMk";
// Public key that has limited security access to db

const supabase = createClient(supabase_url, supabase_key);
const loading = document.getElementById("loading");
console.log(loading.textContent);

document.getElementById("waitlist-submit").addEventListener('click', function(event){
    event.preventDefault();
    loading.style.display = 'inline-block';
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
                    loading.style.display = "none";
                    alert("This email address has already been registered. I know, we're very excited too!");
                }
            } else {
                console.log("Successfully added to db.");
                loading.style.display = "none";
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

// scrollabale hyperlinks

document.getElementById("features-a").addEventListener('click', () => {
    document.getElementById("features-id").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("demo-a").addEventListener('click', () => {
    document.getElementById("demo-id").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("pricing-a").addEventListener('click', () => {
    document.getElementById("pricing-id").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("hero-button").addEventListener('click', () => {
    document.getElementById("waitlist-id").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("pricing-button-1").addEventListener('click', () => {
    document.getElementById("waitlist-id").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("pricing-button-2").addEventListener('click', () => {
    document.getElementById("waitlist-id").scrollIntoView({
        behavior: "smooth"
    });
});