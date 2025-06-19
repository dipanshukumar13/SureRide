const axios = require('axios');

module.exports.getAddressCoordinates = async(address)=>{
    const apikey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try{
        const response=await axios.get(url);
        if(response.data.status=='OK'){
            const location=response.data.results[0].geometry.location;
            return{
                lat:location.lat,
                lng:location.lng
            }
        }
        else{
            throw new Error('Unable to fetch Coordinates');
        }
    }
    catch(error){
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

module.exports.getDistanceTime=async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
                throw new Error('No route found');
            }
            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('Unable to fetch distance and time');
        }
    }catch(error){
        console.error('Error fetching distance and time:', error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async(input)=>{
    if(!input){
        throw new Error('Input is required for autocomplete suggestions');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            return response.data.predictions.map(prediction=>prediction.description).filter(value=>value);
        }else{
            throw new Error('Unable to fetch autocomplete suggestions');
        }

    }catch(error){
        console.error('Error fetching autocomplete suggestions:', error);
        throw error;
    }
    
}