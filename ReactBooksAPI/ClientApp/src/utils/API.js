import axios from 'axios';

export default {
    getBooks: function () {
        return axios.get('/api/books');
    },
    getBook: function (id) {
        return axios.get('/api/books/' + id);
    },
    deleteBook: function (id) {
        return axios.delete('/api/books/' + id);
    },
    postBook: function (postData) {
        return axios.post('/api/books/', postData);
    },
    editBook: function (id, postData) {
        return axios.put('/api/books/' + id, postData)
    }
}