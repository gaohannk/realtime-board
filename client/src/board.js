import React, {Component} from 'react'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:3000/dashboard")
            .then((response) => {
                return response.json();
            }).then(res => this.setState({apiResponse: res.data}));
        console.log(this.state.apiResponse);
    }

    componentDidMount() {
        this.callAPI();
    }


    render() {
        const columnOpts = [
            { key: 'Carrier', name: 'Carrier' },
            { key: 'Time', name: 'Time' },
            { key: 'Destination', name: 'Destination' },
            { key: 'Trains', name: 'Trains' },
            { key: 'Track', name: 'Track' },
            { key: 'Status', name: 'Status' },
        ];

        return (
            <div className="table">
                <ul className="table-header">
                    {
                        columnOpts.map((opt, colIndex) => (
                            <li key={`col-${colIndex}`}>{opt.name}</li>
                        ))
                    }
                </ul>
                <ul className="table-body">
                    {
                        this.state.apiResponse.map((entry, rowIndex) => (
                            <li key={`row-${rowIndex}`}>
                                {
                                    columnOpts.map((opt, colIndex) => (
                                        <span key={`col-${colIndex}`}>{entry[opt.key]}</span>
                                    ))
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Board


