import React from 'react';
import ipfs from './ipfs';
import './App.css';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      Url: null
    };

    this.uploadToIPFS = this.uploadToIPFS.bind(this);
  }

  

  uploadToIPFS() {   
    var file = document.getElementById('input').files;
    var reader = new window.FileReader();
    reader.readAsArrayBuffer(file[0]);
    setTimeout(() => {
      var val = Buffer.from(reader.result);
      const data = {path: file[0].name, content: val};
      ipfs.add(data, {wrapWithDirectory: true})
      .then((response) => { 
        this.setState({
          Url: "https://ipfs.io/ipfs/" + response[1].hash + "/" + file[0].name
        });
      })
    }, 5000);    
  }
    

  render() {
    return (
      <div className="App">
        <h1>Upload files on ipfs using infura</h1>        
        <div className="container">
          
          <input 
          className="mt-5"
          type="file"
          id="input"/>
          
          <button
          className="btn-success mt-5"
          type="submit"
          onClick={this.uploadToIPFS}>
            Upload              
          </button>

          {
            this.state.Url &&
            <div className="alert alert-success mt-5">
              <p className="text-center">Your file has been uploaded to IPFS. You can access it at: {'\n'}     
                                          <a href={this.state.Url} target="blank">{this.state.Url}</a>
              </p>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default App;
