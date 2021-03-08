import axios from 'axios';

export const submitUpdateContacts = async (data) => {
    try {
        for (let pair of data.entries()) {
            console.log(pair);
        }
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/contacts/5ec9650b545d615f3c7be4bc',
            data
        });
        location.reload();
    } catch (err) {
        console.log(err);
    }
};