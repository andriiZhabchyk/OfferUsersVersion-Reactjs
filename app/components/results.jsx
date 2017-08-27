import React from 'react';
import ItemResult from './itemResult';
import LoadResults from './loadResults';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {results: []}
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        LoadResults()
            .then(data => {
                data = JSON.parse(data);
                this.setState({
                    results: data
                });
            });
    }

    render() {
        return (
            <div>
                <div className="paragraph-container">
                    {
                        this.state.results.map((item, index) =>
                            <ItemResult data={item} key={index}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ResultPage;