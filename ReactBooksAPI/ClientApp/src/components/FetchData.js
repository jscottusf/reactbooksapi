import React, { Component } from 'react';
import API from '../utils/API';
import Card from './Card'
import AddBook from './NewBook';
import Alert from './Alert';
import Dropdown from './Dropdown';
import { FormModal, ModalHeader, ModalBody, ModalFooter, SubmitBtn, CloseBtn } from './Modal';
import { Input } from './Form';

class FetchData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            Name: '',
            Author: '',
            Price: undefined,
            Category: '',
            show: false,
            variant: undefined,
            message: '',
            editId: undefined,
        };
    }

    handleInput = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        API.getBooks().then((res, err) => {
            if (err) {
                console.log(err);
            }
            console.log(res.data);
            this.setState({
                books: res.data,
                Name: '',
                Author: '',
                Price: undefined,
                Category: ''});
        })
    }

    handleSubmit = (event, next) => {
        event.preventDefault();
        if (this.state.Name && this.state.Author && this.state.Price && this.state.Category) {
            API.postBook({
                Name: this.state.Name,
                Author: this.state.Author,
                Price: this.state.Price,
                Category: this.state.Category
            }).then(res => this.getBooks()).catch(err => console.log(err));
            const show = true;
            const message = "Book added successfully";
            const variant = "success";
            this.setState({ show: show, message: message, variant: variant })

        } else {
            const show = true;
            const message = "Book add failed. Make sure to fill out all four categories";
            const variant = "danger";
            this.setState({ show: show, message: message, variant: variant })
        }
        next();
        
    }

    deletebook = id => {
        API.deleteBook(id).then(res => this.getBooks()).catch(err => console.log(err));
        const show = true;
        const message = "Book removed successfully";
        const variant = "success";
        this.setState({ show: show, message: message, variant: variant })
    }

    clearState = () => {
        this.setState({
            Name: '',
            Author: '',
            Price: undefined,
            Category: ''
        });
    }

    handleEditBtn = (event, id, name, author, price, category) => {
        event.preventDefault();
        this.setState({ editId: id, Name: name, Author: author, Price: price, Category: category })
    }

    handleEditSubmit = (event, id) => {
        event.preventDefault();
        if (this.state.Name && this.state.Author && this.state.Price && this.state.Category) {
            API.editBook(id, {
                Name: this.state.Name,
                Author: this.state.Author,
                Price: this.state.Price,
                Category: this.state.Category
            }).then(res => this.getBooks()).catch(err => console.log(err));
            const show = true;
            const message = "Book updated successfully";
            const variant = "success";
            this.setState({ show: show, message: message, variant: variant });
        }
    }

    render() {
        return (
            <div>
                <h1>React Book List</h1>
                <Alert show={this.state.show} message={this.state.message} variant={this.state.variant} />
                {this.state.books.map(book => (
                    <div>
                        <Card key={book.Id} id={book.Id}>
                            <div className="card-body">
                                <h5 className="card-title">{book.Name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{book.Author}</h6>
                                <p className="card-text">
                                    <i className="fas fa-dollar-sign"></i> {book.Price}{' '}
                                    <i className="fas fa-book-reader"></i> {book.Category}
                                </p>
                                <Dropdown>
                                    <div className="dropdown-item" data-toggle="modal" data-target="#editModal" onClick={(event) => this.handleEditBtn(event, book.Id, book.Name, book.Author, book.Price, book.Category)}>
                                        Edit
                                    </div>
                                    <div className="dropdown-item" onClick={() => this.deletebook(book.Id)}>
                                        {' '}
                                        Delete
                                    </div>
                                </Dropdown>
                            </div>
                        </Card>
                    </div>
                    ))
                }
                <AddBook
                    onClick={this.clearState}
                    handleInput={this.handleInput}
                    name={this.state.Name}
                    author={this.state.Author}
                    price={this.state.Price}
                    category={this.state.Category}
                    handleSubmit={this.handleSubmit}
                />
                <FormModal id={"editModal"} clearState={this.clearState} >
                    <ModalHeader>
                        <h4>Edit Book</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Input placeholder="Book Title" value={this.state.Name} name="Name" onChange={this.handleInput} type="text" />
                        <Input placeholder="Author" value={this.state.Author} name="Author" onChange={this.handleInput} type="text" />
                        <Input placeholder="19.99" value={this.state.Price} name="Price" onChange={this.handleInput} type="number" min="0" step=".01" />
                        <Input placeholder="Science Fiction" value={this.state.Category} name="Category" onChange={this.handleInput} type="text" />
                    </ModalBody>
                    <ModalFooter>
                        <CloseBtn onClick={this.clearState} />
                        <SubmitBtn action={'Submit Changes'} onClick={(event) => this.handleEditSubmit(event, this.state.editId)} />
                    </ModalFooter>
                </FormModal>
            </div>
        )
    }
}

export default FetchData;
