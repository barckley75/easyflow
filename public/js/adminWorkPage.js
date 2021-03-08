import axios from 'axios';

export const submitCreateWorkPage = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/workpage`,
            data
        });
        location.reload();
    } catch (err) {
        console.log(err.response.data);
    }
};

// Select Work Page
export const submitSelectWorkPage = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/workpage`
        });
        const checked = document.querySelectorAll('.selectWorkPageChecked');
        for (let i = 0; i < res.data.data.workPage.length; i++) {
            if (checked[i].checked) {
                const resSelectWorkPage = await axios({
                    method: 'PATCH',
                    url: `/api/v1/workpage/select/${checked[i].value}`,
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

// Update WorkPage
export const submitUpdateWorkPage = async (data) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/workpage`
        });

        const checked = document.querySelectorAll('.selectUpdateWorkPageChecked');
        for (let i = 0; i < res.data.data.workPage.length; i++) {
            if (checked[i].checked) {
                console.log(`/api/v1/workpage/${checked[i].value}`);
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/workpage/${checked[i].value}`,
                    data
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Delete Work Page
export const submitDeleteWorkPage = async (data) => {
    try {
        const checked = document.querySelectorAll('.deleteCheckedWorkPage');
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                console.log(`/api/v1/workpage/${checked[i].value}`);
                const res = await axios({
                    method: 'DELETE',
                    url: `/api/v1/workpage/${checked[i].value}`
                });
            }
        }
        location.reload();

    } catch (err) {
        console.log(err);
    }
};