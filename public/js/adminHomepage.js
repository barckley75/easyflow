import axios from 'axios';

// Create Homepage
export const submitCreateHomepage = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/homepage',
            data
        });
        location.reload();
    } catch (err) {
        console.log(err.response.data);
    }
};

// Select Homepage
export const submitSelect = async () => {
    try {
        const checked = document.querySelectorAll('.selectHomepageChecked');
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/homepage/select/${checked[i].value}`,
                    data: {
                        publish: checked[i].checked
                    }
                });
            }
        }


        location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Update Homepage
export const submitUpdateHomepage = async (data) => {
    try {
        const checked = document.querySelectorAll('.selectUpdateHomepageChecked');
        for (i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/homepage/${checked[i].value}`,
                    data
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Delete Homepage
export const submitDeleteHomepage = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/homepage`
        });

        const checked = document.querySelectorAll('.deleteCheckedHomepage');
        for (i = 0; i < res.data.data.homepage.length; i++) {
            if (checked[i].checked) {
                console.log(`/api/v1/homepage/${checked[i].value}`);
                const resDelete = await axios({
                    method: 'DELETE',
                    url: `/api/v1/homepage/${res.data.data.homepage[i]._id}`
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
};