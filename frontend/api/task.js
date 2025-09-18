const token = localStorage.getItem("token");

export async function getTaskList() {
  try {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      throw new Error(response.status, response.message);
    }
    const data = await response.json();
    return data.task;
  } catch (err) {
    throw new Error(err.message);
  }
}
