import { useState } from "react";

function Comments() {
const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="comments-section">
      {isLoading ? <p>Loading comments...</p> : null}
      <div className="comment">
        <p>COMMENT PLACEHOLDER</p>
      </div>
      <div className="comment">
        <p>COMMENT PLACEHOLDER</p>
      </div>
      <div className="comment">
        <p>COMMENT PLACEHOLDER...</p>
      </div>
    </div>
  );
}

export default Comments;
