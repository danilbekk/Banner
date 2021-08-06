import { useDispatch } from "react-redux";
import style from "./style.module.css";

function Banner({ digit, current }) {
  const backGroundColorButton =
    current === digit ? { backColor: "black", color: "white" } : "";
  const dispatch = useDispatch();

  const handleChangeCurrent = (number) => {
    dispatch({ type: "mouseOverNumber", payload: number });
  };

  const handleAddNumber = () => {
    dispatch({ type: "handleClick" });
  };

  return digit === 0 ? null : (
    <button
      key={digit}
      onMouseOver={() => handleChangeCurrent(digit)}
      onClick={handleAddNumber}
      style={{
        backgroundColor: backGroundColorButton.backColor,
        color: backGroundColorButton.color,
      }}
      className={style.buttonNumber2}
    >
      {digit}
    </button>
  );
}

export default Banner;
