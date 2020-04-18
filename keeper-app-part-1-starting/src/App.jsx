import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";

function App() {
    return( 
    <div>
        <Header className="note"/>
        <Note/>
        <Footer/>
    </div>);
}

export default App;