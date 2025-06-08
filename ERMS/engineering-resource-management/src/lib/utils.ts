// Utility to merge class names (similar to clsx/tailwind-variants minimal)
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}


export const getAccessToken = () => localStorage.getItem("token");
export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const setRefreshToken = (refreshToken: string | null) => {
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("refreshToken");
  }
};

export const removeAccessToken =() =>{
  localStorage.removeItem("token");
}
export const removeRefreshToken =() =>{
  localStorage.removeItem("refreshToken");
}