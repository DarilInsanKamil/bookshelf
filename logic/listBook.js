const BOOK_STORAGE = "BOOK_STORAGE";
const finishBook = document.getElementById("card-container-finish");
const unfinishBook = document.getElementById("card-container-unfinish");
const container = document.getElementById("container");
let searchInput = document.getElementById('search-input');

let bookStorage = JSON.parse(localStorage.getItem(BOOK_STORAGE));

for (const key of bookStorage) {
  displayBook(key)
}


// //MEMINDAHKAN BUKU
function moveBook(el) {
  Swal.fire({
    title: 'Kamu yakin?',
    text: "Buku akan dipindahkan",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, pindahkan!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Dipindahkan!',
        'Buku berhasil dipindahkan',
        'success'
      )
      let newBook = [];
      const itemID = document.getElementById(el.id)
      for (const keys of bookStorage) {
        if (keys.id === itemID.id) {
          keys.isComplete = !keys.isComplete
          keys.isComplete ? keys.button = 'Baca Ulang' : keys.button = 'Selesai'
        }
        newBook.push(keys)
      }
      localStorage.setItem(BOOK_STORAGE, JSON.stringify(newBook))
      setTimeout(() => {
        location.reload(true)
      }, 2000)
    }
  })
};

//MENAMPILKAN DATA BUKU
function displayBook(key) {
  let books = `
      <div class="card" id="card" key=${key.id}>
        <div class="books">
          <p class="title">${key.title}</p>
          <div class="authors">
            <p class="author">${key.author}</p>
            <p class="realese">${key.year}</p>
          </div>
        </div>
        <div class="buttons">
          <button class="success-button" id="${key.id}" onclick="moveBook(this)">${key.button}</button>
          <button class="failed-button" id="${key.id}" onclick="deleteBook(this)">Delete</button>
        </div>
        </div>
      `;
  //MEMISAHKAN BUKU
  if (key.isComplete) {
    finishBook.insertAdjacentHTML("afterbegin", books);
  } else {
    unfinishBook.insertAdjacentHTML("afterbegin", books);
  }
}


//MENCARI BUKU DI SEMUA RAK
function searchBook() {
  if (searchInput.value !== '') {
    const book = bookStorage.find(item => item.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    let books = `
      <div class="card" id="card" key=${book.id}>
        <div class="books">
          <p class="title">${book.title}</p>
          <div class="authors">
            <p class="author">${book.author}</p>
            <p class="realese">${book.year}</p>
          </div>
        </div>
        <div class="buttons">
          <button class="success-button" id="${book.isComplete}" onclick="moveBook(this)">${book.button}</button>
          <button class="failed-button" id="${book.id}" onclick="deleteBook(this)">Delete</button>
        </div>
      </div>
    <button class="submit-botton"><a href='./index.html'>Kembali</a></button>
      `;
    container.innerHTML = books;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
};

// //MENGAHPUS BUKU DI RAK
function deleteBook(el) {
  Swal.fire({
    title: 'Kamu yakin?',
    text: "Kamu tidak bisa mengembalikannya!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Batal',
    confirmButtonText: 'Ya, hapus!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Buku berhasil dihapus.',
        'success'
      )
      const itemID = document.getElementById(el.id)
      const data = bookStorage.filter(i => i.id !== itemID.id)
      localStorage.setItem(BOOK_STORAGE, JSON.stringify(data))
      setTimeout(() => {
        location.reload(true)
      }, 2000)
    }
  })
};
