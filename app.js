const fajr = document.querySelector(".prayer-fajr");
const dhuhr = document.querySelector(".prayer-dhuhr");
const asr = document.querySelector(".prayer-asr");
const maghrib = document.querySelector(".prayer-maghrib");
const isha = document.querySelector(".prayer-isha");
const hijriDateContainer = document.querySelector(".hijri-date")
const gregDateContainer = document.querySelector(".greg-date")

window.onload = async () => {
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=9f8ad84b34fd4f60b3de2640038168f5`);
    const data = await response.json();
    updateSalah(data);
}

async function updateSalah(data){
    const lat = data.latitude;
    const long = data.longitude;
    const callDate = new Date();
    const date = callDate.getDate();
    
    const responseSalah = await fetch (`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}`)
    const dataSalah = await responseSalah.json();
    const currentData = dataSalah.data[date-1];
    updateTimings(currentData);
    console.log(currentData.date);
}


function updateTimings(currentData){
    fajr.innerHTML = currentData.timings.Fajr;
    dhuhr.innerHTML = currentData.timings.Dhuhr;
    asr.innerHTML = currentData.timings.Asr;
    maghrib.innerHTML = currentData.timings.Maghrib;
    isha.innerHTML = currentData.timings.Isha;
    
    gregDateContainer.innerHTML = "The Gregorian Calender : " + currentData.date.readable + ", " + currentData.date.gregorian.weekday.en  

    hijriDateContainer.innerHTML = "The Islamic Calender : "+currentData.date.hijri.day + " " + currentData.date.hijri.month.ar + " " + currentData.date.hijri.year + ", " + currentData.date.hijri.weekday.ar
}




   