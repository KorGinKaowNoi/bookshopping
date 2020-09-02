import React,{ Component } from 'react';

class ShowData extends Component {
    render(){
        return(
            <tr>
                <td>
                    {this.props.obj.personal_id}
                </td>
                <td>
                    {this.props.obj.personal_name}
                </td>
                <td>
                    {this.props.obj.personal_nickname}
                </td>
                <td>
                    {this.props.obj.personal_birthday}
                </td>
            </tr>
        );
    }
}

export default ShowData;