import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Tool';
import SendFile from './Components/UploadFiles';
import IMG2PDF from './Components/IMG2PDF';
import JPG2PNG from './Components/JPG2PNG';
import PNG2JPG from './Components/PNG2JPG';
import PNG2GIF from './Components/PNG2GIF';
import Compress_Img from './Components/Compress_img';
import Resize_Img from './Components/ResizeImg';
import Crop_Img from './Components/CropImg';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sendfile" element={<SendFile />} />
        <Route path="/img2pdf" element={<IMG2PDF />} />
        <Route path="/jpg2png" element={<JPG2PNG />} />
        <Route path="/png2jpg" element={<PNG2JPG />} />
        <Route path="/png2gif" element={<PNG2GIF />} />
        <Route path="/compressimg" element={<Compress_Img />} />
        <Route path="/resizeimg" element={<Resize_Img />} />
        <Route path="/cropimage" element={<Crop_Img />} />
      </Routes>
    </Router>
  );
}

export default App;
