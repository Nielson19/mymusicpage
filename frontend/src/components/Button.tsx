import { SIZE } from "../constants/Measurements"
import { COLOR } from "../constants/colors"

type ButtonProps = {
    size?: "SMALL" | "MEDIUM" | "LARGE"
    label: string
    color?: "PRIMARY" | "SECONDARY" | "TERTIARY";
  }
  
export default function Button({ size, label, color }: ButtonProps) {

    return (
      <div className="flex flex-row justify-around m-4">
      <button className= "bg-blue-500 font-bold p-4 rounded-full text-white">
        {label}
      </button>
      </div>
    )
  }


  // export default function Button({ size, label, color }: ButtonProps) {

  //   const colorSet = COLOR[`${color}_CONTAINER` as keyof typeof COLOR]

  //   return (
  //     <button
  //       style={{
  //         backgroundColor: colorSet.background,
  //         color: colorSet.fontColor,
  //         fontSize: `${SIZE.ICON[size]}px`,
  //         padding: `${SIZE.PADDING[size]}px`,
  //         height: `${SIZE.BUTTON.HEIGHT}px`,
  //       }}>
  //       {label}
  //     </button>
  //   )
  // }
  