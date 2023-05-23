import { ImHome, ImSearch, ImUser } from "react-icons/im";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LeftSideNav = () => {
  const navigator = useNavigate();

  return (
    <>
      <div className="ml-1">
        <p className="ml-5 text-4xl mt-6 sideNavMainFont">Instagram</p>
        <ul className="p-1 mt-8 sideNavItems">
          <li className="p-4 rounded-sm hover:bg-slate-100 ">
            <span className="my-auto text-sm font-medium">
              <ImHome className="mr-3 text-xl inline" /> Home
            </span>
          </li>
          <li className="p-4 rounded-sm hover:bg-slate-100 ">
            <span className="my-auto text-sm font-medium">
              <ImSearch className="mr-3 text-xl inline " /> Search
            </span>
          </li>
          <li className="p-4 rounded-sm hover:bg-slate-100 ">
            <span className="my-auto text-sm font-medium">
              <ImUser className="mr-3 text-xl inline" /> Profile
            </span>
          </li>

          <li
            className="p-4 rounded-sm hover:bg-slate-100 "
            onClick={() => {
              navigator("/p/add_post");
            }}
          >
            <span className="my-auto text-sm font-medium">
              <MdOutlineAddBox className="mr-3 text-xl inline" /> Create
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftSideNav;
