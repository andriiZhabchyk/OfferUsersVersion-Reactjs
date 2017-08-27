import React from 'react';
import ItemParagraph from './itemParagraph';
import LoadUserData from './loadParagraphs';

class Paragraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articleURL: '', title: '', paragraphs: []}
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        let url = window.location.search;
        url = url.split('=');

        this.setState({articleURL: url[1]});

        LoadUserData(url[1])
            .then(data => {
                data = JSON.parse(data);
                this.setState({
                    title: data.title,
                    paragraphs: data.paragraphs
                });
            });
    }

    render() {
        if (!!this.state.paragraphs) {
            return (
                <div>
                    <div className="paragraph-container">
                        <h3 className="article-title">{this.state.title}</h3>
                        {
                            this.state.paragraphs.map((item, index) =>
                                <ItemParagraph data={item} key={index}/>
                            )
                        }
                    </div>
                </div>
            )
        }
    }
}

export default Paragraphs;