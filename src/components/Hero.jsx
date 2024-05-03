import { useState } from "react";
import { fetchFromAPI } from "../handler/axiosHandler";

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
    const book = await fetchFromAPI(str);
    setResponse(book);
    setLoading(false);
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
      <div className="container mt-5">
        <div className=" d-flex justify-content-center">
          <h1 className=" text-center">Books</h1>
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
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Some content here.</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

// https://openlibrary.org/search.json
