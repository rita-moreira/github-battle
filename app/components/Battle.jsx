import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { close } from "./icons";
import { Link } from "react-router-dom";

function Instructions() {
  return (
    <section className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github Users</li>
        <li>Battle</li>
        <li>See the winner!</li>
      </ol>
    </section>
  );
}

function PlayerInput({ label, onSubmit }) {
  const [username, setUsername] = useState("");

  const handleChange = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(username);
    },
    [onSubmit, username]
  );
  return (
    <form className="card" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="input-row">
        <input
          type="text"
          id="username"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button className="btn link" type="submit" disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <article className="card">
      <h3 className="player-label">{label}</h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className={"avatar"}
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
          <button onClick={onReset} className="btn secondary icon">
            {close}
          </button>
        </div>
      </div>
    </article>
  );
}

PlayerPreview.proptypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
const Battle = () => {
  const [players, setPlayers] = useState({ playerOne: null, playerTwo: null });
  const { playerOne, playerTwo } = players;
  const disabled = !playerOne || !playerTwo;

  const handleSubmit = useCallback(
    (id, player) => {
      setPlayers((prev) => {
        return {
          ...prev,
          [id]: player,
        };
      });
    },
    [setPlayers]
  );

  const handleReset = useCallback(
    (id) => {
      setPlayers((prev) => {
        return {
          ...prev,
          [id]: null,
        };
      });
    },
    [setPlayers]
    );
    

  return (
    <main className="stack main-stack animate-in">
      <div className="split">
        <h1>Players</h1>
        <Link
          to={{
            pathname: '/results',
            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
          }}
          className={`btn primary ${disabled ? "disabled" : ""}`}
        >
          Battle
        </Link>
      </div>
      <section className="grid">
        {playerOne === null ? (
          <PlayerInput
            label="Player One"
            onSubmit={(player) => handleSubmit("playerOne", player)}
          />
        ) : (
          <PlayerPreview
            label="Player One"
            username={playerOne}
            onReset={() => handleReset("playerOne")}
          />
        )}
        {playerTwo === null ? (
          <PlayerInput
            label="Player Two"
            onSubmit={(player) => handleSubmit("playerTwo", player)}
          />
        ) : (
          <PlayerPreview
            label="Player Two"
            username={playerTwo}
            onReset={() => handleReset("playerTwo")}
          />
        )}
      </section>
      <Instructions />
    </main>
  );
};

export default Battle;
