
/*
Navbar button generating function
 */

function ButtonGen() {
     var navBar = document.createElement("nav");
    navBar.setAttribute("id", "mainNav");
     var buttons = ["<< Previous", "Month/Week", "Go To", "Next >>"];

    for (var i = 0; i<buttons.length; i++)
    {
        var button = document.createElement("button");
        button.setAttribute("id", buttons[i]);
        button.appendChild(document.createTextNode(buttons[i]));
        navBar.appendChild(button);
    }
    document.body.appendChild(navBar);
}

/**
 * Initial Calendar build
 */

function init(){

    var titleDiv = document.createElement("h1");
    titleDiv.setAttribute("id", "title");
    document.body.appendChild(titleDiv);

    var calendarDiv = document.createElement("div");
    calendarDiv.setAttribute("id", "calendar");
    document.body.appendChild(calendarDiv);

    var detail = document.createElement("aside");
    detail.setAttribute("id", "movieDetail");
    document.body.appendChild(detail);

    activeDay = new Date();

    displayCalendar = new Calendar(document.getElementById("calendar"), activeDay);
    displayCalendar.draw();
    ButtonGen();

    var nextDate  = document.getElementById("Next >>");
    nextDate.addEventListener("click", NextDate);

    var previousDate = document.getElementById("<< Previous");
    previousDate.addEventListener("click", PreviousDate);

    var toggle =  document.getElementById("Month/Week");
    toggle.addEventListener("click", monthWeek);

    var goTo = document.getElementById("Go To");
    goTo.addEventListener("click", goToButtons);
}

function goToButtons ()
{
    var nav = document.getElementById("mainNav");
    var input = document.createElement("div");
    input.setAttribute("class", "input");
    nav.replaceChild(input, input);

//    while (input.firstElementChild)
//    {
//        input.removeChild(input.firstElementChild);
//    }
    var year = document.createElement("input");
    year.setAttribute("type", "text");
    year.setAttribute("id", "year");
    year.setAttribute("value", "Year");
    input.appendChild(year);

    var month = document.createElement("input");
    month.setAttribute("type", "text");
    month.setAttribute("id", "month");
    month.setAttribute("value", "Month");
    input.appendChild(month);

    var day = document.createElement("input");
    day.setAttribute("type", "text");
    day.setAttribute("id", "day");
    day.setAttribute("value", "Day");
    input.appendChild(day);

    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "goTo");
    submit.setAttribute("value", "Go To Date");
    input.appendChild(submit);
    submit.addEventListener("click", goToNewDate);

    nav.appendChild(input);
}

function goToNewDate()
{
    activeDay = new Date(document.getElementById("year").value, document.getElementById("month").value - 1, document.getElementById("day").value);
    displayCalendar.draw();
}

/**
 *
 * @param {Event} eventObj
 * Reassigns activeDay to target and adds "activeDay" class.
 */
function daySelect(eventObj) {
    var today = document.getElementById(activeDay.getDelimDate());
        today.classList.toggle("activeDay");
    activeDay = new Date(eventObj.currentTarget.id.split("_"));
    displayCalendar.draw();
//}
}

/**
 * Default view set to MONTHVIEW
 * Change viewType on "click"
 * Draw calendar accordingly
 */
function monthWeek(){
    if (displayCalendar.viewType == displayCalendar.WEEKVIEW) {
        displayCalendar.viewType = displayCalendar.MONTHVIEW;
   }
    else {
        displayCalendar.viewType = displayCalendar.WEEKVIEW;
    }
    displayCalendar.draw();
}

/**
 * Event function for next button
 * Reassigns global variable activeDay
 */

function NextDate() {

   if (displayCalendar.viewType == displayCalendar.MONTHVIEW) {

        activeDay.incrementByMonth();
        displayCalendar.draw();
    }
    else {
       activeDay.incrementByWeek();
       displayCalendar.draw();
    }
}

/**
 * Event function for previous button
 * Reassigns global variable activeDay
 */

function PreviousDate() {

    if (displayCalendar.viewType == displayCalendar.MONTHVIEW) {
        activeDay.decrementByMonth();
        displayCalendar.draw();
    }
    else {
        activeDay.decrementByWeek();
        displayCalendar.draw();
    }

}

addEventListener("load", init, false);
            
        