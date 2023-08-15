// contains any functions that may need to be used in more than one component.

const formatDate = function(date) {
    if (date === null) {
        return 'Unknown'
    } else {
        // date is either null or YYYY-MM-DD
    const year = date.slice(0,4);
    let month = date.slice(5,7);
    const day = date.slice(8,10)

    switch(month) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = "March";
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
        default:
            console.log('Could not determine month');
    }

    let dateString = `${day} ${month} ${year}`;
    return dateString;
    }
    
}; // formatDate

// list functions
// lists object in local storage should look like
/*
    { lists: {
        { 'wishlist' : [ {gameObj}, {gameObj}, {gameObj} ] }
        { 'played' : [ {gameObj}, {gameObj} ] }
    ]}

    in local storage:
    { 
        'wishlist': [],
    }
*/

const createList = function(listName) {
    console.log(`Creating new list in localStorage`);

    const listToAdd = {
        listName: listName,
        listData: [],
    }

    // if the list already exists, it will be overwritten?
    // if it doesn't exist it will be created


    localStorage.setItem('myLists', JSON.stringify(listToAdd));
};

const addToList = function(listName,gameObj) {
        console.log('Adding to local storage');

        // get the required list
        // store it in a variable
        const getList = JSON.parse(localStorage.getItem(listName));
        // push the object to the array
        getList.push(gameObj);
        // store the new key value back in local storage
        localStorage.setItem('wishlist',JSON.stringify(getList));
        console.log(JSON.parse(localStorage.getItem('wishlist')));
}

const getList = function(listName) {
    console.log(`Retrieving ${listName} from localStorage`);

    return JSON.parse(localStorage.getItem('myLists',`${listName}`));
}

export { 
    formatDate, 
    createList,
    addToList,
    getList,
};