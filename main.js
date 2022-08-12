const books = [];



// Fungsi Membuat elemet
function  createViewBook(i,book){
    let completeBook;
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const pPenulis = document.createElement('p');
    const pTahun = document.createElement('p');
    const div = document.createElement('div');
    const buttonComplit = document.createElement('button');
    const buttonHapus = document.createElement('button');
    if (book['isComplete'] === true) {
        completeBook = document.getElementById("completeBookshelfList");
        buttonComplit.setAttribute("onclick", "editBook('books'," + i + ")");
    } else if (book['isComplete'] === false) {
        completeBook = document.getElementById("incompleteBookshelfList")
        buttonComplit.setAttribute("onclick", "editBook('books'," + i + ")");
    }
    console.log(book)


    completeBook.appendChild(article)
    article.appendChild(h3);
    article.appendChild(pPenulis);
    article.appendChild(pTahun);
    article.appendChild(div);
    div.appendChild(buttonComplit);
    div.appendChild(buttonHapus);

    article.className = "book_item";
    div.className = "action";
    buttonComplit.className = "green";
    buttonHapus.className = "red";


    h3.textContent = `${book['title']}`;
    pPenulis.textContent = `${book['author']}`;
    pTahun.textContent = `${book['year']}`;
    buttonComplit.textContent = `Belum selesai di Baca`;
    buttonHapus.textContent = `Hapus Buku`;

    buttonHapus.setAttribute("onclick", "deleteBook('books'," + i + ")")

}

// fungsi memanggil create element dan pencarian deangan memanggil funsi createViewBook
function displayBooks() {
    clearTodolist();
    let data = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < data.length; i++) {
        const book = data[i];

        const searchText = document.getElementById('searchBookTitle').value.toLowerCase();
        if (book['title'].toLowerCase().includes(searchText)) {
            createViewBook(i,book);
        }
    }
}

// methode untuk mengambil input dalam form agar tidak reaload
// jika reload dan input kembali maka data akan ter Replace
document.forms['addBook'].onsubmit = function (event) {
    event.preventDefault();
    const t= document.forms['addBook']['inputBookTitle'].value;
    const a= document.forms['addBook']['inputBookAuthor'].value;
    const y= document.forms['addBook']['inputBookYear'].value;
    const b= document.forms['addBook']['inputBookIsComplete'].checked;
    const book = {
        id: +new Date,
        title: t,
        author: a,
        year: y,
        isComplete: b,
}
    books.push(book);
    document.forms['addBook'].reset();
    save(books);
};

// Fungsi untuk menyimpan buku ke Local Storage
function save(books) {
    localStorage.setItem('books',JSON.stringify(books));
    displayBooks();
}

// fungsi untuk menegathui perubahan pada input search
// tidak menggunakan onChange? itu terlalu lama karena menunggu kita keluar dari focus inputnya
let cari = document.getElementById('searchBookTitle');
cari.onkeyup = function () {
    // console.info(cari.value);
    displayBooks();
}
cari.onkeydown = function () {
    console.info(cari.value);
    displayBooks();
}


// fungsi untuk menghapus buku
function deleteBook(key,index) {
    let removeItem = JSON.parse(localStorage.getItem(key));
    if (index === 0) {
        removeItem.splice(index, 1)
    }
    localStorage.setItem(key, JSON.stringify(removeItem));
    displayBooks();
}

// fungsi untuk membersihkan element ya tertinggal dengan menghapus firstchild
function clearTodolist()
{
    const book_list1 = document.querySelector('#incompleteBookshelfList');
    while (book_list1.firstChild){
        book_list1.removeChild(book_list1.firstChild)
    }
    const book_list2 = document.querySelector('#completeBookshelfList');
    while (book_list2.firstChild){
        book_list2.removeChild(book_list2.firstChild)
    }
}


// funsi edit(mengubah rak dari belum selesai dibaca ke selesai dibaca atau sebaliknya)
function editBook(key,index) {
    let editData = JSON.parse(localStorage.getItem(key));
    // editData = editData[index];
    for (let i = 0; i < editData.length; i++) {
        let edit = editData[i];
        if (i === index){
            const book = {
                id: edit['id'],
                title: edit['title'],
                author: edit['author'],
                year: edit['year'],
                isComplete: !edit['isComplete'],
            }
            if (index === 0) {
                books.splice(index, 1)
            }
            clearTodolist();
            books.push(book);
        } if (i !== index) {
            const book = {
                id: edit['id'],
                title: edit['title'],
                author: edit['author'],
                year: edit['year'],
                isComplete: edit['isComplete'],
            }
            clearTodolist();
            books.push(book);
        }
        console.log(books);
        }
    localStorage.setItem(key, JSON.stringify(books));
    location.reload();
    displayBooks();
}
displayBooks();