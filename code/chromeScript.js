/**
 * typically would declare as const, but not in this case for the sake of 
 * usability of this script in chrome dev console
 */
var MONTHS_OBJ = {
    'jan': 'JANUARY',
    'feb': 'FEBRUARY',
    'mar': 'MARCH', 
    'apr': 'APRIL', 
    'may': 'MAY',
    'jun': 'JUNE',
    'jul': 'JULY',
    'aug': 'AUGUST',
    'sep': 'SEPTEMBER',
    'oct': 'OCTOBER',
    'nov': 'NOVEMBER',
    'dec': 'DECEMBER'
}

// expand all instances
var buttons = document.getElementsByClassName("expand-incidents");
for (var i = 0; i < buttons.length; i++) {
    let curr = buttons[i];
    curr.click();
}

// mapping from month to incident count
var incidentObj = {};

var containers = document.getElementsByClassName("incident-data");
for (var i = 0; i < containers.length; i++) {
    let children = containers[i].children;
    let title;
    let date;
    let body;

    for (var j = 0; j < children.length; j++) {
        let className = children[j].className;

        if (className.includes('incident-title')) { // incident title 
            title = children[j].textContent;
        } else if (className.includes('font-small')) { // date 
            date = children[j].textContent;
        } else {
            body = children[j].textContent; // description
        }
    }

    // standardize month from date string
    let monthStr = date.substring(0, 3).toLowerCase();

    // get written out version of month based on above substring
    let currMonth = MONTHS_OBJ[monthStr];

    // create object with incident details
    let detailsObj = {
        title,
        date,
        body
    };

    // update the incidents object to contain all relevant incidents, by month
    let incidents = incidentObj[currMonth] ? incidentObj[currMonth] : [];
    incidents.push(detailsObj);
    incidentObj[currMonth] = incidents;
}

// print out results in console
console.log(JSON.stringify(incidentObj));