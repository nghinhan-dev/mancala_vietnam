import Board from "./Board/Board";

function App() {
  return (
    <div className="game">
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
