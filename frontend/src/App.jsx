import logo from './logo.svg';
import './App.css';
import axios from "axios"
function App() {

  const formHandler = (event) => {
    const imgFile = event.target.image.files[0]
    console.log(imgFile)
    const productName = "Product" + new Date().getTime();
    let formData = new FormData();
    formData.append("name", productName);
    formData.append("image", imgFile);
    axios.post(
      "http://localhost:5000/upload",
      formData
    )
      .then(
        () => {
          console.log("All Good");
        }
      )
      .catch(
        () => {
          console.log("Somthing not good");
        }
      )
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={formHandler}>
          <input type="file" name='image' />
          <button>Save</button>
        </form>
      </header>
    </div>
  );
}

export default App;
