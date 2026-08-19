import { useNavigate } from "react-router-dom";
import { useAuthStore } from './../stores/authStore';

export function useCta() {
    const navigate = useNavigate()
    const isAuth = useAuthStore((s) => s.isAuthenticated)

    const goStart = () => navigate(isAuth ? '/dashboard' : '/register')

    const goBuy = (plan: string, billing?: string) => {
        const query = billing ? `plan=${plan}&billing=${billing}` : `plan=${plan}`
        navigate(isAuth ? `/checkout?${query}` : `/register?${query}`)
    }

    return { goStart, goBuy }
}