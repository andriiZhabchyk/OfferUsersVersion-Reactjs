export default (id, decision) => {
    return new Promise((success, fail) => {
        const request = new XMLHttpRequest();
        const body = `paragraphID=${id}&decision=${decision}`;

        console.log(body);
        request.open('PUT', '/api/results', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(body);

        request.onreadystatechange = () => {
            if (request.readyState !== 4) return;

            if (request.status !== 200) {
                fail(`${request.status}:${request.statusText}`);
            }
        };
    });
};