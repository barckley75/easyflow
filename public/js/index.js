import '@babel/polyfill';
import './script';
import { hideLabel } from './home';
import { loginAccess } from './login';
import { signupAccess } from './signup';
import { inizializePage, switchMenu } from './adminMenu';
import { submitCreateHomepage, submitUpdateHomepage, submitSelect, submitDeleteHomepage } from './adminHomepage';
import { submitCreateWorkPage, submitSelectWorkPage, submitUpdateWorkPage, submitDeleteWorkPage } from './adminWorkPage';
import { submitWork, submitDelete } from './adminWork';
import { submitBlogPage, submitBlogPost, submitPopularPost, submitDeletePost } from './adminBlog';
import { addItemToCart, deleteItemFromCart } from './adminCart';
import { submitUpdateContacts } from './adminContacts';

// Home
const titleOverVideo = document.querySelector(".titleOverVideo");

// Login - signup
const login = document.querySelector('.loginForm');
const signup = document.querySelector('.signupForm');

// Admin Page
// _adminMenu
const chooseMenu = document.getElementById('chooseForm');

// _adminHomepage
const createHomepageForm = document.querySelector('.createHomepageForm');
const selectHomepageForm = document.querySelector('.selectHomepageForm');
const updateHomepageForm = document.querySelector('.updateHomepageForm');
const deleteHomepageForm = document.querySelector('.deleteHomepageForm');

// _adminWorkPage
const createWorkPageForm = document.querySelector('.createWorkPageForm');
const selectWorkPageForm = document.querySelector('.selectWorkPageForm');
const updateWorkPageForm = document.querySelector('.updateWorkPageForm');
const deleteWorkPageForm = document.querySelector('.deleteWorkPageForm');

// _adminWork
const workDesc = document.querySelector('.workForm');
const deleteWork = document.querySelector('.deleteForm');

// _adminBlog
const blogPage = document.querySelector('.blogPageForm');
const blogPost = document.querySelector('.blogForm');
const selectPopularForm = document.querySelector('.selectPopularForm');
const blogDelete = document.querySelector('.deletePostForm');

// shop Page
const cart = document.getElementById('cart');
const checkOut = document.getElementById('cartTitle');

// cart Page
const deleteItem = document.querySelectorAll('.deleteItem');

// contacts
const updateContactsForm = document.querySelector('.updateContactsForm');

// HOME
if (titleOverVideo) {
    hideLabel();
}

//------------------------- LOGIN SECTION ----------------------------
// Login
if (login) {
    login.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loginAccess(email, password);
    });
}

// Signup
if (signup) {
    signup.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('nameSignup').value;
        const email = document.getElementById('emailSignup').value;
        const password = document.getElementById('passwordSignup').value;
        const passwordConfirm = document.getElementById('passwordConfirmSignup').value;

        signupAccess(name, email, password, passwordConfirm);
    });
};

//--------------------------------------------------------------------
//------------------------- ADMIN SECTION ----------------------------
//--------------------------------------------------------------------


//------------------------- ADMIN MENU ----------------------------
if (chooseMenu) {
    inizializePage();
    chooseMenu.addEventListener('change', e => {
        e.preventDefault();
        inizializePage();
        switchMenu();
    });
}

//------------------------- ADMIN HOMEPAGE ----------------------------

// Create Homepage
if (createHomepageForm) {
    createHomepageForm.addEventListener('submit', e => {
        e.preventDefault();

        // titleOverVideo and videoCover correspond with name in the homepage model
        const form = new FormData();
        form.append('titleOverVideo', document.getElementById('createTitleOverVideo').value);
        form.append('videoCover', document.getElementById('createVideoCover').files[0]);
        submitCreateHomepage(form, 'data');
    });
}

// Select Homepage
if (selectHomepageForm) {
    selectHomepageForm.addEventListener('submit', e => {
        e.preventDefault();
        submitSelect();
    });
}

// Update Homepage
if (updateHomepageForm) {
    updateHomepageForm.addEventListener('submit', e => {
        e.preventDefault();

        const form = new FormData();
        form.append('titleOverVideo', document.getElementById('titleOverVideo').value);
        form.append('videoCover', document.getElementById('videoCover').files[0]);
        submitUpdateHomepage(form, 'data');
    });
}

//Delete Hompage
if (deleteHomepageForm) {
    deleteHomepageForm.addEventListener('submit', e => {
        e.preventDefault();
        submitDeleteHomepage();
    });
}

//------------------------- ADMIN WORK PAGE ----------------------------

// Create Work Page
if (createWorkPageForm) {
    createWorkPageForm.addEventListener('submit', e => {
        e.preventDefault();

        const form = new FormData();

        form.append('title', document.getElementById('createTitle').value);
        form.append('subTitle', document.getElementById('createSubTitle').value);
        form.append('imageCover', document.getElementById('createImageCover').files[0]);

        submitCreateWorkPage(form, 'data');
    });
}

// Select Homepage
if (selectWorkPageForm) {
    selectWorkPageForm.addEventListener('submit', e => {
        e.preventDefault();
        submitSelectWorkPage();
    });
}

// Update Homepage
if (updateWorkPageForm) {
    updateWorkPageForm.addEventListener('submit', e => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', document.getElementById('updateTitle').value);
        form.append('subTitle', document.getElementById('updateSubTitle').value);
        form.append('imageCover', document.getElementById('updateImageCover').files[0]);
        submitUpdateWorkPage(form, 'data');
    });
}

// Delete Work Page
if (deleteWorkPageForm) {
    deleteWorkPageForm.addEventListener('submit', e => {
        e.preventDefault();
        submitDeleteWorkPage();
    });
}

//------------------------- ADMIN WORK DESCRIPTION ----------------------------

// Work Description
if (workDesc) {
    workDesc.addEventListener('submit', e => {
        e.preventDefault();
        const imagePosters = document.querySelector('.imagePoster').files;
        // FormData works only with multer, giving access to req.file
        // In router needs to add upload middleware
        const form = new FormData();
        form.append('workName', document.getElementById('workName').value);
        form.append('workTitle', document.getElementById('workTitle').value);
        form.append('price', document.getElementById('price').value);
        form.append('description', description.value);
        form.append('imagePreview', document.getElementById('imagePreview').files[0]);
        form.append('imageCover', document.getElementById('imageCover').files[0]);

        for (let i = 0; i < imagePosters.length; i++) {
            form.append('imagePoster', imagePosters[i]);
        }
        submitWork(form, 'data');
    });
}

// Delete Work
if (deleteWork) {
    deleteWork.addEventListener('submit', e => {
        e.preventDefault();
        submitDelete();
    });
}

//------------------------- ADMIN BLOG ----------------------------
// Blog Page
if (blogPage) {
    blogPage.addEventListener('submit', e => {
        e.preventDefault();

        const blogForm = {
            blogTitle: document.getElementById('blogTitle').value,
            blogName: document.getElementById('blogName').value,
            aboutMe: document.getElementById('aboutMe').value
        };

        submitBlogPage(blogForm, 'data');
    });
}

// Blog Post
if (blogPost) {
    blogPost.addEventListener('submit', e => {
        e.preventDefault();
        const blogPostForm = new FormData();

        blogPostForm.append('postTitle', document.getElementById('postTitle').value);
        blogPostForm.append('longText', blogEditor.value);
        blogPostForm.append('photoBlog', document.getElementById('photoBlog').files[0]);

        submitBlogPost(blogPostForm, 'data');
    });
}

// Select Popular Post
if (selectPopularForm)
    selectPopularForm.addEventListener('submit', e => {
        e.preventDefault();
        submitPopularPost();
    });

//Blog Delete
if (blogDelete) {
    blogDelete.addEventListener('submit', e => {
        e.preventDefault();

        submitDeletePost();
    });
}

//------------------------- CART SECTION ----------------------------
if (cart) addItemToCart();

// DeleteItem is a querySelectorAll read in the cart all the delete buttons.
if (deleteItem) deleteItemFromCart(deleteItem);

//------------------------- CONTACTS SECTION ----------------------------
if (updateContactsForm) {
    updateContactsForm.addEventListener('submit', e => {
        e.preventDefault();

        const form = new FormData();
        form.append('socialName_1', document.getElementById('socialName_1').value);
        form.append('socialAddress_1', document.getElementById('socialAddress_1').value);
        form.append('socialIcon_1', document.getElementById('socialIcon_1').files[0]);
        form.append('socialName_2', document.getElementById('socialName_2').value);
        form.append('socialAddress_2', document.getElementById('socialAddress_2').value);
        form.append('socialIcon_2', document.getElementById('socialIcon_2').files[0]);
        form.append('socialName_3', document.getElementById('socialName_3').value);
        form.append('socialAddress_3', document.getElementById('socialAddress_3').value);
        form.append('socialIcon_3', document.getElementById('socialIcon_3').files[0]);
        form.append('imageCover', document.getElementById('imageContactsCover').files[0]);

        submitUpdateContacts(form, 'data');
    });
}