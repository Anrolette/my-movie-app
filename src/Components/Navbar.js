import React, { useState, useEffect } from "react";
import { FormControl, Button, Nav, Navbar, Form } from "react-bootstrap";

//Navbar component with links to home, favourites and if you are have a admin role, the admin view. Also contains the
//search bar that fetches the term inserted from the backend.
export default function Menubar(props) {
    const [searchTerm, setSearchTerm] = useState('')

    function search(e) {
        if (e.type === 'click') {
            props.search(searchTerm);
            setSearchTerm('');
        }
        else {
            setSearchTerm(e.target.value)
        }
    }

    return (
    <div className="justify-content-center align-items-center w-100">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">My Movie App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/favourites">Favorites</Nav.Link>
                {props.userAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
            </Nav>
            {props.render && <Form inline onSubmit={(e) => e.preventDefault()}>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={search}
                />
                <div className="search-box"></div>
                <Button className="search-btn" variant="outline-info" onClick={search}>Search</Button>
            </Form>}
        </Navbar>
    </div>
    );
}
