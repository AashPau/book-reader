import { useEffect, useState } from "react";
import { fetchFromAPI } from "../handler/axiosHandler";
import { randomChar } from "../../util/random_char";

const initialState = {
  bookName: "",
};

const Hero = () => {
  const [form, setForm] = useState(initialState);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getBooks(form.bookName);
    // if (result.status === "success") {
    //   setForm(initialState);
    // }

    // setForm(e.target.value);
    // console.log(e.target.value);
  };

  const getBooks = async (str) => {
    const books = await fetchFromAPI(str);
    setResponse(books);
    setLoading(false);
    books?.num_found > 0 ? setForm(initialState) : null;
  };
  //useEffect to search random movie when page is refreshed
  useEffect(() => {
    const c = randomChar();
    getBooks(c);
  }, []);

  return (
    <div className="bg-secondary">
      {/* search bar */}
      <div className="d-flex flex-column text-center align-items-center justify-content-center p-2">
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
                value={form.bookName}
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
      <div className="container mt-5">
        <div className=" d-flex justify-content-center">
          <h2 className=" text-center">Books</h2>
        </div>
        <hr className="p-2" />
        {/* Card  */}

        <div>
          <div className="row row-cols-2 row-cols-md-3">
            {loading === true ? (
              <div
                className="spinner-border text-success d-flex m-auto"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              response.docs?.map((book, i) => (
                //book output
                <div key={i} className="col mb-4">
                  <div className="card">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      className="card-img-top img-fluid"
                      alt="..."
                    />
                    <div className="card-body">
                      {/* {console.log(book)} */}
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">
                        {/* book.author_name returns arry so check and convert to string  */}
                        {book.author_name?.toString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// https://openlibrary.org/search.json
