import axios from 'axios';

export const loginAccess = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        email = document.getElementById('email').value = '';
        password = document.getElementById('password').value = '';
    } catch (err) {
        console.log(err.response.data);
    }

    window.location.href = "/admin";
};