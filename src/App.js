import React from 'react';
import ipfs from './ipfs';
import Dashboard from './Component/Dashboard';

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      url: '',
      fileName: '',
      loader: false,      // this tells when to start spinner
      showButton: false,  // this tells when to show button
      buffer: null,
    };
  }

  // this function makes file ready for further processing
  usercaptureFile = (inputFile) => {
    this.state.url                         // I have eslinter installed 
    && (                                   // so I need to follow this style and syntax everywhere
      this.setState({
        url: '',
        fileName: '',
        buffer: null,
      })
    )
    this.setState({
      showButton: true,
      fileName: inputFile.name,
    });
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(inputFile);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  // this function converts file to buffer
  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({buffer});
  }                               
  
  // this function uploads file to ipfs
  uploadToIPFS = async () => { 
    this.setState({
      loader: true,
      showButton: false,
    });
    await ipfs.add(this.state.buffer, {wrapWithDirectory: true}, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      this.setState({
        url: "https://ipfs.io/ipfs/" + ipfsHash[1].hash + "/" + this.state.fileName,
        loader: false,
      });
    })    
  }
  
  //this function is like onChange event. Called when someone drop file  
  onDrop = (acceptedFiles) => {
    if(acceptedFiles.length === 1) {
      console.log(acceptedFiles);
      var inputFile = acceptedFiles[0];
      this.usercaptureFile(inputFile);
    }
  }
  
  // this function let user make a new upload by reseting the states
  refresh = () => {
    this.setState({
      url: '',
      fileName: '',
      buffer: null,
    });
  }

  render() {
    return (
      <div>
        <Dashboard 
          onDrop={this.onDrop}
          showButton={this.state.showButton}
          fileName={this.state.fileName}
          uploadToIPFS={this.uploadToIPFS}
          loader={this.state.loader}
          url={this.state.url}
          refresh={this.refresh}
        />
      </div>
    );
  }
}

export default App;
