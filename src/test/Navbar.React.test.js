import React from 'react'
import { Navbar } from 'react-bootstrap';
import renderer from 'react-test-renderer'

test('renders correctly' , () => {
    const tree = renderer
        .create(<Navbar />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});