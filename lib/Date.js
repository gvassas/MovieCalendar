/**
* @projectDescription Extends the native Date class to perform sundry calendar 
* specific operations
* @author	tlane
* @version $Revision: 738 $
* $Date: 2013-11-01 08:56:57 -0700 (Fri, 01 Nov 2013) $
*/

//Delimiter Constant used as seperator 
Date.prototype.DELIM ="_";

//Calendar Related Enumerations
Date.prototype.DAYSOFWEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
Date.prototype.MONTHSOFYEAR = ['January','February','March','April','May','June','July','August','September','October','November','December'];
Date.prototype.THEFIRST = 1;
Date.prototype.DAYSINWEEK = 6;
Date.prototype.WEEKSTART = 0;
Date.prototype.WEEKEND = 6;

/**
* Returns the day value of the object as an English word
* @return {string} day of week as a word 
*/
Date.prototype.getDayWord = function(){
	return this.DAYSOFWEEK[this.getDay()];
};

/**
* Returns the month value of the object as an English word
* @return {String} month of year as a word
*/
Date.prototype.getMonthWord = function(){
	return this.MONTHSOFYEAR[this.getMonth()];
};

/**
* Returns a activeDay object corresponding to the first day of the dates month
* @return {Date}
*/
Date.prototype.getMonthStart = function(){
	return new Date(this.getFullYear(),this.getMonth(),this.THEFIRST);
};

/**
* Returns a activeDay object corresponding to the last day of the dates month
* @return {Date}
*/
Date.prototype.getMonthEnd = function(){
	return new Date(this.getFullYear(),this.getMonth()+1,0);
};

/**
* Returns a activeDay object corresponding to the first day of the dates week
* @return {Date}
*/
Date.prototype.getWeekStart = function(){
	return new Date(this.getFullYear(),this.getMonth(),this.getDate()-this.getDay());
};

/**
* Returns a activeDay object corresponding to the last day of the dates week
* @return {Date}
*/
Date.prototype.getWeekEnd = function (){
	return new Date(this.getFullYear(),this.getMonth(),this.getDate()+(this.DAYSINWEEK-this.getDay()));
};

/**
* Increments the value of the activeDay object as by a single day
* post: the activeDay will have been increased by a single day
*/
Date.prototype.incrementByDay = function (){
	this.setDate(this.getDate()+1);
};

/**
* Decrements the value of the activeDay object as by a single day
* post: the activeDay will have been decreased by a single day
*/
Date.prototype.decrementByDay = function (){
	this.setDate(this.getDate()-1);
};

/**
* Increments the value of the activeDay object by seven days
* post: the activeDay will have been increased by seven days
*/
Date.prototype.incrementByWeek = function (){
	this.setDate(this.getDate()+7);
};

/**
* Decrements the value of the activeDay object by seven days
* post: the activeDay will have been decreased by seven days
*/
Date.prototype.decrementByWeek = function (){
	this.setDate(this.getDate()-7);
};

/**
* Increments the value of the activeDay object by a month
* Only results in a single month increase
* post: the activeDay will have been increased by a single month
*/
Date.prototype.incrementByMonth = function (){
	var firstNextMonth = new Date(this.getFullYear(),this.getMonth()+1,this.THEFIRST);
	var incrementedMonth = new Date(this.getFullYear(),this.getMonth()+1,this.getDate());
	//Following determines if we are attempting to advance to a month with less days than
	//the month which presently has focus.  
	if (incrementedMonth.getMonth() > firstNextMonth.getMonth()){
		//If true advance activeDay to the last day of the next month
		//in order to avoid skipping a month
		//The following operations must be undertaken in this order
		//as attempting to advance the month while the activeDay is larger than the
		//maximum days in the month results in advancing the month
		this.setDate(firstNextMonth.getMonthEnd().getDate());
		this.setMonth(firstNextMonth.getMonth());
	
	}else{
		this.setMonth(this.getMonth()+1);	
	}
};

/**
* Decrements the value of the activeDay object by a month
* Always results in a single month decrease
* post: the activeDay will have been increased by a single month
*/
Date.prototype.decrementByMonth = function (){

	//Following two statements gets the last day of the previous month
	var lastPrevMonth = this.getMonthStart();
	lastPrevMonth.decrementByDay();
	
	var decrementedMonth = new Date(this.getFullYear(),this.getMonth()-1,this.getDate());

	//Following determines if we are attempting to advance to a month with less days than
	//the month which presently has focus.  
	if (decrementedMonth.getTime() > lastPrevMonth.getTime()){
		//If true set activeDay to the last day of the previous month
		//in order to avoid having a result activeDay in the same month
		//The following operations must be undertaken in this order
		//as attempting to move back the month while the activeDay is larger than
		//the maximum days in the month results in advancing to the first of 
		//the current month
		this.setDate(lastPrevMonth.getDate());	
		this.setMonth(lastPrevMonth.getMonth());
	}else{
		this.setMonth(this.getMonth()-1);	
	}
};

/**
* Returns value of the activeDay object in the form YYYY_MM_DD
* with the possibility of single digit months and days
* @return{String}
**/
Date.prototype.getDelimDate = function(){
	var day = null;
	var month = null;
	
	if(this.getDate() < 10){
		day = "0" + this.getDate();
	}else{
		day = this.getDate();
	}
	// remember get month returns zero indexed month of year, i.e. January = 0
	if(this.getMonth() < 9){
		month = "0" + (this.getMonth() + 1);
	}else{
		month = this.getMonth() + 1;
	}
	return this.getFullYear() + this.DELIM + month + this.DELIM + day;
};

Date.prototype.getJSONDelimDate = function(){
    var day = null;
    var month = null;

    // remember get month returns zero indexed month of year, i.e. January = 0
    if(this.getMonth() < 9){
        month = "0" + (this.getMonth() + 1);
    }else{
        month = this.getMonth() + 1;
    }
    return this.getFullYear() + this.DELIM + month;
};