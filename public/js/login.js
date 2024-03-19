/*
░░██╗░░░░██╗██╗░░        ██████╗░███████╗░██████╗░█████╗░░█████╗░░██╗░░░░░░░██╗███████╗██████╗░
░██╔╝░░░██╔╝╚██╗░        ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗░██║░░██╗░░██║██╔════╝██╔══██╗
██╔╝░░░██╔╝░░╚██╗        ██║░░██║█████╗░░╚█████╗░██║░░╚═╝███████║░╚██╗████╗██╔╝█████╗░░██████╦╝
╚██╗░░██╔╝░░░██╔╝        ██║░░██║██╔══╝░░░╚═══██╗██║░░██╗██╔══██║░░████╔═████║░██╔══╝░░██╔══██╗
░╚██╗██╔╝░░░██╔╝░        ██████╔╝███████╗██████╔╝╚█████╔╝██║░░██║░░╚██╔╝░╚██╔╝░███████╗██████╦╝
░░╚═╝╚═╝░░░░╚═╝░░        ╚═════╝░╚══════╝╚═════╝░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═════╝░
*/
document.addEventListener("DOMContentLoaded", event => {
    firebase.auth().onAuthStateChanged(user => {
        if(!user) {
            const logoutContainer = document.querySelector('.logout-container');
            logoutContainer.style.display = "none";
        } else {
            const loginContainer = document.querySelector('.login-container');
            loginContainer.style.display = "none";
        }
    });

    document.getElementById("login-btn").addEventListener('click', function () {
        let loginEmail = document.getElementById("login-email").value;
        let loginPassword = document.getElementById("login-password").value;

        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                window.location = '/';
            })
            .catch((error) => {
                const errorMessageDiv = document.querySelector('.error-message');
                errorMessageDiv.innerHTML = `
                <p style="text-align: center">Email or Password Incorrect.<br>Contact your developer if issue persists.</p>
                `
            });
    });

    document.getElementById("logout-btn").addEventListener('click', function () {
        firebase.auth().signOut().then(() => {
            // code for redirect user to Log-in page
            window.location = 'index.html'
        })
            .catch((error) => {
                console.log(error);
            });
    })
});