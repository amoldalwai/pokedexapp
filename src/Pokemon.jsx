import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const Pokemon = () => {
  const [sval, setsval] = useState();
  const [pokename, setpokename] = useState();
  const [type, settype] = useState();
  const [height, setheight] = useState();
  const [weight, setweight] = useState();

  const [attack, setattack] = useState();
  const [defense, setdefense] = useState();
  const [speed, setspeed] = useState();
  const [pokeImg, setpokeImg] = useState();

  async function getData() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${sval}`);

    setpokename(res.data.name);

    // const resImg=`https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`;
    //sprites with low resolution
    //setpokeImg(res.data.sprites.front_default);
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.data.id}.png
    //svg fast loading image url
    // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${res.data.id}.svg`

    setpokeImg(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${res.data.id}.png`
    );

    settype(res.data.types[0].type.name);
    setheight(res.data.height + " m");
    setweight(res.data.weight + " kg");
    setattack("Attack : " + res.data.stats[1].base_stat);
    setdefense("Defense : " + res.data.stats[2].base_stat);
    setspeed("Speed : " + res.data.stats[5].base_stat);
  }

  return (
    <>
      <br />
      <center>
        <Paper
          elevation={4}
          m={4}
          style={{ padding: "15px", width: "300px", borderRadius: "20px" }}
        >
          <br />
          <TextField
            id="standard-basic"
            label=" Pokemon Name/ID"
            value={sval}
            onChange={(event) => {
              setsval(event.target.value);
            }}
          />
          <Fab color="primary" aria-label="search">
            <SearchIcon onClick={getData} />
          </Fab>
          <br />
          <br />
          <div className="imgContainer">
            <img className="pokeImg" src={pokeImg} />
          </div>
          <p
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {pokename}
          </p>
          <p>Height:{height}</p>
          <p>Weight:{weight}</p>
          <br />
          <span style={{ fontWeight: "bold" }}>Type: </span>
          <Chip label={type} />
          <br />
          <br />
          <br />
          <Chip label={attack} clickable color="secondary" />
          &nbsp;
          <Chip label={defense} clickable color="primary" />
          &nbsp;
          <Chip
            label={speed}
            clickable
            style={{ background: "#00a152", color: "white" }}
          />
          &nbsp;
          <br />
          <br />
        </Paper>
      </center>
    </>
  );
};
export default Pokemon;
