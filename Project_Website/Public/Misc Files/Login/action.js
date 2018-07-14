(function () {

    // Initialise Firebase
    const config = {
        apiKey: "AIzaSyDqlaeDVox13ySVHHh0ukCyZepg7QyD0B4",
        authDomain: "sgcomps-b8fdc.firebaseapp.com",
        databaseURL: "https://sgcomps-b8fdc.firebaseio.com",
        projectId: "sgcomps-b8fdc",
        storageBucket: "",
        messagingSenderId: "1048240965389"
    };
    firebase.initializeApp(config);

    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const btnSignUp = document.getElementById('btnSignUp');

    // Add login Event
    btnLogin.addEventListener('click', e => {
        // Get email and password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    
}());