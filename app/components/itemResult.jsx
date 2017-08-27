import React from 'react';
import ReactDom from 'react-dom';
import SendResult from './sendResult';

class ItemResult extends React.Component {
    /*check approve*/
    approveUserVersion (e) {
        const target = e.target.innerHTML,
            id = this.props.data._id;

        (target === 'APPROVE') ? this.sendResult(id, true): this.sendResult(id, false);
        this.HideItemResult ();
    }

    /*send result to server*/
    sendResult (id, decision) {
        SendResult(id, decision);
    }

    /*hide item element*/
    HideItemResult () {
        const result = ReactDom.findDOMNode(this.refs.itemResult);
        result.classList.add('hide');
    }

    render() {
        return (
            <div>
                <div className="item-paragraph" id={this.props.data._id}  ref='itemResult'>
                    <div className="paragraph-info">
                        <h3 className="title">ORIGINAL TEXT</h3>
                        <p className="paragraph-text">{this.props.data.originalText}</p>
                        <h3 className="title">USERS VERSION</h3>
                        <p className="paragraph-text">{this.props.data.usersText}</p>
                    </div>
                    <div>
                        <button className="send-change" onClick={(e) => this.approveUserVersion(e)}>&#10004; APPROVE</button>
                        <button className="send-change" onClick={(e) => this.approveUserVersion(e)}>&#10008; DELETE</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemResult;