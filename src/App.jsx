import Board from "./Board/Board";

function App() {
  return (
    <div className="game">
      <audio id="arrowClick">
        <source src="/sound/card.mp3" type="audio/mpeg" />
      </audio>

      <Board />

      <div className="sparkle">
        <div className="fire-flies">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
