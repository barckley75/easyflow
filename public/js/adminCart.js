export const addItemToCart = () => {
    let cookies = document.getElementById('cookies').value;
    cookies = JSON.parse(cookies.split(','));
    let size = Object.keys(cookies).length;
    document.querySelector('.itemsCounter').textContent = size;
    if (!localStorage.clickcount) {
        localStorage.clickcount = 0;
        document.querySelector('.itemsCounter').textContent = 0;
    } else if (document.cookie == '') {
        localStorage.clickcount = 0;
        document.querySelector('.itemsCounter').textContent = 0;
    } else if (size > 0) {
        const cartSvg = document.getElementById('cart');
        cartSvg.src = `/resources/img/icons/set0/cart_buy.svg`;
    }

    document.getElementById('add').addEventListener('click', () => {
        let cookies = document.getElementById('cookies').value;
        cookies = JSON.parse(cookies.split(','));

        const fullUrl = location.href;
        const urlCookie = fullUrl.split('/')[2];

        // delete the cookie policy from cookies object
        for (let key in cookies) {
            if (urlCookie === key) delete cookies[key];
            if ('jwt' == key) delete cookies[key];
        }

        if (localStorage !== undefined) {
            // Change svg cart
            const cartSvg = document.getElementById('cart');
            cartSvg.src = `/resources/img/icons/set0/cart_buy.svg`;

            // Get the id of the item
            const idItem = document.querySelector('data');

            // Store a counter in localStorage
            localStorage.clickcount = Number(localStorage.clickcount) + 1;

            // Create the expires date
            const date = new Date();
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();

            // Create cookie that will be read in viewController and then passed to workDescription.pug
            document.cookie = `${localStorage.clickcount}=${idItem.value};${expires};path=/`;
            // const cookies = document.cookie;

            location.reload();
        } else {
            localStorage.clickcount = 0;
        }
    });
};

export const deleteItemFromCart = (deleteItem) => {
    if (!localStorage.clickcount) {
        localStorage.clickcount = 0;
    } else if (document.cookie == '') {
        localStorage.clickcount = 0;
    }

    // read delete botton from cart
    for (let i = 0; i < deleteItem.length; i++) {

        deleteItem[i].addEventListener('click', () => {
            const data = document.querySelectorAll('data');
            const id = JSON.parse(data[i].value);

            const cookies = document.cookie;
            const itemsCookies = cookies.split(';');
            for (let i = 0; i < itemsCookies.length; i++) {
                if (id._id === itemsCookies[i].split('=')[1]) {
                    // localStorage.clickcount = itemsCookies.length - 1;
                    document.cookie = `${itemsCookies[i].split('=')[0]}=; expires=Thu, 01 Jan 2010 00:00:00 UTC; path=/;`;
                    break;
                }
            }
            location.reload();
        });
    }
};