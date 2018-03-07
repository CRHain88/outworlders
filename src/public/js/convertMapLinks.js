const convertMapLinks = (() => {
    /* if the user is on on iOS or Mac, open in Apple Maps */
    if ((navigator.platform.indexOf('iPhone') != -1)
        || (navigator.platform.indexOf('iPad') != -1)
        || (navigator.platform.indexOf('iPod') != -1)
        || (navigator.platform.indexOf('MacIntel') != -1)
    ) {
        document.querySelectorAll('[data-map-link="location"]').forEach((link) => {
            link.href = link.href.replace('https://maps.google.com', 'maps://maps.google.com');
        })

        document.querySelectorAll('[data-map-link="directions"]').forEach((link) => {
            link.href = link.href.replace('https://maps.google.com/maps?q=', 'maps://maps.google.com/maps?saddr=Current%20Location&daddr=');
        })
    }
})();

export default convertMapLinks;
