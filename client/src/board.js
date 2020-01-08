import React, {Component} from 'react'
import "./public/stylesheets/board.css";
import axios from  "axios";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            apiResponse: [],
        };
    }

    async callAPI() {
        this.setState({...this.state, isFetching: true});
        const res = await axios.get("http://localhost:3000/dashboard")
        console.log(res.data);
        this.setState({apiResponse: res.data, isFetching: false})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () =>  this.callAPI(),
            60 * 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const columnOpts = [
            { key: 'carrier', name: 'Carrier' },
            { key: 'time', name: 'Time' },
            { key: 'destination', name: 'Destination' },
            { key: 'trains', name: 'Trains' },
            { key: 'track', name: 'Track' },
            { key: 'status', name: 'Status' },
        ];

        return (
            <div className="table">
                <table>
                    {
                        columnOpts.map((opt, colIndex) => (
                            <th key={`col-${colIndex}`}>{opt.name}</th>
                        ))
                    }
                    <br />
                    {
                        this.state.apiResponse.map((entry, rowIndex) => (
                            <tr key={`row-${rowIndex}`}>
                                {
                                    columnOpts.map((opt, colIndex) => (
                                        <td key={`col-${colIndex}`}>{entry[opt.key]}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </table>
            </div>
        );
    }
}

export default Board


