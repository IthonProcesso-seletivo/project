import { Fragment } from "react/jsx-runtime"

const Header = () =>{
    return (
        <Fragment>
          <div className="min-h-[96px] bg-[#2D815D] flex items-center justify-between">
            <div className="m-4 bg-[#89BFA1]">
                <img src="" alt="Logo do site" />
            </div>
            <div className="bg-[#89BFA1] flex m-4  rounded-2xl">
              <div className="min-w-[150px] text-white bg-[#2D815D] flex justify-center m-[3px] rounded-2xl py-4">
                <a href="">Home</a>
              </div>
              <div className="min-w-[150px] text-white flex justify-center m-[3px] py-4">
                <a href="">Despesas</a>
              </div>
            </div>

          </div>
        </Fragment>
    )
}

export default Header;