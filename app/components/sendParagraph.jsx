export default data => {
    return new Promise((success, fail) => {
        const request = new XMLHttpRequest();
        let body = `articleURL=${data.articleURL}&originalText=${data.originalText}&usersText=${data.usersText}`;

        console.log(body);
        request.open('POST', '/api/paragraphs', true);
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