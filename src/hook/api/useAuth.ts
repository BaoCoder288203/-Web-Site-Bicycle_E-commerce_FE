import { setMe } from '@/store/slices/user.slice'
import { login, loginWithGoogle } from '@/services/Auth.service'
import { getUserById } from '@/services/User.service'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { APP_ROUTES } from '@/constants';
import { data, useNavigate } from "react-router"
import { removeValueInLocalStorage, setValueInLocalStorage } from '@/utils/localStorage';
import { RootState } from '@/store';
import useCart from './useCart';
import { createAddress } from '@/services/User.service';
function useAuth() {
    const userStore = useSelector((state: RootState) => state.userSlice);
    const { fetchCartByUserId, createCarts } = useCart();

    const { me } = userStore
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const handleLoginWithGoogle = async (token: string) => {
        try {
            console.log("Gửi token đến backend:", token);

            const response = await loginWithGoogle(token);

            console.log("Token length: ", token.length, "Token: ", token);
            console.log("Response: ", response);
            if (response && response.data && response.data.accessToken) {
                enqueueSnackbar({ message: 'Login successful!', variant: 'success' });

                setValueInLocalStorage('accessToken', response.data.accessToken);
                setValueInLocalStorage('refreshToken', response.data.refreshToken);
                setValueInLocalStorage('userId', response.data.userId);
                setValueInLocalStorage('email', response.data.email);
                setValueInLocalStorage('role', response.data.role);

                if (response.data.userId) {
                    await createCarts();
                    const data = {
                        district: "Quan Go Vap",
                        fullAddress: "12 Nguyen Van Bao, Go Vap, thanh pho Ho Chi Minh",
                        city: "Ho Chi Minh",
                        street: "12 Nguyen Van Bao",
                        ward: "Phuong 4",
                        country: "Viet Nam",
                        userId: response.data.userId
                    }
                    await createAddress(data);
                    await handleGetMe(response.data.userId);
                }
                await fetchCartByUserId(response.data.userId);
                
                return { success: true, data: response.data }
            } else {
                const errorMsg = response.message || 'Đăng nhập thất bại';
                enqueueSnackbar(errorMsg, { variant: 'error' });
                return { success: false, message: errorMsg, data: response };
            }
        } catch (error) {
            enqueueSnackbar({ message: 'Login failed!', variant: 'error' });
            throw error;
        }
    }

    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        if ('success' in response && response.success === true) {
            enqueueSnackbar({ message: 'Login successful!', variant: 'success' });
            navigate(`${APP_ROUTES.DASHBOARD}`)
            setValueInLocalStorage('accessToken', response.data.accessToken);
            setValueInLocalStorage('refreshToken', response.data.refreshToken);
            const userId = response.data.userId
            setValueInLocalStorage('userId', userId);
            await handleGetMe(userId);
            await fetchCartByUserId(userId);
        } else {
            enqueueSnackbar(`${response.message?.response?.data?.message || 'Login failed'}.`, { variant: 'error' });
        }
        return response.data;
    }
    const handleLogout = async () => {
        try {
            removeValueInLocalStorage("accessToken");
            removeValueInLocalStorage("refreshToken");
            removeValueInLocalStorage("userId");
            dispatch(setMe(null));
            navigate(`${APP_ROUTES.AUTH_ROUTE}${APP_ROUTES.USER.LOGIN}`);
            enqueueSnackbar({ message: 'Logout successful!', variant: 'success' });
        } catch (error) {
            enqueueSnackbar({ message: 'Logout failed!', variant: 'error' });
        }
    }
    const handleGetMe = async (userId: string) => {
        const user = await getUserById(userId);
        dispatch(setMe(user.data));;
    }
    return { handleLogin, handleLogout, me, handleGetMe, handleLoginWithGoogle };
}

export default useAuth;