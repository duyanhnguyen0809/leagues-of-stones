import React from "react";
import Card from "./components/Card";
import Deck from "./components/Deck";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCards: [],
      deck: [],
      minimized: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/cards")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          availableCards: data.map((card, index) => ({
            ...card,
            originalIndex: index,
          })),
        })
      )
      .catch((error) => console.error("Error:", error));
  }

  handleCardClick = (card) => {
    this.setState((prevState) => ({
      availableCards: prevState.availableCards.filter((c) => c.id !== card.id),
      deck: [...prevState.deck, card],
    }));
  };

  handleRemoveCard = (card) => {
    this.setState((prevState) => {
      const newAvailableCards = [...prevState.availableCards, card].sort(
        (a, b) => a.originalIndex - b.originalIndex
      );

      return {
        deck: prevState.deck.filter((c) => c.id !== card.id),
        availableCards: newAvailableCards,
      };
    });
  };
  handleMinimizeClick = () => {
    this.setState((prevState) => ({
      minimized: !prevState.minimized,
    }));
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row ">
          {this.state.minimized && (
            <button
              type="button"
              className="btn btn-primary m-3 fs-2"
              style={{
                position: "fixed",
                width: "100px",
                height: "100px",
                right: "0",
                bottom: "0",
                zIndex: "1000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.deck.length}
            </button>
          )}

          <button
            onClick={this.handleMinimizeClick}
            className="fixed-bottom btn btn-danger m-3"
            style={{ width: "50px", height: "50px" }}
          >
            {this.state.minimized ? "+" : "-"}
          </button>
          <div className="col-md-12">
            <div className="row no-gutters justify-content-center">
              {this.state.availableCards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={() => this.handleCardClick(card)}
                />
              ))}
            </div>
          </div>

          {!this.state.minimized && (
            <Deck cards={this.state.deck} onCardClick={this.handleRemoveCard} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
