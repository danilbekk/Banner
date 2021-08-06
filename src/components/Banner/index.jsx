import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import style from "./style.module.css";

function Digit() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current.current);
  const numberPhone = useSelector((state) => state.current.number);
  const checkbox = useSelector((state) => state.current.checkbox);
  const backGroundColorButton =
    current === numbers[9] ? { backColor: "black", color: "white" } : "";
  const backgroundColorClear =
    current === null ? { backColor: "black", color: "white" } : "";
  const backgroundColorConfirm =
    checkbox.checked && numberPhone.length === 10
      ? { bgColor: "black", color: "white" }
      : "";

  const bgColorCheck = checkbox.default
    ? { bgColor: "black", color: "white" }
    : "";

  const handleChangeCurrent = (number) => {
    dispatch({ type: "mouseOverNumber", payload: number });
  };
  const handleChangeCheckbox = () => {
    dispatch({ type: "mouseOverCheckbox" });
  };
  const handleAddNumber = () => {
    dispatch({ type: "handleClick" });
    if (numberPhone.length === 10) {
    }
  };

  const habdleKeyUp = useCallback(
    (ev) => {
      if (!isNaN(ev.key)) {
        dispatch({ type: "screenKeyboard", payload: Number(ev.key) });
      }
      if (ev.code === "ArrowDown") {
        dispatch({ type: "down" });
      }
      if (ev.code === "ArrowUp") {
        dispatch({ type: "up" });
      }
      if (ev.code === "ArrowLeft") {
        dispatch({ type: "left" });
      }
      if (ev.code === "ArrowRight") {
        dispatch({ type: "right" });
      }
      if (ev.code === "Enter" || ev.code === "Backspace") {
        dispatch({ type: "enter", payload: ev.code });
      }
    },
    [dispatch]
  );
  useEffect(() => {
    document.addEventListener("keyup", habdleKeyUp);
    return () => document.removeEventListener("keyup", habdleKeyUp);
  }, [habdleKeyUp]);

  return (
    <>
      <div className={style.banner}>
        <div className={style.textInfo}>
          Введите ваш номер мобильного телефона
        </div>
        <div className={style.numberForm}>
          +7{numberPhone ? numberPhone.map((item, i) => item) : ""}{" "}
        </div>
        <div className={style.textInfo2}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </div>
        <div className={style.wrapper}>
          <div className={style.buttonNumber}>
            {numbers.map((numberPhone) => {
              return <Banner current={current} digit={numberPhone} />;
            })}
            <div className={style.buttonNumber} style={{}}>
              <button
                onMouseOver={() => handleChangeCurrent(null)}
                onClick={() => {
                  handleAddNumber();
                }}
                style={{
                  backgroundColor: backgroundColorClear.backColor,
                  color: backgroundColorClear.color,
                }}
                className={style.buttonNumber2}
              >
                Стереть
              </button>
              <button
                onMouseOver={() => handleChangeCurrent(numbers[9])}
                onClick={handleAddNumber}
                style={{
                  backgroundColor: backGroundColorButton.backColor,
                  color: backGroundColorButton.color,
                }}
                className={style.buttonNumber2}
              >
                {numbers[9]}
              </button>
            </div>
          </div>
        </div>
        <button
          onMouseOver={handleChangeCheckbox}
          style={{
            backgroundColor: bgColorCheck.bgColor,
            color: bgColorCheck.color,
          }}
          className={style.numberConfirmation}
        >
          <input
            checked={checkbox.checked}
            onClick={() => {
              handleAddNumber();
            }}
            style={{ width: 20 }}
            type="checkbox"
          />
          Согласие на обработку персональных данных
        </button>
        <button
          style={{
            backgroundColor: backgroundColorConfirm.bgColor,
            color: backgroundColorConfirm.color,
          }}
          disabled={
            checkbox.checked && numberPhone.length === 10 ? false : true
          }
          className={style.numberConfirmation}
        >
          Потвердить номер
        </button>
      </div>
    </>
  );
}

export default Digit;
