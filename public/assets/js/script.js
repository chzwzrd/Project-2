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

    $('#register').on('click', (e) => {
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
                    console.error(err);
                });
        }
    });

    $('#sign-in').on('click', (e) => {
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
                    console.log("logged in");
                    document.cookie = "token=" + response.data.token;
                    location.assign('/search');
                })
                .catch(function(err) {
                    console.error(err);
                });
        }
    });

    $('#sign-out').on('click', (e) => {
        e.preventDefault();
        location.assign('/');
    });

    $('#search').on('click', (e) => {

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
                animal: $('#pet-type').val().toLowerCase(), // must be lowercase (only barnyard, bird, cat, dog, horse, reptile, smallfurry accepted)
                breed: $('#pet-breed').val(), // must be capitalized with spaces
                age: $('#pet-age').val(), // must be capitalized (only Baby, Young, Adult, Senior accepted)
                sex: $('#pet-sex').val(), // must be either 'M' or 'F' (capitalized)
                zipCode: $('#zip-code').val().trim() // must be a string, don't convert it into an integer
            };

            // to actually post the user's search inputs as an object to a route that contains all of the search inputs that can be accessed as PARAMETERS!!! (go look in hbs-routes.js)
            axios.post(`/pets&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`, userSearch)
            .then(response => {
                console.log(response);
                location.assign(`/pets&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`);
            })
            .catch(err => {
                console.error(err);
            });

            // purely for browser console insight:
            var petFinderURL = 'http://api.petfinder.com/pet.find?key=19d36f366ea3a2b37ba86aaeb7a5bbea&format=json';
            axios.get(`/pets&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`)
                .then(response => {
                    console.log("==================================");
                    console.log("=========== USER SEARCH ==========");
                    console.log("==================================");
                    console.log(userSearch);

                    console.log("\n==================================");
                    console.log("========== API RESPONSE ==========");
                    console.log("==================================");
                    if (response.data.petfinder.hasOwnProperty('pets')) {
                        console.log('REQUEST SUCCESSFUL');
                    } else {
                        console.log('REQUEST UNSUCCESSFUL');
                    }
                    console.log(response.data);

                    var pets = response.data.petfinder.pets.pet;

                    // how many pets found
                    console.log("\n==================================");
                    console.log("=========== PETS FOUND ===========");
                    console.log("==================================");
                    console.log(pets.length);

                    // for each pet
                    for (var i = 0; i < pets.length; i++) {

                        // capture basic info
                        var id = pets[i].id.$t;
                        var name = pets[i].name.$t;
                        var animal = pets[i].animal.$t;
                        var breeds = pets[i].breeds;
                        var breedsArray = [];
                        var age = pets[i].age.$t;
                        var sex = pets[i].sex.$t;
                        var contact = {
                            email: pets[i].contact.email.$t,
                            phone: pets[i].contact.phone.$t,
                            city: pets[i].contact.city.$t,
                            state: pets[i].contact.state.$t,
                            zip: pets[i].contact.zip.$t
                        }
                        var location = contact.city + ", " + contact.state;
                        var description = pets[i].description.$t;
                        var media = pets[i].media;
                        var photosArray = [];
                        var options = pets[i].options;
                        var optionsArray = [];

                        if (i + 1 >= 100) {
                            console.log("\n==================================");
                            console.log(`============= PET #${i + 1} ============`);
                            console.log("==================================");
                        } else if (i + 1 >= 10 && i + 1 < 100) {
                            console.log("\n==================================");
                            console.log(`============ PET #${i + 1} =============`);
                            console.log("==================================");
                        } else {
                            console.log("\n==================================");
                            console.log(`============= PET #${i + 1} =============`);
                            console.log("==================================");
                        }
                        // id
                        console.log('ID: ' + id);
                        // animal
                        console.log('ANIMAL: ' + animal);
                        // name
                        console.log('NAME: ' + name);

                        // list all breeds
                        if (isEmptyObj(breeds) === false) {
                            if (breeds.breed.length > 1) {
                                for (var j = 0; j < breeds.breed.length; j++) {
                                    breedsArray.push(breeds.breed[j].$t);
                                }
                            } else {
                                breedsArray.push(breeds.breed.$t);
                            }
                            console.log('BREEDS: ' + breedsArray.join(', '));
                        } else {
                            console.log('BREEDS: N/A');
                        }

                        // age
                        console.log('AGE: ' + age);
                        // sex
                        console.log('SEX: ' + sex);
                        // city, state located
                        console.log('LOCATION: ' + location);

                        // list all photo URLs
                        if (isEmptyObj(media) === false) {
                            var photos = media.photos;
                            for (var k = 0; k < photos.photo.length; k++) {
                                var num = 0;
                                if (photos.photo[k]['@size'] === 'x') {
                                    photosArray.push(photos.photo[k].$t);
                                    num++;
                                }
                            }
                            console.log(photosArray.length + ' PHOTOS: \n' + photosArray.join('\n'));
                        } else {
                            console.log('PHOTOS: N/A');
                        }

                        // list all pet medical info (altered, hasShots, housetrained, etc.) & preferences (noCats, noKids, etc.)
                        if (isEmptyObj(options) === false) {
                            for (var l = 0; l < options.option.length; l++) {
                                optionsArray.push(options.option[l].$t);
                            }
                            console.log('OPTIONS: ' + optionsArray.join(', '));
                        } else {
                            console.log('OPTIONS: N/A');
                        }

                        // description
                        if (description !== undefined) {
                            console.log('DESCRIPTION: \n' + description);
                        } else {
                            console.log('DESCRIPTION: N/A');
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });

});