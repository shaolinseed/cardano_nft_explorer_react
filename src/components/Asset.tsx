import { useEffect } from "react"

type Props = {
  name: string
  image: string
  quantity: string
}

const Asset: React.FC<Props> = ({ name, image, quantity }: Props) => {
  useEffect(() => {
    // console.log(name)
    // console.log(image)
  })
  return (
    <div>
      <div className="flex items-center justify-center rounded-md  p-4">
        <img
          src={image}
          className="max-h-[300px] max-w-[300px]"
          alt=""
        />
        </div>
        <div>{quantity + ' - ' + name}</div>
        <div></div>

      </div>
    // <div>{name}</div>
    
  )
}

export default Asset
