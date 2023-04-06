import Board from "./Board/Board";

function App() {
  return (
    <div className="game">
      {/* arrow click sound */}
      <audio id="arrowClick">
        <source src="/sound/card.mp3" type="audio/mpeg" />
      </audio>

      {/* get point sound */}
      <audio id="getPoint">
        <source src="/sound/get-point.mp3" type="audio/mpeg" />
      </audio>

      {/* get point sound */}
      <audio id="winnerAu">
        <source src="/sound/winner.mp3" type="audio/mpeg" />
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
