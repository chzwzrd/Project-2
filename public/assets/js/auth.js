// axios.get('/api/test')
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.error(err);
// });
// if we go to this route on the browser without logging in/registering, inspect --> console will display error "VM27798 axios.min.js:8 GET http://localhost:8080/api/test 401 (Unauthorized)" and "(index):46 Error: Request failed with status code 401"
// this is possible due to the expjwt middleware we added

// // to get it working, go into POSTMAN and make a POST request to register & login --> try /api/test route again...still won't work! why? we aren't sending along a token with our request! --> grab the token from POSTMAN login request (this token is the key...normally you can do this in JS and do the work there, but see how it works here):
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3QiOm51bGwsImxhc3QiOm51bGwsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImV4cCI6MTUxNzM0NjkzMC4wNywiaWF0IjoxNTE2NzQyMTMwfQ.0FDJenAFmt6CgRYXqXrN7D5jdPNffEuluNOEbHBwyXI";
// axios.get('/api/test')
//  axios ({
//     method: 'get',
//     url: '/api/test',
//     // need to set headers (we need to change the headers b/c this is where we're going to be sending the token (google 'headers axios' or 'what do headers do'))
//     headers: {
//         'Authorization': 'Bearer ' + token // just like we did in POSTMAN
//         // this is how authentication works...you have to include the token with your requests
//         // TOKEN DOES CHANGE WITH EACH LOGIN, BUT IT'S OKAY, YOU CAN JUST USE WHATEVER TOKEN HASN'T EXPIRED FOR TESTING/DEVELOPMENT PURPOSES
//     }
//     // now directly go test out /api/test --> "{data: "You are authenticated!", status: 200, statusText: "OK", headers: {…}, config: {…}, …}"
//     // what this means is we can now go to line 28 and write "document.getElementById('msg').innerHTML(response.data);" to set the innerHTML equal to the bearer token
// })
// .then(response => {
//     console.log(response);
//     var elem = document.getElementById('msg');
//     elem.innerHTML = response.data ;
// })
// .catch(err => {
//     console.error(err);
// });

// this is called promise chaining
// 1) first register 2) then login 3) then api/test
// remember, when you use your token, have to send it in the header
// axios.post('/auth/register' {
//     email: /* user's email input from form */ "abc@gmail.com",
//     password: /* user's password input from form */ "abc123"
// })
// .then(() => {
// because tokens change every time you login, how would we generate a token normally?:
// here we're saying: 1) login 2) once you've logged in, get the token returned in the response 3) once that's done, go ahead and do the axios authentication stuff AKA hit whatever authenticated route you wanna hit
// make sure you also have your register route created so that the user can actually create an account first (line 56)
axios.post('/auth/login', {
    email: /* user's email input from form */ "abc@gmail.com",
    password: /* user's password input from from */ "abc123"
})
    .then(response => { // the response is the token!
        // console.log(response);
        // console.log(response.data.token);
        localStorage.setItem('token', response.data.token); // now, when we refresh our page, inspect --> application --> local storage, the token is stored! this means we don't have to log in again technically...if we removed the axios /auth/login post request to login after we've logged in once, we should be able to log in! (line 86) // this is what local storage is built for
        axios({
            method: 'get',
            url: '/api/test',
            headers: {
                'Authorization': 'Bearer ' + response.data.token
            }
            // wait, does this mean we need to log in every time we hit a route that require authorization? nope, line 53
        })
            .then(response => {
                console.log(response);
                var elem = document.getElementById('msg');
                elem.innerHTML = response.data;
            })
            .catch(err => {
                console.error(err);
            });
    })
    .catch(err => {
        console.error(err);
    });
// })
// .catch(err => {
//     console.error(err);
// });
// "UnauthorizedError: jwt malformed"
// error due to registering too fast...normally don't have register & login done so quickly together
// was registering and then logging in so fast that it was having an asynchrnous issue
// normally you're gonna register then redirect to a new page where you log in, not log in straight away
// the mysql wasn't done right
// remove register part for now and just do it via POSTMAN
// this is somethiing wrong with frontend code, not backend code

axios({
    method: 'get',
    url: '/api/test',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
    .then(response => {
        console.log(response);
        var elem = document.getElementById('msg');
        elem.innerHTML = response.data;
        // to get access to the payload:
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])); // split the token into its 3 parts (header, token, signature) and grab the payload
        // window.atob() is saying "take some binary 64 and convert it/deencode it"; then we take the deencoded string and parse it into JSON
        console.log(payload);
    })
    .catch(err => {
        console.error(err);
    });