const submit=document.getElementById("submit-button");
const today = new Date();
let checkError;
const dayBox=document.getElementById("day-box");
const monthBox=document.getElementById("month-box");
const yearBox=document.getElementById("year-box");
const errorDay=document.getElementById('error-message-day');
const errorMonth=document.getElementById('error-message-month');
const errorYearPast=document.getElementById('error-message-year-past');
const errorYearOld=document.getElementById('error-message-year-old');
const errorEmptyDay=document.getElementById('error-message-dempty');
const errorEmptyMonth=document.getElementById('error-message-mempty');
const errorEmptyYear=document.getElementById('error-message-yempty');
let newDay,newMonth,newYear;



submit.addEventListener("click",(event)=>{
    event.preventDefault();
    const day=dayBox.value;
    const month=monthBox.value;
    const year=yearBox.value;

    checkError=false;
    dayBox.classList.remove("border-red-500");
    monthBox.classList.remove("border-red-500");
    yearBox.classList.remove("border-red-500");
    
    errorDay.classList.add("hidden");
    errorMonth.classList.add("hidden");
    errorYearPast.classList.add("hidden");
    errorYearOld.classList.add("hidden");
    errorEmptyDay.classList.add("hidden");
    errorEmptyMonth.classList.add("hidden");
    errorEmptyYear.classList.add("hidden");
    
    if(isEmpty(day,month,year))
    {
        checkError=true;
        if(!day) errorEmptyDay.classList.remove("hidden");
        if(!month) errorEmptyMonth.classList.remove("hidden");
        if(!year) errorEmptyYear.classList.remove("hidden");
    }
    else
    {
        isValid(day,month,year);
        if(month==2) isLeapYear(day,year);
    }   
    if(!checkError)
        {
            calculateAge(day,month,year);
        } 

});
const isEmpty=(day,month,year)=>{
    return !day || !month || !year;
}
const isValid=(day,month,year)=>{
    if(day<1 || day>31)
    {
       checkError=true;
       dayBox.classList.add("border-red-500");
       errorDay.classList.remove('hidden');
    }
    else
    if(month==4 || month==6 || month==9 || month==11)
        {
            if(day>30)
            {
                checkError=true;
                dayBox.classList.add("border-red-500");
                errorDay.classList.remove('hidden');
            }
        }
    if(month<1 || month>12)
    {
        checkError=true;
        monthBox.classList.add("border-red-500");
        errorMonth.classList.remove('hidden');
    }
    if(year > today.getFullYear())
    {
        checkError=true;
        yearBox.classList.add("border-red-500");
        errorYearPast.classList.remove('hidden');
    }
    if(year < 1900)
    {
        checkError=true;
        yearBox.classList.add("border-red-500");
        errorYearOld.classList.remove('hidden');

    }
    if(year==today.getFullYear())
        {
            if(month>today.getMonth()+1)
            {
                errorMonth.classList.remove('hidden');
                checkError=true;
            }
            if(month==today.getMonth()+1)
                {
                    if(day>today.getDate())
                        {
                            errorDay.classList.remove('hidden');
                            checkError=true;
                        }  
                }
        }
}
const isLeapYear = (day, year) => {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        if (day > 29) {
            checkError = true;
            dayBox.classList.add("border-red-500");
            errorDay.classList.remove('hidden');
        }
    } else {
        if (day > 28) {
            checkError = true;
            dayBox.classList.add("border-red-500");
            errorDay.classList.remove('hidden');
        }
    }
}

const calculateAge=(day,month,year)=>{
    newDay=today.getDate()-day;
    newMonth=today.getMonth()-month+1;
    newYear=today.getFullYear()-year;
    
    if (newMonth < 0) {
        newYear -= 1;
        newMonth += 12;
    }
    if (newDay<0){
        newMonth-=1;
        newDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();  // -5 + 30 (days in June) = 25
    }
    
    gsap.fromTo("#newYear", { opacity: 0 }, { duration: 1.5, innerText: newYear, opacity: 1, snap: { innerText: 1 } });
    gsap.fromTo("#newMonth", { opacity: 0 }, { duration: 1.5, innerText: newMonth, opacity: 1, snap: { innerText: 1 } });
    gsap.fromTo("#newDay", { opacity: 0 }, { duration: 1, innerText: newDay, opacity: 1, snap: { innerText: 1 } });
}
