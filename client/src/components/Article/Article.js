import React from "react";
import { ListItem } from "../List";

const Article = (props) => {
let saved;
return (
  <ListItem>

    <h3>
      <em>{props.title}</em>{" "}
      <span className="btn-group pull-right">
        <a
          className="btn btn-light"
          href={props.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Article
        </a>
        <button onClick={() => props.handleClick(props._id)} className="btn btn-primary">
          {props.buttonText}
        </button>
      </span>
    </h3>
    <p>
      Date {saved ? "Saved" : "Published"}: {props.date}
    </p>
  </ListItem> 
)};


export default Article;
