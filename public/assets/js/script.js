// GLOBAL VARIABLES
// =====================================================================================
var userSearch;

// GLOBAL FUNCTIONS
// =====================================================================================
var validateZipCode = (zc) => {
    var isZipCode = /^\d{5}$/;
    return isZipCode.test(Number(zc));
};

var isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
}

// MAIN PROCESS
// =====================================================================================
$(document).ready(() => {

    $('#sign-in').on('click', (e) => {
        e.preventDefault();
        location.assign('./search.html');
    });

    $('#sign-out').on('click', (e) => {
        e.preventDefault();
        location.assign('./index2.html');
    });

    $('#search').on('click', (e) => {

        e.preventDefault();

        // form validation
        if ($('#pet-breed').val() === 'Select' ||
            $('#pet-age').val() === 'Select' ||
            $('#pet-sex').val() === 'Select' ||
            $('#pet-distance').val() === 'Select') {
            alert('Please fill in all fields');
        }
        else if (!validateZipCode($('#zip-code').val().trim())) {
            alert('Please enter a valid zip code');
            console.log('valid zip code: ' + validateZipCode($('#zip-code').val().trim()));
        }
        else {

            // create userSearch object to use in HTTP GET request
            userSearch = {
                animal: $('#pet-type').val().toLowerCase(), // must be lowercase (only barnyard, bird, cat, dog, horse, reptile, smallfurry accepted)
                breed: $('#pet-breed').val(), // must be capitalized with spaces
                age: $('#pet-age').val(), // must be capitalized (only Baby, Young, Adult, Senior accepted)
                sex: $('#pet-sex').val(), // must be either 'M' or 'F' (capitalized)
                zipCode: $('#zip-code').val().trim() // must be a string, don't convert it into an integer
            };

            var petFinderURL = 'http://api.petfinder.com/pet.find?key=19d36f366ea3a2b37ba86aaeb7a5bbea&format=json';
            // axios.get(petFinderURL + '&animal=' + userSearch.animal + '&breed=' + userSearch.breed + '&age=' + userSearch.age + '&sex=' + userSearch.sex + '&location=' + userSearch.zipCode + '&format=json&count=1')
            // .then(response => {
            //     console.log(response);
            // })
            // .catch(err => {
            //     console.error(err);
            // });

            // WORKING!!!!
            $.get(`${petFinderURL}&animal=${userSearch.animal}&breed=${userSearch.breed}&age=${userSearch.age}&sex=${userSearch.sex}&location=${userSearch.zipCode}`)
                .done(function(data) {
                    // location.assign('./results.html');

                    console.log("==================================");
                    console.log("=========== USER SEARCH ==========");
                    console.log("==================================");
                    console.log(userSearch);

                    console.log("\n==================================");
                    console.log("========== API RESPONSE ==========");
                    console.log("==================================");
                    console.log(data);

                    var pets = data.petfinder.pets.pet;

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
                        if (breeds.breed.length > 0) {
                            for (var j = 0; j < breeds.breed.length; j++) {
                                breedsArray.push(breeds.breed[j].$t);
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
                        console.log('LOCATION: ' + contact.city + ', ' + contact.state);

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
                            console.log(photosArray.length + ' PHOTOS: \n' + photosArray.join(''));
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
                    }
                }).fail(function() {
                    console.error("error");
                });

            // $.get(petFinderURL + '&animal=dog&breed=Shiba%20Inu&age=Baby&sex=F&location=92705&output=basic')
            //     .done(function(data) {
            //         console.log(data.petfinder.pet);
            //     }).fail(function() {
            //         console.error("error");
            //     });

            // // WORKING
            // $.get(petFinderURL + '&animal=dog&breed=Shiba%20Inu&age=Baby&sex=F&location=92705')
            //     .done(function(data) {
            //         console.log(data.petfinder.pets.pet);
            //     }).fail(function() {
            //         console.error("error");
            //     });

            // console.log('valid zip code: ' + validateZipCode($('#zip-code').val().trim()));
        }
    });

});