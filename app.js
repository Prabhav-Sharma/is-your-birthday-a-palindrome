function addElement(name) {
    var element = document.querySelector(name);
    return element;
}

var btnCheck = addElement("#btn-check");
var outputStat = addElement("#output");
var gif=addElement("#gif");

gif.setAttribute("style", "display:none");



function reverseString(string) {
    var charList = string.split('');

    var reverseList = charList.reverse();

    var reverseString = reverseList.join("");

    return reverseString;
}




btnCheck.addEventListener("click", function clickHandler() {
    outputStat.innerText = ""
    addElement("#nearest-palindrome").innerText ="";
  
    var dateInput = addElement("#date").value;
    if(dateInput ===""){
        outputStat.innerText = "Would it be weird if I asked you for a date?"
        addElement("#nearest-palindrome").innerText ="";
       return;
    }

    gif.setAttribute("style", "display:block");

    
    setTimeout(function(){
    gif.setAttribute("style", "display:none");

    var charList = dateInput.split("-");
    var year = Number(charList[0]);
    var month = Number(charList[1]);
    var day = Number(charList[2]);

    var date = {
        day: day,
        month: month,
        year: year
    }

    if (checkPalindromeForAll(date)) {
        outputStat.innerText = "Woohoo!! Your Birthday is a Palindrome!"
        addElement("#nearest-palindrome").innerText ="";
    } else {
        var previousPalindrome = checkPreviousPalindrome(date);
        var nextPalindrome = checkNextPalindrome(date);

        var nearestPalindrome = whichHasLessDifference(previousPalindrome, nextPalindrome);
        var palindromeDate = nearestPalindrome[1];
        var days = nearestPalindrome[0];

        outputStat.innerText = "Whoops! Sorry, your birthday is not a palindrome"
        addElement("#nearest-palindrome").innerText = "Nearest palindrome: " + palindromeDate.day + "/" + palindromeDate.month + "/" + palindromeDate.year + ".\n  You missed it by " + days + " days";

    }
         }, 2750);

   
   

 

    

})

function whichHasLessDifference(one, two) {
    if (one[0] > two[0]) {
        return two;
    } else {
        return one;
    }
}


function getPreviousDay(date) {
    var day = parseInt(date.day) - 1;
    var month = parseInt(date.month);
    var year = parseInt(date.year);

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month = month - 1;
            }
        } else {
            if (day < 1) {
                day = 28;
                month = month - 1;
            }
        }
    } else {
        if (day < 1) {
            day = daysInMonth[month - 1];
            month = month - 1;
        }
    }
    if (month < 1) {
        month = 12;
        year = year - 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}



function checkPreviousPalindrome(date) {
    var counter = 0;
    var previousDay = getPreviousDay(date);

    while (true) {
        counter++;
        var isPalindrome = checkPalindromeForAll(previousDay);
        if (isPalindrome) {
            break;
        }

        previousDay = getPreviousDay(previousDay);
    }

    return [counter, previousDay];

}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDay(date) {

    var day = parseInt(date.day) + 1;
    var month = parseInt(date.month);
    var year = parseInt(date.year);

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}


function checkNextPalindrome(date) {
    var counter = 0;
    var nextDay = getNextDay(date);

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAll(nextDay);
        if (isPalindrome) {
            break;
        }
        nextDay = getNextDay(nextDay);
    }

    return [counter, nextDay];

}


function checkPalindromeForAll(date) {

    var allFormatsList = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < allFormatsList.length; i++) {
        if (isPalindrome(allFormatsList[i])) {
            flag = true;
            break;
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

    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
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