window.onload = (e) => {
    let prev_data = localStorage.getItem("user_data69");
    if (prev_data != null) {
        userLocation.value = prev_data;
        $(search_btn).click();
    }
    else {
        console.log("no");
        if (navigator.geolocation) {
            // Request the user's location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Successfully retrieved location
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}`);
                    console.log(`Longitude: ${longitude}`);
                    userLocation.value=`${latitude},${longitude}`;
                    $(search_btn).click();
                },
                (error) => {
                    // Handle location retrieval errors
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.error("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.error("The request to get user location timed out.");
                            break;
                        default:
                            console.error("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }
}

