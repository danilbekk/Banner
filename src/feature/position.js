const initialState = {
  current: 1,
  number: "",
  clear: "",
  open: null,
  checkbox: {
    checked: false,
    default: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "enterOpen":
      if (state.open) {
        return {
          ...state,
          open: null,
        };
      }
      return {
        ...state,
        open: true,
      };
    case "handleClick":
      if (state.current === null) {
        return {
          ...state,
          number: state.number.slice(0, state.number.length - 1),
        };
      }
      if (state.checkbox.default) {
        return {
          ...state,
          checkbox: { ...state.checkbox, checked: !state.checkbox.checked },
        };
      }
      if (state.number.length === 10) {
        return {
          ...state,
          number: state.number,
        };
      }

      return {
        ...state,
        number: [...state.number, state.current],
      };
    case "mouseOverNumber":
      return {
        ...state,
        current: action.payload,
        checkbox: {
          ...state.checkbox,
          default: false,
        },
      };
    case "mouseOverCheckbox":
      return {
        ...state,
        current: false,
        checkbox: {
          ...state.checkbox,
          default: true,
        },
      };
    case "screenKeyboard":
      if (state.number.length === 10) {
        return {
          ...state,
          number: state.number,
        };
      }
      return {
        ...state,
        number: [...state.number, action.payload],
      };
    case "up":
      if (state.current === 0) {
        return {
          ...state,
          current: 9,
        };
      }
      if (state.current === null) {
        return {
          ...state,
          current: 8,
        };
      }
      if (state.checkbox.default === true) {
        return {
          ...state,
          current: null,
          checkbox: { ...state.checkbox, default: false },
        };
      }

      if (state.current < 3) {
        return {
          ...state,
          current: null,
        };
      }
      if (state.current < 1) {
        return {
          ...state,
          current: 9,
        };
      }

      return {
        ...state,
        current: state.current - 3,
      };

    case "down":
      if (state.current === 7 || state.current === 8) {
        return {
          ...state,
          current: null,
        };
      }
      if (state.current === null || state.current === 0) {
        return {
          ...state,
          current: false,
          checkbox: {
            ...state.checkbox,
            default: true,
          },
        };
      }
      if (state.checkbox.default === true) {
        return {
          ...state,
          current: null,
          checkbox: { ...state.checkbox, default: false },
        };
      }
      if (state.current === 9) {
        return {
          ...state,
          current: 0,
        };
      }
      return {
        ...state,
        current: state.current + 3,
      };

    case "left":
      if (state.current === 0 || state.current === null) {
        return {
          ...state,
          current: null,
        };
      }
      return {
        ...state,
        current: state.current - 1,
      };
    case "right":
      if (state.current === 9 || state.current === null) {
        return {
          ...state,
          current: 0,
        };
      }
      return {
        ...state,
        current: state.current + 1,
      };
    case "enter":
      if (action.payload === "Backspace") {
        return {
          ...state,
          number: state.number.slice(0, state.number.length - 1),
        };
      }
      if (state.current === null) {
        return {
          ...state,
          number: state.number.slice(0, state.number.length - 1),
        };
      }
      if (state.checkbox.default === true) {
        return {
          ...state,
          checkbox: { ...state.checkbox, checked: !state.checkbox.checked },
        };
      }
      if (state.number.length === 10) {
        return {
          ...state,
          number: state.number,
        };
      }

      return {
        ...state,
        number: [...state.number, state.current],
      };

    default:
      return {
        ...state,
      };
  }
}
