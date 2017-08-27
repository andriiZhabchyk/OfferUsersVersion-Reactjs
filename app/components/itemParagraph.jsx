import React from 'react';
import ReactDom from 'react-dom';
import sendParagraph from './sendParagraph';

class SendParagraph {
    constructor (articleURL, originalText, usersText) {
        this.articleURL = articleURL;
        this.originalText = originalText;
        this.usersText = usersText;
    }
}

class ItemParagraph extends React.Component{

    sendItemParagraph () {
        let url = window.location.search;
        url = url.split('=');

        const originalText = this.props.data,
            usersText = ReactDom.findDOMNode(this.refs.inputValue).value;

        if (!!usersText) {
            let itemParagraph = new SendParagraph(url[1], originalText, usersText);
            ReactDom.findDOMNode(this.refs.inputValue).value = '';
            sendParagraph(itemParagraph);
        }
    }

    render() {
        return (
            <div className="item-paragraph">
                <div className="paragraph-info">
                    <h3 className="title">ORIGINAL TEXT</h3>
                    <p className="paragraph-text">{this.props.data}</p>
                    <h3 className="title">USERS VERSION</h3>
                    <textarea placeholder="Please, enter your text here" className="input-text" ref='inputValue' />
                </div>
                <div>
                    <img src="" alt=""/>
                    <button className="send-change" onClick={(e) => this.sendItemParagraph(e)}>&#10004; SEND CHANGES</button>
                </div>
            </div>
        )
    }
}

export default ItemParagraph;