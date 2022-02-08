import React, { useState } from "react"
import { useSpring, animated, config } from "react-spring";
import Index from "./component";


const App = () => {
 
  const [showA, setShowA] = useState(false);

 /*{}   const fadeStyles = useSpring({
    config: { ...config.stiff, duration: 500 },
    from: { opacity: 0 },
    to: {
      opacity: showA ? 1 : 0
    }
  }); */

  return (
    <div classname= "container">

      <Index />
          {/*  /*  <div style={{ padding: "15px" }} className="">
            <h2>Fade Demo</h2>
            <div>
              <animated.div style={fadeStyles}>
                This content will
                <br />
                fade in
                <br />
                and
                <br />
                fade out
              </animated.div>
              <br />
              <button onClick={() => setShowA(val => !val)}>Toggle</button>
            </div>
          </div> */ }
    </div>
  );
}

export default App;