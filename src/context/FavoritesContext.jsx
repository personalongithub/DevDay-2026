import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getFavoritesRequest, getUserId, toggleFavoriteRequest } from "../services/api";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function loadFavorites() {
            try {
                const savedFavorites = await getFavoritesRequest(getUserId());
                setFavorites(savedFavorites);
            } catch (error) {
                console.error("Could not load favorites:", error);
            }
        }
        loadFavorites();
    }, []);


    async function toggleFavorite(recipe) {
        try {
            const userId = getUserId();

            const updatedFavorites = 
            await toggleFavoriteRequest(userId, recipe);

            setFavorites(updatedFavorites);
        } catch (error) {
            console.error("Could not update favorites:", error);
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}