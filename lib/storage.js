export function saveMood(mood) {
  const moods = JSON.parse(localStorage.getItem("moods")) || [];

  moods.push({
    value: mood,
    date: new Date().toISOString(),
  });

  localStorage.setItem("moods", JSON.stringify(moods));
}

export function getMoods() {
  return JSON.parse(localStorage.getItem("moods")) || [];
}

export function saveSession() {
  const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

  sessions.push({
    date: new Date().toISOString(),
  });

  localStorage.setItem("sessions", JSON.stringify(sessions));
}

export function getSessions() {
  return JSON.parse(localStorage.getItem("sessions")) || [];
}