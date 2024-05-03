import { useState } from "react";
import { fetchFromAPI } from "../handler/axiosHandler";

const initialState = {
  bookName: "",
};

const Hero = () => {
  const [form, setForm] = useState(initialState);
  const [response, setResponse] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getBooks(form.bookName);
    // if (result.status === "success") {
    //   setForm(initialState);
    // }

    // setForm(e.target.value);
    // console.log(e.target.value);
  };

  const getBooks = async (str) => {
    const book = await fetchFromAPI(str);
    setResponse(book);
  };

  return (
    <>
      <div className="d-flex flex-column text-center align-items-center justify-content-center mt-3 p-2">
        <h1>Search for books</h1>
        <div className="mt-5">
          <form className="row g-3" onSubmit={handleOnSubmit}>
            <div className="col-auto">
              <label htmlFor="bookname" className="visually-hidden">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="bookname"
                placeholder="The Great Gatsby"
                name="bookName"
                onChange={handleOnChange}
                // value={form.bookName}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div>
          <h1>Books</h1>
        </div>
        <div>
          {response.docs?.map((book, i) => (
            <div className="card" style={{ width: "18rem" }} key={i}>
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">Author name</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;

// https://openlibrary.org/search.json
