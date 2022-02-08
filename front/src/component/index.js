import React, { useState } from "react";
import "../styles/design.css";
import List from "./liste";
import Head from "./head";
import Form from "./form";


const Index = () => {

    return (
        <div className="body" >
             <Head />
             <Form />
        </div>
    );
}

export default Index;