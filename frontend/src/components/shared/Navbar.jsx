import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link,useNavigate} from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from "axios"; 
import { data } from "autoprefixer";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${BackendURL}/logout`, {}, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        } else {
            toast.error("Logout failed, please try again.");
        }
    } catch (error) {
        console.error("Logout error:", error); 
        toast.error(error.response?.data?.message || "An error occurred during logout");
    }
}
  return (
    <div className="fixed bg-transparent top-0 left-0 w-full z-50 backdrop-blur-md bg-opacity-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="flex">
        <Avatar className="cursor-pointer">
            <AvatarImage
              src="./assets/logo.png"
              alt=""
            />
          </Avatar>
          <div className="my-1">
            <Link to="/">
              <h1 className="text-2xl font-bold">
                <span className="text-[#CD7F32]">Future</span><span className="text-[#d4af37]">Campus</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <>
              <Link to="/">
                <li className="text-[#D4AF37] hover:text-[#f7e7ce]">Home</li>
              </Link>
              <Link to="/colleges">
                <li className="text-[#D4AF37] hover:text-[#f7e7ce]">Colleges</li>
              </Link>
            </>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/register"> 
                <Button className="font-bold" variant="default">LOG-IN / REGISTER</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger as>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="./assets/user.png"
                    alt=""
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="./assets/user.png"
                        alt=""
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
