import { useCallback, useEffect, useState } from "react";
import Digit from "../Banner";
import style from "./style.module.css";
import logo from "../../assets/qrcode.png";
import qrcode from "../../assets/img3.png";
import dog from "../../assets/video.png";
import boyAndDog from "../../assets/boyAndDog.png";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const [form, setForm] = useState(false);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.current.open);
  const handleCLose = () => {
    dispatch({ type: "enterOpen" });
  };
  const handleOpen = () => {
    dispatch({ type: "enterOpen" });
  };

  const habdleKeyUp = useCallback(
    (ev) => {
      if (open === true && ev.code === "Enter") {
        return;
      }
      if (ev.code === "Enter") {
        dispatch({ type: "enterOpen" });
      }
    },
    [open, dispatch]
  );
  useEffect(() => {
    document.addEventListener("keyup", habdleKeyUp);
    return () => document.removeEventListener("keyup", habdleKeyUp);
  }, [habdleKeyUp]);

  return (
    <div
      style={
        form || open === true
          ? { backgroundImage: `url(${boyAndDog})` }
          : { backgroundImage: `url(${dog})` }
      }
      className={style.main}
    >
      {form || open === true ? <Digit /> : null}
      {form || open === true ? (
        <>
          <button
            className={style.buttonClose}
            onClick={() => {
              setForm(false);
              handleCLose();
            }}
          >
            X
          </button>
          <div className={style.scanQr}>
            <div>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</div>
            <img alt="" src={qrcode} />
          </div>
        </>
      ) : (
        <div className={style.QRcode}>
          <div className={style.QRtext}>
            ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ!
          </div>
          <img style={{ marginTop: 10 }} alt="" src={logo}></img>
          <div className={style.QRtext2}>Сканируйте QR-код или нажмите ОК</div>
          <button
            className={style.buttonOk}
            onClick={() => {
              setForm(true);
              handleOpen();
            }}
          >
            <div>ОК</div>
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
