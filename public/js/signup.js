import axios from 'axios';

export const signupAccess = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });
        name = document.getElementById('name').value = ' ';
        email = document.getElementById('email').value = ' ';
        password = document.getElementById('password').value = '••••••••';
        passwordConfirm = document.getElementById('passwordConfirm').value = '••••••••';
    } catch (err) {
        console.log(err.response);
    }

    window.location.href = "/admin";
};