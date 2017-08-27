export default () => {
    return new Promise((success, fail) => {
        const request = new XMLHttpRequest();
        request.open('GET', '/api/results', true);

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