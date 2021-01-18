import React from 'react';
import s from './index.css';

class Drawer extends React.Component {
    state = {
        isOpen: false,
        childrenHeight: 0
    }
    click = () => {
        let current = this.state.isOpen;
        let div = document.getElementById('ttt');
        console.log(div.clientHeight);
        this.setState({
            isOpen: !current,
            childrenHeight: div.clientHeight
        })
    }
    render() {
        const { isOpen, childrenHeight } = this.state;
        const styly = { height: `${childrenHeight}px`};
        return <div className={isOpen ? s.open : s.close} style={isOpen? styly:{}} onClick={this.click}>
            {/* <div id="ttt" className={s.content}>1</div> */}
            {this.props.children}
        </div>
    }
}

export default Drawer;