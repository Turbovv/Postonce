
export function isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('user');
    return !!storedUser;
  }
  