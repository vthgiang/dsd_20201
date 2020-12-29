var rad = function(x) {
    return x * Math.PI / 180;
};

export const getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.locationLat - p1.locationLat);
    var dLong = rad(p2.locationLng - p1.locationLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.locationLat)) * Math.cos(rad(p2.locationLat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

export const secToMinFormat = (seconds) => {
    const min = Math.trunc(seconds/60);
    const sec = seconds%60;
    return `${min} phút, ${sec} giây`
}