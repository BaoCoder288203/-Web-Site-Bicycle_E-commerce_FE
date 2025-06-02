import { setMe, setAddress } from "@/store/slices/user.slice";
import {
  register,
  editAddress,
  editProfile,
  updateAvatar,
  getUserById,
  createAddress,
  getAddressById,
} from "@/services/User.service";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/constants/index";
import { setValueInLocalStorage } from "@/utils/localStorage";
import useCart from "./useCart";
import { RootState } from "@/store/index";
function useUser() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { createCarts, fetchCartByUserId } = useCart();
  const cartStore = useSelector((state: RootState) => state.cartSlice);
  const { setCart } = cartStore;

  const handleGetMe = async (userId: string) => {
    console.log("Inside handleGetMe, received userId:", userId);
    const user = await getUserById(userId);
    dispatch(setMe(user.data));
  };

  const handleRegister = async (user: any,address: any) => {
    const response = await register(user);
    console.log("Check response in user service: ", response);
    if ("success" in response && response.success === true) {
      enqueueSnackbar({ message: "Register successful!", variant: "success" });
      navigate(`${APP_ROUTES.DASHBOARD}`);
      setValueInLocalStorage("accessToken", response.data.accessToken);
      setValueInLocalStorage("refreshToken", response.data.refreshToken);
      const userId = response.data.userId;
      console.log("Check data user id in useUser: ", userId);
      setValueInLocalStorage("userId", userId);

      if (userId) {
        await handleGetMe(userId);
      } else {
        console.error("userId is undefined before calling handleGetMe");
      }

      const data = await createCarts();
      console.log("Check data create Cart in useUser: ", data);
      const responseAddress = await createAddress(address);
      console.log("Check data create address in useUser: ",responseAddress);
      
      const dataUser = await fetchCartByUserId(userId);
      console.log("Check data cart User in useUser: ", dataUser);
      const dataAddress = await getAddressById(responseAddress.data.addressId);
      console.log("Check data address User in useUser: ", dataAddress);
      
      await handleEditAddress(dataAddress);
    } else {
      enqueueSnackbar(
        `${response.response?.data?.message || "Register failed"}.`,
        { variant: "error" }
      );
    }
  };
  const handleEditAddress = async (address: any) => {
    const response = await editAddress(address);
    dispatch(setAddress(response.data));
  };
  const handleEditProfile = async (user: any) => {
    const response = await editProfile(user);
    console.log("check response edit user in useUser: ", response);
    dispatch(setMe(response?.data));
  };
  const handleUpdateAvatar = async (data: any) => {
    const response = await updateAvatar(data);
    return response;
  };

  return {
    handleRegister,
    handleEditAddress,
    handleEditProfile,
    handleUpdateAvatar,
  };
}

export default useUser;
