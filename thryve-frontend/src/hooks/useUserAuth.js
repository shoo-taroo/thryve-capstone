import { useQuery } from "@tanstack/react-query";
import { getUserAuth } from "../api/userApi";
import { useAuthStore } from "../store/useAuthStore";

const useUserAuth = () => {
  const { accessToken } = useAuthStore.getState();

  const { data, isError, isLoading , refetch} = useQuery({
    queryKey: ["user-auth"],
    queryFn: getUserAuth,
    enabled: !!accessToken, 
    refetchOnWindowFocus: true,
  });

  return {
    data,
    role: data?.role || null,
    isError,
    isLoading,
    refetch,
    isAuthenticated: Boolean(data && accessToken),
  };
};

export default useUserAuth;
