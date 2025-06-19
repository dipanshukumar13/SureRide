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