import { Toaster } from "react-hot-toast";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";
import ThreeScene from "../ThreeScene/ThreeScene.jsx";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <div className={css.background} style={{ maxHeight: "100vh" }}>
        <ThreeScene />
      </div>

      <div className={css.content}>
        <AppBar />
        {children}
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
