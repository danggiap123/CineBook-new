import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoritesMovies, setFavoriteMovies] = useState([]) // State lưu danh sách yêu thích

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    // 1. Hàm kiểm tra Admin
    const fetchIsAdmin = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setIsAdmin(data.isAdmin)

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('You are not authorized to access admin dashboard')
            }
        } catch (error) {
            console.error(error)
            if (location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('Lỗi kiểm tra quyền truy cập')
            }
        }
    }

    // 2. Hàm lấy tất cả phim
    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all')
            if (data.success) {
                setShows(data.shows)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Lỗi kết nối server")
        }
    }

    // 3. Hàm lấy danh sách yêu thích (Đã có, giữ nguyên)
    const fetchFavoriteMovies = async () => {
        if (!user) return; // Nếu chưa login thì không gọi
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/user/favorites', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setFavoriteMovies(data.movies)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // 4. --- THÊM MỚI: Hàm Thêm/Xóa yêu thích ---
    const addToFavorites = async (movieId) => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để lưu phim!");
            return;
        }

        try {
            const token = await getToken();
            const { data } = await axios.post('/api/user/update-favorite',
                { movieId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success(data.message);
                // Quan trọng: Gọi lại fetchFavoriteMovies để cập nhật giao diện (đổi màu tim)
                fetchFavoriteMovies();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi cập nhật yêu thích");
        }
    }

    useEffect(() => {
        fetchShows()
    }, [])

    useEffect(() => {
        if (user) {
            fetchIsAdmin()
            fetchFavoriteMovies()
        } else {
            setIsAdmin(false)
            setFavoriteMovies([]) // Reset khi logout
        }
    }, [user])

    const value = {
        axios,
        fetchIsAdmin, user,
        getToken, navigate, isAdmin, shows,
        favoritesMovies, fetchFavoriteMovies,
        addToFavorites, // <--- Nhớ export hàm này
        image_base_url
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)