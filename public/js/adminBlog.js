import axios from 'axios';

// Blog Page
export const submitBlogPage = async (data) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/blogpage/5ea5e0205978715be4138f75`,
            data
        });

        location.reload();

    } catch (err) {
        console.log(err);
    }
};

// Blog Post
export const submitBlogPost = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/blog`,
            data
        });

        location.reload();

    } catch (err) {
        console.log(err);
    }
};

// Select Popular

export const submitPopularPost = async () => {
    try {
        const popular = document.querySelectorAll('.selectCheckedPost');
        for (let i = 0; i < popular.length; i++) {
            if (popular[i].checked) {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/blog/popular/${popular[i].value}`,
                    data: {
                        popular: popular[i].checked
                    }
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }
};

// Delete Post
export const submitDeletePost = async () => {
    try {
        const checked = document.querySelectorAll('.deleteCheckedPost');
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                const resDelete = await axios({
                    method: 'DELETE',
                    url: `/api/v1/blog/${checked[i].value}`
                });
            }
        }
        location.reload();
    } catch (err) {
        console.log(err);
    }

};

