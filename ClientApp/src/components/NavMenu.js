import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
export class NavMenu extends Component {
    state = { activeItem: 'Home' }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }
    render() {
        const { activeItem } = this.state
        //debugger;
        return (
            <Menu horizental>
                <Menu.Item as={Link} to="/"
                    color='green'
                    icon='home'
                    name='Home'
                    active={activeItem === 'Home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="customer"
                    color='green'
                    icon='user'
                    name='Customer'
                    active={activeItem === 'Customer'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="product"
                    color='green'
                    icon='archive'
                    name='Product'
                    active={activeItem === 'Product'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="store"
                    color='green'
                    icon='building outline'
                    name='Store'
                    active={activeItem === 'Store'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="sales"
                    color='green'
                    icon='dollar sign'
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                />
            </Menu >
        )
    }
}