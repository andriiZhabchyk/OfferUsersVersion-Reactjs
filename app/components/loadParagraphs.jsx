export default url => {
    return new Promise((success, fail) => {
        const request = new XMLHttpRequest();
        const itemUrl = `url=${url}`;
        request.open('GET', '/api/article?' + itemUrl, true);

        request.send();

        request.onreadystatechange = () => {
            if (request.readyState !== 4) return;

            if (request.status !== 200) {
                fail(`${request.status}:${request.statusText}`);
            } else {
                success(request.responseText);
            }
        };
    });
};