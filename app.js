//ES6 Version Code
const addElement =name => document.querySelector(name);


const btnCheck = addElement("#btn-check");
const outputStat = addElement("#output");
const gif=addElement("#gif");

gif.setAttribute("style", "display:none");



const reverseString= string => {
    let charList = string.split('');

    let reverseList = charList.reverse();

    let reverseString = reverseList.join("");

    return reverseString;
};




btnCheck.addEventListener("click", () => {
    outputStat.innerText = ""
    addElement("#nearest-palindrome").innerText ="";
  
    let dateInput = addElement("#date").value;
    if(dateInput ===""){
        outputStat.innerText = "Would it be weird if I asked you for a date?"
        addElement("#nearest-palindrome").innerText ="";
       return;
    }

    gif.setAttribute("style", "display:block");

    
    setTimeout(_=>{
    gif.setAttribute("style", "display:none");

    let charList = dateInput.split("-");
    let year = Number(charList[0]);
    let month = Number(charList[1]);
    let day = Number(charList[2]);

    let date = {
        day: day,
        month: month,
        year: year
    }

    if (checkPalindromeForAll(date)) {
        outputStat.innerText = "Woohoo!! Your Birthday is a Palindrome!"
        addElement("#nearest-palindrome").innerText ="";
    } else {
        let previousPalindrome = checkPreviousPalindrome(date);
        let nextPalindrome = checkNextPalindrome(date);

        let nearestPalindrome = whichHasLessDifference(previousPalindrome, nextPalindrome);
        let palindromeDate = nearestPalindrome[1];
        let days = nearestPalindrome[0];

        outputStat.innerText = "Whoops! Sorry, your birthday is not a palindrome"
        addElement("#nearest-palindrome").innerText = `Nearest palindrome: ${palindromeDate.day}/${palindromeDate.month}/${palindromeDate.year}.\n  You missed it by ${days}  days`;

    }
         }, Math.random()*3000);

   
   

 

    

})

const whichHasLessDifference= (one, two) => one[0]> two[0]? two:one; 
/*{
    if (one[0] > two[0]) {
        return two;
    } else {
        return one;
    }
}
*/


const getPreviousDay= date => {
    let day = parseInt(date.day) - 1;
    let month = parseInt(date.month);
    let year = parseInt(date.year);

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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



const checkPreviousPalindrome= date => {
    let counter = 0;
    let previousDay = getPreviousDay(date);

    while (true) {
        counter++;
        let isPalindrome = checkPalindromeForAll(previousDay);
        if (isPalindrome) {
            break;
        }

        previousDay = getPreviousDay(previousDay);
    }

    return [counter, previousDay];

}

const isLeapYear =year => {
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

const getNextDay = date=> {

    let day = parseInt(date.day) + 1;
    let month = parseInt(date.month);
    let year = parseInt(date.year);

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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


const checkNextPalindrome = date => {
    let counter = 0;
    let nextDay = getNextDay(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindromeForAll(nextDay);
        if (isPalindrome) {
            break;
        }
        nextDay = getNextDay(nextDay);
    }

    return [counter, nextDay];

}


const checkPalindromeForAll = date=> {

    let allFormatsList = getAllDateFormats(date);

    let flag = false;

    for (let i = 0; i < allFormatsList.length; i++) {
        if (isPalindrome(allFormatsList[i])) {
            flag = true;
            break;
        }
    }
    return flag;


}



const isPalindrome = str => {
    let reversed = reverseString(str);
    if (str === reversed) {
        return true;
    } else {
        return false;
    }
}



const convertDateToString =date => {

    let dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
      dateStr.day = `0${date.day}`;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = `0${date.month}`;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }


const getAllDateFormats = date=> {
    let dateStr = convertDateToString(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}