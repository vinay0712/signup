const form = document.getElementById('form'); //form element
const username = document.getElementById('username'); //username input element
const email = document.getElementById('email'); //email input element
const password = document.getElementById('password'); //password input element
const repassword = document.getElementById('repassword'); //repassword input element

//input error
function error(input,message){
    input.className = 'form-control is-invalid';//error function runs and is-invalid css class is used together with form-control class
    const div = input.nextElementSibling; //the element where the message will be printed (the element immediately after the input, div)
    div.innerText = message; //message written into div
    div.className = 'invalid-feedback';//invalid-feedback class added to the div where the message will be printed

}

//input sucess
function success(input){
    input.className = 'form-control is-valid' //success function runs and is-valid css class is used together with form-control class
}

//email verification
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     ^ asserts the start of the string.
// The outermost parentheses () define the entire pattern.
// Inside the outer parentheses, the pattern is divided into two parts separated by @.
// The first part matches the local part of the email address before the @ symbol.
// The second part matches the domain part of the email address after the @ symbol.
// Let's break down each part:

// The local part:
// [^<>()\[\]\\.,;:\s@"]+ matches one or more characters that are not <>()\[\]\\.,;:\s@"].
// (\.[^<>()\[\]\\.,;:\s@"]+)* matches zero or more occurrences of a dot followed by one or more characters that are not <>()\[\]\\.,;:\s@"].
// "(.+)" matches a string enclosed in double quotes.
// The entire local part is represented as (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")).
// The domain part:
// \[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\] matches an IP address enclosed in square brackets.
// ([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,} matches one or more occurrences of a domain label (alphanumeric characters and hyphens) followed by a dot, ending with a domain suffix of at least two letters.
// $ asserts the end of the string.
    return re.test(String(email).toLowerCase()); //translate regex expression
}

//data length control
function checkLength(input,min,max){
    if(input.value.length < min){ //minimum character check
        error(input,`${input.id} Must be at least ${min} characters`);
    }else if(input.value.length > max){ //maximum character check
        error(input,`${input.id} Must be at most ${max} characters`);
    }else{ //if it meets the character length conditions
        success(input);
    }
}

//password match check
function checkPasswords(pass1,pass2){
    if(pass1.value !== pass2.value){
        error(pass2,'Passwords do not match!');
    }else{
        success(pass2);
    }
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    if(username.value === ''){  //if username input is left blank
        error(username,'Username field cannot be left blank!'); 
    }else{ 
        checkLength(username,6,12);   
    }if(email.value === ''){ //if email input is left blank
        error(email,'Email field cannot be left blank!');
    }else if(!validateEmail(email.value)){ 
        //mail format control
        error(email,'Enter your e-mail address in the appropriate format!');
    }else{
        success(email);
    }if(password.value === ''){ //if password input is left blank
       error(password,'Password cannot be left blank!');
    }else{
        checkLength(password,6,30);
    }if(repassword.value === ''){ //if repassword input is left blank
        error(repassword,'Confirm Password cannot be left blank!');
    }else{
        checkPasswords(password,repassword);
    }
});