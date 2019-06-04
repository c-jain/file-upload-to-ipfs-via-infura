import React from 'react';
import Dropzone from 'react-dropzone';

import './Dashboard.css';
import logo from './../logo/launchdapp-logo-green.png';
import Spinner from './../logo/animat-rocket.gif';

const DashBoard = (props) => (((
	<div>
	    {/* Navber */}
		<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
		  <h3 className="my-0 mr-md-auto font-weight-normal"><a href="/"><img width="180px" src={logo} alt="Logo"/></a></h3>
		  <nav className="navbar navbar-expand-lg navbar-light">
		    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon" />
		    </button>
		    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
		      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
		        <li className="nav-item">
		          <a href="https://twitter.com/launchdapp" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter" /></a>
		        </li>
		        <li className="nav-item">
		          <a href="https://www.launchdapp.io/about" rel="noopener noreferrer" target="_blank" style={{ color: 'black' }}>About</a>
		        </li>
		        <li className="nav-item">
		          <a href="https://www.zastrin.com/" rel="noopener noreferrer" target="_blank" style={{ color: 'black' }}>Learn</a>
		        </li>
		        <li className="nav-item">
		          <a href="https://www.launchdapp.io/users/sign_in" rel="noopener noreferrer" target="_blank" style={{ color: 'black' }}>Login</a>
		        </li>
		      </ul>
		    </div>
		  </nav>
		</div>

        {/* Dropbox */}
	    <div className="text-center mt-5">
	      <div>
	      	<h1 className="lightgreen-fg">
	      		Zastrin Uploads
	      	</h1>
	      	<h2 className="lightgreen-fg">
	      		Uploading your files made easy
	      	</h2>
	      </div>
	      <Dropzone onDrop={props.onDrop} multiple={false} minSize={0} maxSize={10485760}>
	        {({getRootProps, getInputProps, isDragActive, rejectedFiles}) => {
	        	const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 10485760;
	        	return (
		          <div {...getRootProps()} className="dropZone area col-sm-8 offset-sm-3">
		            <input {...getInputProps()} />
		            {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
		            {isFileTooLarge 
		             && (
		                <div className="text-danger mt-2">
		                  File is too large.
		                </div>
                    )}
		          </div>
	            )}
	        }
	      </Dropzone>
	    </div>
        
        {/* Button appearing condition */}
	    {
	    	props.showButton
	    	&& (
               <div className="text-center mt-5">
                 <h5 className="lightgreen-fg">
	      		   {props.fileName}
	      	     </h5>
	    	     <button
	    	       type="button"
	    	       className="btn btn-success"
	    	       onClick={props.uploadToIPFS}
	    	     >
	    	       Ready To Launch
	    	     </button>
	           </div>
	    	)
	    }

        {/* spinner appearing condition */}
	    {
	    	props.loader
	    	&& (
               <div className="text-center mt-5">
                 <img src={Spinner} alt="" height="300" width="300" />
	           </div>
	    	)
	    }

        {/* result appearing condition */}
	    {
	    	props.url
	    	&& (
				<div className="text-center">
					<div className="alert alert-success mt-5">
					  <h3>
					  	<strong>Success!</strong> Your file has been uploaded to IPFS. You can access it at:
					  </h3>   
		              <a href={props.url} rel="noopener noreferrer" target="_blank">{props.url}</a>
					</div>
					<button type="button" className="btn btn-success mt-2" onClick={props.refresh}>Want to upload more?</button>
				</div>
	    	)
	    }
 
        {/* general link */}
		<div className="content-block last-block">
		  <div className="container text-center">
		    <h4>New to Ethereum programming? We have a <a href="https://www.zastrin.com" rel="noopener noreferrer" target="_blank">number of courses</a> to get you started.</h4>
		  </div>
		</div>

        {/* Footer */}
		<div className="container-fluid">
		  <footer className="footer row border-top">
		    <div className="col-12 col-md text-center">
		      <small className="d-block text-muted">2019 © Zastrin, Inc. All rights reserved | <a href="https://twitter.com/launchdapp" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter" /></a> | hello@launchdapp.io</small>
		    </div>
		  </footer>
		</div>
	</div>    
)));

export default DashBoard;
