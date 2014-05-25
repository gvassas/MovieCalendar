/**
 * Created by Gui on 15/11/13.
 */
"use strict";

var activeDay;
//var show;

/** @param {HTMLElement} displayCalendarNode : the container for output of the calendar
* @param {Date} activeDay : the default activeDay for the calendar
*/
function Calendar(displayCalendarNode, activeDay){

    this._displayCalendarNode =  displayCalendarNode;
    this.viewType = this.MONTHVIEW ;

}

//Default view set to MONTHVIEW
Calendar.prototype.WEEKVIEW = false;
Calendar.prototype.MONTHVIEW = true;

//Removes all elements in the calendar div
Calendar.prototype._clearDisplayDate = function (){
    while(this._displayCalendarNode.firstChild){
        this._displayCalendarNode.removeChild(this._displayCalendarNode.firstChild);
    }
};

/**
 * Set title according to month of activeDay
 * @private
 */
Calendar.prototype._setTitle = function() {
    var title = document.getElementById("title");
        if(title.firstChild){
            title.removeChild(title.firstChild);
        }
        title.appendChild(document.createTextNode(
            activeDay.getMonthWord() + " " + activeDay.getFullYear()));
};

/*
Draws according to viewType
Gets Data from JSON file
 */
Calendar.prototype.draw = function() {
if (this.getData("data/" + activeDay.getJSONDelimDate()+".json") != null){
    this.getData("data/" + activeDay.getJSONDelimDate()+".json");
   // console.log(this.showsList);
}
    if (this.viewType == this.MONTHVIEW) {
        this.monthView();
    }
    else {
        this.weekView();
    }
};

Calendar.prototype.getData = function (fileName) {
    this._request = new XMLHttpRequest();
    this._request.open("GET", fileName, false);
    this._request.send(null);
    if (this._request.status === 200) {
        this.showsList = JSON.parse(this._request.responseText, this._showsReviver);
    }
    else if(this._request.status === 404)
    {
        this.showsList = "";
    }
};

/**
 *
 * @param {Date} day
 * @param {HTMLElement} container
 * Appends information to dayDivs, adds event listener for movie detail.
 * If date is activeDay, displays
 */

Calendar.prototype.printDayInfo = function(day, container){

    for(var show in this.showsList[day]){

        var aside = document.getElementById("movieDetail");
        var movieDetail = document.createElement("div");
        movieDetail.setAttribute("id", day +'_' + show);
        movieDetail.setAttribute("class", "dayTitle");
        var time = document.createElement("div");
        time.setAttribute("class", "time");
        var title = document.createElement("div");
        title.setAttribute("class", "title");
        time.appendChild(document.createTextNode(this.showsList[day][show]["date"].substring(11, 16)));
        title.appendChild(document.createTextNode(this.showsList[day][show]["title"]));
        movieDetail.appendChild(title);
        movieDetail.appendChild(time);
        movieDetail.addEventListener("click", this.printDetail.bind(this), true);

        if (day === activeDay.getDelimDate() )
        {
            var title = document.createElement("h1");
            var detail = document.createElement("div");
            detail.setAttribute("class", "info");
            aside.textContent = "";
            title.appendChild(document.createTextNode(this.showsList[day][show]["title"]));
            detail.appendChild(document.createTextNode(this.showsList[day][show]["descr"]));
            aside.appendChild(title);
            aside.appendChild(detail);
        }

        else if (this.showsList[activeDay.getDelimDate()] === undefined)
        {
            aside.textContent  = "";
        }

        container.appendChild(movieDetail);
    }
};

Calendar.prototype.printDetail = function(evt)
{
    var aside = document.getElementById("movieDetail");
    var title = document.createElement("h1");
    var detail = document.createElement("div");
    detail.setAttribute("class", "info");
    aside.textContent = "";
    var showDay = evt.currentTarget.id.substring(0,10);
    var earlyOrLate = evt.currentTarget.id.substring(11, 12);
    title.appendChild(document.createTextNode(this.showsList[showDay][earlyOrLate]["title"]));
    detail.appendChild(document.createTextNode(this.showsList[showDay][earlyOrLate]["descr"]));
    aside.appendChild(title);
    aside.appendChild(detail);
};

/**
 * Generates day div and appends to a week, adds event listener on dayDiv
 * @param {Date} day
 * @param {HTMLElement} container
 * @private
 */
Calendar.prototype._drawWeek = function(day, container) {

    var weekDiv = document.createElement("div");
    weekDiv.setAttribute("class", "week");

    for(var i = day.getWeekStart();i <= day.getWeekEnd(); i.incrementByDay()){
        var dayText = i.getDate();
        var dayDiv = document.createElement("div");
        dayDiv.setAttribute("id", i.getDelimDate());
        dayDiv.setAttribute("class", "day");
        var date = document.createElement("div");
        date.setAttribute("class", "today");

        if (activeDay.getDelimDate() == i.getDelimDate()) {
            dayDiv.classList.toggle("activeDay");
        }

        this.printDayInfo(i.getDelimDate(), dayDiv);
        dayDiv.appendChild(date);
        weekDiv.appendChild(dayDiv);
        dayDiv.addEventListener("click", daySelect, true);
        this._displayCalendarNode.appendChild(weekDiv);
        if (dayText < 10) {
            date.appendChild(document.createTextNode("0" + dayText + " "));
        }
        else {
            date.appendChild(document.createTextNode(dayText + " "));
            }
        }
    container.appendChild(weekDiv);
    dayDiv.appendChild(document.createElement("br"));
};

/**
 * Appends weeks to month
 */
Calendar.prototype.monthView = function() {
    this._clearDisplayDate();
    this._setTitle();
    this._appendHeading();

    var monthDiv = document.createElement("div");
    monthDiv.setAttribute("class", "month");

    for( var monthIterator = activeDay.getMonthStart(); monthIterator <= activeDay.getMonthEnd().getWeekEnd();
         monthIterator.incrementByWeek())         //start at beginning of month
        //loop until the end of the last week that the month end falls in
        //increment the iterator by a week
    {
       this._drawWeek(monthIterator, monthDiv);
    }
        this._displayCalendarNode.appendChild(monthDiv);
};

Calendar.prototype.weekView = function (){
    this._clearDisplayDate();
    this._setTitle();
    this._appendHeading();
    this._drawWeek(activeDay, this._displayCalendarNode);

};

Calendar.prototype._appendHeading = function (){

    var weekDay = document.createElement("div");
    weekDay.setAttribute("class", "weekDays");

    var headingText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (var i = 0; i<headingText.length; i++)
    {
        var dayWeek = document.createElement("div");
        dayWeek.appendChild(document.createTextNode(headingText[i]));
        weekDay.appendChild(dayWeek);
    }
    this._displayCalendarNode.appendChild(weekDay);
    this._displayCalendarNode.appendChild(document.createElement("br"));
};

Calendar.prototype.setDate = function(day)
{
  activeDay = new Date(day);
};



//return the week element