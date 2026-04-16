const BASE = "http://localhost:3000/api";

export async function fetchTasks() {
    const res = await fetch(`${BASE}/task`);
    if (!res.ok) throw new Error("Erro ao buscar tasks");
    return res.json();
}

export async function updateTask(id, data) {
    const res = await fetch(`${BASE}/task/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erro ao atualizar task");
    return res.json();
}
export async function deleteTask(id){
    const res = await fetch(`${BASE}/task/${id}`,{
        method: "DELETE"
    })
    if(!res.ok) throw new Error("Erro ao deletar task");
    if (res.status === 204) return null;
    return res.json();
}