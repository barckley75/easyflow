import axios from 'axios';

// Work Description
export const submitWork = async (data) => {
    document.getElementById('wait').textContent = 'Saving Your Item';
    document.querySelector('.loader').style.display = "block";
    document.querySelector('.loader').style.position = "fixed";
    document.querySelector(".work").style.display = "none";
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/works`,
            data
        });

        location.reload();
    } catch (err) {
        document.querySelector('.loader').style.display = "none";
        console.log(err.response.data.message);
        // setTimeout(location.reload(), 2000);
    }
};

// Delete Work
export const submitDelete = async () => {
    try {
        const checked = document.querySelectorAll('.deleteCheckedWork');
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                console.log(`/api/v1/works/${checked[i].value}`);
                const resDelete = await axios({
                    method: 'DELETE',
                    url: `/api/v1/works/${checked[i].value}`
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
};