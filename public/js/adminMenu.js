export const inizializePage = () => {
    // Homepage
    document.querySelector('.createHomepage').classList.add('hide');
    document.querySelector('.selectHomepage').classList.add('hide');
    document.querySelector('.updateHomepage').classList.add('hide');
    document.querySelector('.deleteHomepages').classList.add('hide');

    // Gallery
    document.querySelector('.createWorkPage').classList.add('hide');
    document.querySelector('.selectWorkPage').classList.add('hide');
    document.querySelector('.updateWorkPage').classList.add('hide');
    document.querySelector('.deleteWorkPage').classList.add('hide');

    // Description Items
    document.querySelector('.work').classList.add('hide');
    document.querySelector('.deleteWorks').classList.add('hide');

    // Blog
    document.querySelector('.blogPage').classList.add('hide');
    document.querySelector('.blogPost').classList.add('hide');
    document.querySelector('.selectPopular').classList.add('hide');
    document.querySelector('.deletePost').classList.add('hide');

    // Contacts
    document.querySelector('.updateContactsPage').classList.add('hide');
};

export const switchMenu = () => {
    const selection = document.getElementById('chooseForm');

    switch (selection.value) {
        // Homepage
        case 'createHomepage':
            document.querySelector('.createHomepage').classList.remove('hide');
            break;
        case 'selectHomepage':
            document.querySelector('.selectHomepage').classList.remove('hide');
            break;
        case 'updateHomepage':
            document.querySelector('.updateHomepage').classList.remove('hide');
            break;
        case 'deleteHomepages':
            document.querySelector('.deleteHomepages').classList.remove('hide');
            break;

        // Gallery
        case 'createWorkPage':
            document.querySelector('.createWorkPage').classList.remove('hide');
            break;
        case 'selectWorkPage':
            document.querySelector('.selectWorkPage').classList.remove('hide');
            break;
        case 'updateWorkPage':
            document.querySelector('.updateWorkPage').classList.remove('hide');
            break;
        case 'deleteWorkPage':
            document.querySelector('.deleteWorkPage').classList.remove('hide');
            break;

        // Item
        case 'work':
            document.querySelector('.work').classList.remove('hide');
            break;
        case 'deleteWorks':
            document.querySelector('.deleteWorks').classList.remove('hide');
            break;

        // Blog
        case 'blogPage':
            document.querySelector('.blogPage').classList.remove('hide');
            break;
        case 'blogPost':
            document.querySelector('.blogPost').classList.remove('hide');
            break;
        case 'selectPopular':
            document.querySelector('.selectPopular').classList.remove('hide');
            break;
        case 'deletePost':
            document.querySelector('.deletePost').classList.remove('hide');
            break;

        // Contacts
        case 'updateContactsPage':
            document.querySelector('.updateContactsPage').classList.remove('hide');
    }
};