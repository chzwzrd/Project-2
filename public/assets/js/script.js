// GLOBAL VARIABLES
// =====================================================================================
var userSearch;

// GLOBAL FUNCTIONS
// =====================================================================================
var validateName = (name) => {
    var re = /^[a-zA-Z ]{1,30}$/;
    return re.test(name.toLowerCase());
};

var validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

var validatePhone = (phone) => {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
};

var validateForm = (first, last, email, phone, pw, confirm) => {
    return validateName(first) && validateName(last) && validateEmail(email) && validatePhone(phone) && (pw.length > 7) && (pw === confirm);
}

var validateUpdateForm = (first, last, email, phone) => {
    return validateName(first) && validateName(last) && validateEmail(email) && validatePhone(phone);
};

var validateZipCode = (zc) => {
    var re = /^\d{5}$/;
    return re.test(Number(zc));
};

var isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
};

// MAIN PROCESS
// =====================================================================================
$(window).load(() => {

    // autofocus form field on load
    $("#first-name").focus();
    $("#email").focus();

    // WHEN USER REGISTERS VIA HOME PAGE
    $('#register-btn').on('click', (e) => {
        e.preventDefault();

        var registerInfo = {
            firstName: $("#first-name").val().trim(),
            lastName: $("#last-name").val().trim(),
            email: $("#reg-email").val().trim().toLowerCase(),
            phone: $("#phone").val().trim(),
            password: $("#reg-password").val().trim(),
            confirm: $("#confirm-pw").val().trim()
        };

        var firstNameLabel = $('label[for="first-name"]');
        var lastNameLabel = $('label[for="last-name"]');
        var emailLabel = $('label[for="reg-email"]');
        var phoneLabel = $('label[for="phone"]');
        var passwordLabel = $('label[for="reg-password"]');
        var confirmLabel = $('label[for="confirm-pw"]');

        // form validation
        // no empty fields
        if (registerInfo.firstName === '' ||
            registerInfo.lastName === '' ||
            registerInfo.email === '' ||
            registerInfo.phone === '' ||
            registerInfo.password === '' ||
            registerInfo.confirm === '') {
            alert('Please fill out all fields');
        } else if (!validateForm(registerInfo.firstName, registerInfo.lastName, registerInfo.email, registerInfo.phone, registerInfo.password, registerInfo.confirm)) {
            // validate name
            if (!validateName(registerInfo.firstName)) {
                firstNameLabel.text('Please enter a valid name:').css('color', 'red');
            } else {
                firstNameLabel.text('First Name:').css('color', 'rgb(0, 228, 197)');
            }
            if (!validateName(registerInfo.lastName)) {
                lastNameLabel.text('Please enter a valid name:').css('color', 'red');
            } else {
                lastNameLabel.text('Last Name:').css('color', 'rgb(0, 228, 197)');
            }

            // validate email
            if (!validateEmail(registerInfo.email)) {
                emailLabel.text('Please enter a valid email:').css('color', 'red');
            } else {
                emailLabel.text('Email:').css('color', 'rgb(0, 228, 197)');
            }

            // validate phone number
            if (!validatePhone(registerInfo.phone)) {
                phoneLabel.text('Please enter a valid phone #:').css('color', 'red');
            } else {
                phoneLabel.text('Phone:').css('color', 'rgb(0, 228, 197)');
            }

            // validate password
            if (registerInfo.password.length < 7) {
                passwordLabel.text('Must be at least 8 characters:').css('color', 'red');
            } else {
                passwordLabel.text('Password:').css('color', 'rgb(0, 228, 197)');

                // validate password match
                if (registerInfo.password !== registerInfo.confirm) {
                    confirmLabel.text('Passwords do not match:').css('color', 'red');
                } else {
                    confirmLabel.text('Confirm Password:').css('color', 'rgb(0, 228, 197)');
                }
            }
        } else { // if everything is validated
            $("label").css('color', 'rgb(0, 228, 197)');
            console.log('registration form validated');

            var registerInfo = {
                firstName: registerInfo.firstName,
                lastName: registerInfo.lastName,
                email: registerInfo.email,
                phone: registerInfo.phone.replace(/[-()]+/g, ''),
                password: registerInfo.password
            };

            axios.post('/auth/register', registerInfo)
                .then(response => { // the response is the token!
                    window.location.href = "/login";
                })
                .catch(err => {
                    console.error(err.response.data);
                    if (err.response.data === 'User Already Exists') {
                        $('label[for="reg-email"]').text('User already exists:').css('color', 'red');
                    }
                });
        }
    });

    // WHEN USER SIGNS IN VIA LOGIN PAGE
    $('#sign-in-btn').on('click', (e) => {
        e.preventDefault();
        var loginInfo = {
            email: $("#email").val().trim().toLowerCase(),
            password: $("#password").val().trim()
        };

        // form validation
        if (loginInfo.email === '' ||
            loginInfo.password === '') {
            alert('Please fill out all fields');
        } else if (!validateEmail(loginInfo.email)) {
            $('label[for="email"]').text('Please enter a valid email:').css('color', 'red');
        } else {
            $("label").css('color', 'rgb(0, 228, 197)');
            console.log('login form validated');
            // console.log('logged in as: ' + loginInfo.email, loginInfo.password);
            axios.post("/auth/login", {
                email: $("#email").val(),
                password: $("#password").val()
            })
                .then(function(response) {
                    console.log('---LOGIN SUCCESS RESPONSE---');
                    console.log(response.status);
                    console.log("logged in");
                    $('label[for="email"]').text('Email:').css('color', 'rgb(0, 228, 197)');
                    $('label[for="password"]').text('Password:').css('color', 'rgb(0, 228, 197)');
                    document.cookie = "token=" + response.data.token;
                    localStorage.setItem("token", response.data.token);
                    location.assign('/search');
                })
                .catch(function(err) {
                    console.error(typeof err.response.data);
                    if (err.response.data === 'User Not Found' || err.response.data === 'Wrong Password') {
                        $('label[for="email"]').text('Invalid email or password:').css('color', 'red');
                        $('label[for="password"]').text('Invalid email or password:').css('color', 'red');
                    }
                });
            }
        });
    
    // WHEN USER LOGS OUT
    $('#sign-out-btn').on('click', (e) => {
        e.preventDefault();
        document.cookie = "token=";
        localStorage.removeItem("token");
        location.assign('/login');
    });

    // WHEN USER SUBMITS SEARCH QUERIES VIA SEARCH FORM
    $('#search-btn').on('click', (e) => {

        e.preventDefault();

        // form validation
        if ($('#pet-breed').val() === 'Select' ||
            $('#pet-age').val() === 'Select' ||
            $('#pet-sex').val() === 'Select' ||
            $('#pet-distance').val() === 'Select') {
            alert('Please fill out all fields');
        } else if (!validateZipCode($('#zip-code').val().trim())) {
            alert('Please enter a valid zip code');
        } else {
            // create userSearch object to use in HTTP GET request
            userSearch = {
                animal: $('#pet-type').val().toLowerCase(), // must be lowercase
                breed: $('#pet-breed').val(), // must be capitalized with spaces
                age: $('#pet-age').val(), // must be capitalized (only Baby, Young, Adult, Senior accepted)
                sex: $('#pet-sex').val(), // must be either 'M' or 'F' (capitalized)
                zipCode: $('#zip-code').val().trim() // must be a string, don't convert it into an integer
            };
            
            // ROUTING TO RESULTS PAGE
            var petFinderURL = 'http://api.petfinder.com/pet.find?key=19d36f366ea3a2b37ba86aaeb7a5bbea&format=json';
            axios.get(`/pets&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`)
                .then(response => {

                    window.location.href=`/pets&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`;

                })
                .catch(err => {
                    console.error(err);
                });
        }
    });

    // WHEN USER CLICKS ON "SET PLAYDATE" WITHIN DOG MODAL 
    $("#rent-btn").on('click', (e) => {
        e.preventDefault();
        window.location.href = "/rent";
    });

    // WHEN USER CLICKS ON "MY ACCOUNT" IN DROPDOWN MENU
    $("#my-account-btn").on('click', (e) => {
        e.preventDefault();
        window.location.href = '/user';
    });

    // WHEN USER CLICKS ON "SEARCH" IN DROPDOWN MENU
    $("#search-pg-btn").on('click', (e) => {
        e.preventDefault();
        window.location.href = '/search';
    });

    // WHEN USER CLICKS ON "CREATE NEW ACCOUNT" AFTER DELETING ACCOUNT
    $("#create-account-btn").on('click', (e) => {
        e.preventDefault();
        document.cookie = "token=";
        localStorage.removeItem("token");
        window.location.href = '/';
    });

});

