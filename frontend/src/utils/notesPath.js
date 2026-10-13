export function notesPath() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id ? `/notes/${encodeURIComponent(user.id)}` : "/login";
  } catch {
    return "/login";
  }
}
