import { makeStyles, createStyles } from "@mui/styles";
import Background from "../images/background.jpg";
import MainRouter from "../routes/MainRouter";

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      backgroundImage: `url(${Background})`,
      minHeight: "100vh",
      height: "100%",
      backgroundSize: "cover",
      boxSizing: "border-box",
      padding: "10px calc(50% - 775px)",
      minWidth: 360,
    },
    header: {
      color: "#7fff00",
      textAlign: "center",
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <h1>
          RICK AND MORTY CHARACTERS FROM{" "}
          <a href="https://rickandmortyapi.com/documentation">
            rickandmortyapi
          </a>
        </h1>
      </header>
      <MainRouter />
    </main>
  );
};

export default Home;
