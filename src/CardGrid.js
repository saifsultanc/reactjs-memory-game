import React, { Component } from "react";
import Card from "./Card";
import { cards } from "./CardData";
import { shuffle } from "lodash";

class CardGrid extends Component {
  state = {
    cards: [...cards],
    sequence: shuffle([...Array(12).keys(), ...Array(12).keys()]),
    cardOpened: Array(24).fill(false),
    previousClick: false,
    cardSelected: null,
    isCardSelectionDisabled: false
  };

  cardShow = index => {
    const cardOpened = [...this.state.cardOpened];
    cardOpened[index] = true;
    this.setState({ cardOpened });
  };

  cardHide = index => {
    const cardOpened = [...this.state.cardOpened];
    cardOpened[index] = false;
    this.setState({ cardOpened });
  };

  checkAllWin = () => {
    const { cardOpened, cards } = this.state;
    return cardOpened.filter(Boolean).length === cards.length * 2;
  };

  handleClick = event => {
    let { cards, previousClick, cardSelected, sequence } = this.state;

    const cardNumber = event.target["id"];
    this.cardShow(cardNumber);
    if (!previousClick) {
      this.setState({ cardSelected: cardNumber });
    } else {
      if (
        cards[sequence[cardSelected]] !== undefined &&
        cards[sequence[cardNumber]] !== undefined
      ) {
        if (
          cardSelected !== cardNumber &&
          cards[sequence[cardSelected]]["id"] ===
            cards[sequence[cardNumber]]["id"]
        ) {
          // success, dont unhide
        } else {
          setTimeout(
            function() {
              this.cardHide(cardSelected);
              this.cardHide(cardNumber);
            }.bind(this),
            1000
          );
        }
        this.setState({ isCardSelectionDisabled: true });
        setTimeout(
          function() {
            this.setState({ isCardSelectionDisabled: false });
          }.bind(this),
          1000
        );
      } else {
        this.setState({ cardSelected: null, previousClick: true });
      }
    }

    this.setState({ previousClick: !previousClick });

    if (this.checkAllWin()) {
      this.props.onWin();
    }
  };

  render() {
    const { cards, sequence, cardOpened, isCardSelectionDisabled } = this.state;
    let gridOrder = 0;

    return (
      <div className="wrap">
        <div className="game">
          {sequence.map(index => {
            return (
              <Card
                key={gridOrder}
                active={cardOpened[gridOrder]}
                id={gridOrder++}
                data={cards[index]}
                onClick={this.handleClick}
                disabled={isCardSelectionDisabled}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardGrid;
