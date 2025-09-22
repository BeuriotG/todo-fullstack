export async function getTaskList() {
  try {
    const token = localStorage.getItem("token");
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

export async function getTaskId(_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/task/${_id}`, {
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

export async function createTask(body) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...body,
      }),
    });
    if (!response) {
      throw new Error(response.status, response.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateTaskId(_id, payload) {
  try {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteTaskId(_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/task/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      console.error(response.status, response.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
