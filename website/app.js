/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&APPID=79da1569ea7257d02c83606a70c649bd";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// HTML Elements
const divDate = document.getElementById('date');
const divTemp =  document.getElementById('temp');
const divContent =  document.getElementById('content');
const divFeelings = document.getElementById('feelings');
const divZip = document.getElementById('zip');


// Get data using Fetch
const getTheData = async (url = '') => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// POST data to body
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(data)

        });
};

// Update entryHolder
const updateData = async () => {
    const projectData = await getTheData('/data');
    divDate.innerHTML = `${projectData.date}`;
    divTemp.innerHTML = `${projectData.temperature} ℉`;
    divContent.innerHTML = projectData.feelings;
    console.log(projectData);
};

// Input data on button click
const generateData = async () => {
    const feelings = divFeelings.value;
    const zip = divZip.value;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateData();
    } catch (error) {
        console.error("error", error);
    }
};


// Inial data
const onLoadData = async () => {
    const feelings = "Excited!";
    const zip =10001;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateData();
    } catch (error) {
        console.error("error", error);
    }
};

document.getElementById('generate').addEventListener('click', generateData);

onLoadData();