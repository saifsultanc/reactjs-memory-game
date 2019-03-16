import React, { Component } from "react";

class Card extends Component {
  state = { active: false };

  render() {
    const { active } = this.props;
    const matchedClass = active ? "inside matched" : "inside";
    return (
      <div
        className="card"
        data-id={this.props.data["id"]}
        aria-disabled={this.props.disabled}
        onClick={e => !this.props.disabled && this.props.onClick(e)}
      >
        <div className={matchedClass}>
          <div className="front">
            <img
              src={"img/" + this.props.data["img"]}
              alt={this.props.data["name"]}
              id={this.props.id}
            />
          </div>
          <div className="back" id={this.props.id}>
            <img src={"img/question.png"} alt="Question" id={this.props.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
