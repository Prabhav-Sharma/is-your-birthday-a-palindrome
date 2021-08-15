function addElement(name) {
    var element = document.querySelector(name);
    return element;
}

var btnCheck = addElement("#btn-check");
var outputStat = addElement("#output");


function reverseString(string) {
    var charList = string.split('');

    var reverseList = charList.reverse();

    var reverseString = reverseList.join("");

    return reverseString;
}

btnCheck.addEventListener("click", function clickHandler(){

var dateInput = addElement("#date").value;
var charList = dateInput.split("-");
var year = charList[0];
var month = charList[1];
var day = charList[2];

var date={
    day:day,
    month: month,
    year:year
}

if(checkPalindromeForAll(date)){
    outputStat.innerText = "Woohoo!! Your Birthday is a Palindrome!"
}else{
    var previousPalindrome = checkPreviousPalindrome(date);
    var nextPalindrome = checkNextPalindrome(date);

    var nearestPalindrome = whichHasLessDifference(previousPalindrome, nextPalindrome);
    var palindromeDate = nearestPalindrome[1];
    var counter = nearestPalindrome[0];

    outputStat.innerText= "Whoops! Sorry, your birthday is not a palindrome"
    addElement("#nearest-palindrome").innerText = "Nearest palindrome to your birthday is on: " + palindromeDate.day + "/" + palindromeDate.month +"/" + palindromeDate.year + ". You missed it by " +  counter + " days";

}

})

function whichHasLessDifference(one, two){
    if(one[0] > two[0]){
        return two;
    }else{
        return one;
    }


}


// var date = {
//     day: 1,
//     month: 3,
//     year: 1999
// }

console.log(checkPalindromeForAll(date))
console.log(checkPreviousPalindrome(date))

function getPreviousDay(date){
    var day = date.day - 1;
    var month = parseInt(date.month);
    var year = parseInt(date.year);

    var daysInMonth =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month===3){
        if(isLeapYear(year)){
            if(day<1){
                day=29;
                month=month-1;
            }
        }else{
            if(day<1){
                day=28;
                month= month-1;
            }
        }
    }else{
        if(day<1){
            day = daysInMonth[month-1];
            month = month - 1;
        }
    }
    if(month<1){
        month=12;
        year= year-1;
    }
    return {
        day:day,
        month:month,
        year:year
    }
}



function checkPreviousPalindrome(date){
    var counter =0;
    var previousDay = getPreviousDay(date);

    while(true){
        // counter++;
        if(checkPalindromeForAll(previousDay)){
            break;
        }else{
            previousDay = getPreviousDay(previousDay);
            counter++;
        }
    }

    return [counter, previousDay];

}

function isLeapYear(year) {
    if (year % 4 === 0) {
        return true;
    } else {
        return false;
    }
}

function getNextDay(date) {

    var day = date.day + 1;
    var month = parseInt(date.month);
    var year = parseInt(date.year);

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}


function checkNextPalindrome(date) {
    var counter = 0;
    var nextDay = getNextDay(date);

    while (true) {
       

        if (checkPalindromeForAll(nextDay)) {
            break;
        } else {
            nextDay = getNextDay(nextDay);
            counter++;
        }
    }

    return [counter, nextDay];

}


function checkPalindromeForAll(date) {

    var allFormatsList = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < allFormatsList.length; i++) {
        if (isPalindrome(allFormatsList[i])) {
            flag = true;
        }
    }
    return flag;


}



function isPalindrome(str) {
    var reversed = reverseString(str);
    if (str === reversed) {
        return true;
    } else {
        return false;
    }
}



function convertDateToString(date) {

    var dateStr = {
        day: " ",
        month: " ",
        year: " "
    }

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;

}


function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}











































// function checkPalindrome(year ,reverseYear, month, reverseMonth, day, reverseDay){
//     var format1  = year + month + day;
//     var format1Palindrome = reverseDay + reverseMonth + reverseYear;

//     console.log(format1 , format1Palindrome);

//     var format2 = month + day + year;
//     var format2Palindrome =  reverseYear + reverseDay + reverseMonth;
//     console.log(format2 , format2Palindrome);

//     var format3 = day  +  month + year;
//     var format3Palindrome =  reverseYear + reverseMonth  + reverseDay;
//     console.log(format3, format3Palindrome);

//     var format4 =  month  + day + year.substring(2,4);
//     var format4Palindrome =  reverseYear.substring(0,2) + reverseDay + reverseMonth;
//     console.log(format4 ,  format4Palindrome);



//     if(format1 === format1Palindrome || format2 === format2Palindrome || format3 === format3Palindrome || format4 === format4Palindrome){
//         outputStat.innerText = "Woohoo your birthday is a palindrome!!"     
//     } else{
//         outputStat.innerText = "Sorry, but it seems like it's a no go for your birthday, you can always be born again though?"
//     }
// }




// var year = digits.splice(0, 4).join();
// console.log(year)
// var month =  digits.splice(0,2);
// var day = digits.splice(0,2);

// var reverseYear = year.reverse();
// console.log(reverseYear);
// var reverseMonth = month.reverse();
// var reverseDay = day.reverse(); 

// function getNearestDay(year, month, day){
//     var months31 =  [1,3,5,7,8,10,12];
//    var months30 = [4,6,9,11];
//    for(var i = 0; i<9999; i++){
//     while( month<13){
//         month = month + 1;
//         checkPalindrome
//     }


//    }

// }

// function StringPalindrome(stringNumber){
//     var max = Math.floor(stringNumber.length/2);
//     for(var i = 0; i<max; i++){
//         if(stringNumber[i]! )
//     }
// } 
// btnCheck.addEventListener("click", function checkHandler(){

//     var birthday = addElement("#date").value;
//     if(birthday === ""){
//         outputStat.innerText ="I'm gonna need a date!"
//     }else{


//     console.log(birthday);
//     var digits = birthday.split("");
//     for(var i=0; i<digits.length; i++){
//         if(digits[i] === "-"){
//             digits.splice(i,1);
//         }
//     }

//     console.log("year = " +  year + "month =" +  month + "day =" +  day);

//     var year  = digits[0] + digits[1] + digits[2] + digits[3];
//     var reverseYear =  digits[3] + digits[2] + digits[1] + digits[0];
//     var month = digits[4] + digits[5];
//     var reverseMonth = digits[5] +digits[4];
//     var day = digits[6] + digits[7];
//     var reverseDay = digits[7] + digits[6];

//     checkPalindrome(year,reverseYear, month, reverseMonth, day, reverseDay);
// }


// })