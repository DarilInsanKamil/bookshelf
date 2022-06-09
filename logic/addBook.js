const BOOK_STORAGE = "BOOK_STORAGE";
let bookStorage = [];

document.getElementById('form-book').addEventListener('submit', function (e) {
    e.preventDefault()
    const id = new Date().toLocaleTimeString();
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const year = document.getElementById('year-input').value;
    const isComplete = document.getElementById('check').checked;
    let bookList = {
        id,
        title,
        author,
        year,
        isComplete,
        button: isComplete ? 'Baca ulang' : 'Selesai'
    }
    if (localStorage.getItem(BOOK_STORAGE) !== null) {
        bookStorage = [...JSON.parse(localStorage.getItem(BOOK_STORAGE))];
    }
    bookStorage.push(bookList);
    localStorage.setItem(BOOK_STORAGE, JSON.stringify(bookStorage))

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Buku berhasil disimpan',
        showConfirmButton: false,
        timer: 1500
    })

    title= ''
    author= ''
    year= ''
})
