
export function isAuthenticated(): boolean {
    const storedUser = localStorage.getItem('discordUser');
    return !!storedUser;
  }
  