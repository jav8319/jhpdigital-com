const  getColombiaTimeInUtcMilliseconds=()=> {
    // Get the current date and time in UTC
    const now = new Date();
    
    // Get the UTC time in milliseconds
    const utcMilliseconds = now.getTime();
    
    // Calculate the offset for Colombia (UTC-5) in milliseconds
    const colombiaOffset = -5 * 60 * 60 * 1000; // -5 hours to milliseconds
    
    // Adjust the UTC time to Colombia time
    const colombiaTimeInUtcMilliseconds = utcMilliseconds + colombiaOffset;
    
    return colombiaTimeInUtcMilliseconds;
    
};

module.exports =  getColombiaTimeInUtcMilliseconds;
