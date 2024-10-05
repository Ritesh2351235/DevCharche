import { Auth2 } from "../components/Auth2"
import { Quote } from "../components/Quote"

export const Signin = () => {

  return <>
    <div className="grid grid-cols-2 h-screen">
      <div >
        <Auth2></Auth2>
      </div>
      <div className="none lg:block">
        <Quote></Quote>
      </div>

    </div>

  </>
}