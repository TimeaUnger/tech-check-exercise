import { useState } from "react";

const booksData = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    read: true,
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    read: false,
  },
  {
    id: 3,
    title: "Refactoring",
    author: "Martin Fowler",
    read: false,
  },
  {
    id: 4,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    read: true,
  },
];

interface Book {
  id: number;
  title: string;
  author: string;
  read: boolean;
}

interface BookListProps {
  books: Book[];
}

interface BookCardProps {
  book: Book;
  handleRead: (id: number) => void;
}

export const BookList = ({ books }: BookListProps) => {
  const [booksList, setBooksList] = useState<Book[]>(books);

  const handleRead = (id: number) => {
    setBooksList((prev) => (
        prev.map((book) => (
            book.id === id 
            ? {...book, read: true}
            : book
        ))
    ))
  };


  return (
    <>
      {booksList.map((book) => (
        <BookCard 
          key={book.id}
          book={book} 
          handleRead={handleRead} 
        />
      ))}
    </>
  );
};

export const BookCard = ({ book, handleRead }: BookCardProps) => {
  return (
    <div>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div>{book.read ? "Read" : "Not Read"}</div>
      <button onClick={() => handleRead(book.id)}>Read</button>
    </div>
  );
};
