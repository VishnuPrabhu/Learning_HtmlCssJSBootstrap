import React from "react";
import Entry from "./Entry";
import emojiPedia from "../emojipedia"



function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojiPedia.map(emojiTerm => 
          <Entry 
            key={emojiTerm.id}
            emoji={emojiTerm.emoji}
            name={emojiTerm.name}
            description={emojiTerm.meaning}
          />
        )}
      </dl>
    </div>
  );
}

export default App;
